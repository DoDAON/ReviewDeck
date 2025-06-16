import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  try {
    // 실제 데이터베이스에서 리뷰 목록 가져오기
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        tags: {
          select: {
            name: true
          }
        }
      }
    });

    // 실제 데이터베이스에서 태그 목록 가져오기
    const tags = await prisma.tag.findMany({
      select: {
        name: true
      }
    });

    // 데이터 형식 변환
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      title: review.title,
      rating: review.rating,
      tag: review.tags[0]?.name || '',
      author: review.author,
      excerpt: review.content.substring(0, 50) + '...',
      createdAt: review.createdAt.toISOString()
    }));

    const tagNames = tags.map(tag => tag.name);

    return {
      reviews: formattedReviews,
      tags: tagNames
    };
  } catch (error) {
    console.error('리뷰 목록 로드 오류:', error);
    return {
      reviews: [],
      tags: []
    };
  }
}; 