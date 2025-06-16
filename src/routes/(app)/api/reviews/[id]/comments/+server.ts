import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const reviewId = params.id;

    if (!reviewId) {
      return json({ error: '리뷰 ID가 필요합니다' }, { status: 400 });
    }

    // 리뷰 존재 확인
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    });

    if (!review) {
      return json({ error: '존재하지 않는 리뷰입니다' }, { status: 404 });
    }

    // 댓글 목록 조회
    const comments = await prisma.comment.findMany({
      where: { reviewId },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 응답 포맷 맞추기
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      author: comment.author.name,
      createdAt: comment.createdAt.toISOString()
    }));

    return json({
      success: true,
      comments: formattedComments
    });

  } catch (error) {
    console.error('댓글 조회 실패:', error);
    return json({ error: '댓글 조회에 실패했습니다' }, { status: 500 });
  }
}; 