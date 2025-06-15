import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { getSessionFromCookies, validateSession } from '$lib/server/session';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    // 세션 확인
    const sessionId = getSessionFromCookies(cookies);
    if (!sessionId) {
      return json({ error: '로그인이 필요합니다' }, { status: 401 });
    }
    
    const sessionResult = await validateSession(sessionId);
    if (!sessionResult.valid || !sessionResult.user) {
      return json({ error: '유효하지 않은 세션입니다' }, { status: 401 });
    }

    const { content, reviewId } = await request.json();

    // 유효성 검사
    if (!content || content.trim().length < 5) {
      return json({ error: '댓글은 5자 이상으로 작성해야 합니다' }, { status: 400 });
    }

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

    // 댓글 생성
    const newComment = await prisma.comment.create({
      data: {
        content: content.trim(),
        reviewId,
        authorId: sessionResult.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return json({
      success: true,
      comment: {
        id: newComment.id,
        content: newComment.content,
        author: newComment.author.name,
        createdAt: newComment.createdAt.toISOString()
      }
    });

  } catch (error) {
    console.error('댓글 생성 실패:', error);
    return json({ error: '댓글 생성에 실패했습니다' }, { status: 500 });
  }
}; 