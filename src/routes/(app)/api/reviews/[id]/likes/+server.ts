import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { getSessionFromCookies, validateSession } from '$lib/server/session';

// 좋아요 상태 조회
export const GET: RequestHandler = async ({ params, cookies }) => {
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

    // 총 좋아요 수 조회
    const totalLikes = await prisma.like.count({
      where: { reviewId }
    });

    // 현재 사용자의 좋아요 상태 확인
    const sessionId = getSessionFromCookies(cookies);
    let isLiked = false;

    if (sessionId) {
      const sessionResult = await validateSession(sessionId);
      if (sessionResult.valid && sessionResult.user) {
        const userLike = await prisma.like.findUnique({
          where: {
            userId_reviewId: {
              userId: sessionResult.user.id,
              reviewId
            }
          }
        });
        isLiked = !!userLike;
      }
    }

    return json({
      success: true,
      totalLikes,
      isLiked
    });

  } catch (error) {
    console.error('좋아요 조회 실패:', error);
    return json({ error: '좋아요 조회에 실패했습니다' }, { status: 500 });
  }
};

// 좋아요 토글
export const POST: RequestHandler = async ({ params, cookies }) => {
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

    // 기존 좋아요 확인
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_reviewId: {
          userId: sessionResult.user.id,
          reviewId
        }
      }
    });

    let isLiked: boolean;

    if (existingLike) {
      // 좋아요 취소
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      isLiked = false;
    } else {
      // 좋아요 추가
      await prisma.like.create({
        data: {
          userId: sessionResult.user.id,
          reviewId
        }
      });
      isLiked = true;
    }

    // 업데이트된 총 좋아요 수 조회
    const totalLikes = await prisma.like.count({
      where: { reviewId }
    });

    return json({
      success: true,
      isLiked,
      totalLikes
    });

  } catch (error) {
    console.error('좋아요 토글 실패:', error);
    return json({ error: '좋아요 처리에 실패했습니다' }, { status: 500 });
  }
}; 