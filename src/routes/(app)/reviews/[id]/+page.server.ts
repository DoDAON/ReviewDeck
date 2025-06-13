import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ params }) => {
  try {
    // 실제 데이터베이스에서 특정 리뷰 정보 가져오기
    const review = await prisma.review.findUnique({
      where: {
        id: params.id
      },
      include: {
        tags: {
          select: {
            name: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!review) {
      throw error(404, '리뷰를 찾을 수 없습니다.');
    }

    // 데이터 형식 변환
    const formattedReview = {
      id: review.id,
      title: review.title,
      rating: review.rating,
      tag: review.tags[0]?.name || '',
      author: review.author,
      content: review.content,
      createdAt: review.createdAt.toISOString(),
      comments: review.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: comment.author.name,
        createdAt: comment.createdAt.toISOString()
      }))
    };

    return {
      review: formattedReview
    };
  } catch (e) {
    if (e instanceof Error && 'status' in e) {
      throw e; // 이미 SvelteKit error인 경우 다시 throw
    }
    console.error('리뷰 상세 정보 로드 오류:', e);
    throw error(500, '리뷰 정보를 불러오는 중 오류가 발생했습니다.');
  }
}; 