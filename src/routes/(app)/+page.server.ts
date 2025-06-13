import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  try {
    // 실제 데이터베이스에서 추천 리뷰 가져오기 (평점 높은 순으로 10개)
    const featuredReviews = await prisma.review.findMany({
      take: 10,
      orderBy: {
        rating: 'desc'
      },
      include: {
        tags: {
          select: {
            name: true
          }
        }
      }
    });

    // 데이터 형식 변환
    const formattedReviews = featuredReviews.map(review => ({
      id: review.id,
      title: review.title,
      rating: review.rating,
      tag: review.tags[0]?.name || '',
      author: review.author,
      excerpt: review.content.substring(0, 50) + '...',
      createdAt: review.createdAt.toISOString()
    }));

    return {
      featuredReviews: formattedReviews
    };
  } catch (error) {
    console.error('추천 리뷰 로드 오류:', error);
    return {
      featuredReviews: []
    };
  }
}; 