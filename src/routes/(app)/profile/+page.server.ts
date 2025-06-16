import type { PageServerLoad } from './$types';
import { getSessionFromCookies, validateSession } from '$lib/server/session.js';
import { prisma } from '$lib/server/db.js';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = getSessionFromCookies(cookies);
	
	if (!sessionId) {
		return {
			user: null,
			isAuthenticated: false,
			userComments: [],
			userLikes: []
		};
	}
	
	const { valid, user } = await validateSession(sessionId);
	
	if (!valid || !user) {
		return {
			user: null,
			isAuthenticated: false,
			userComments: [],
			userLikes: []
		};
	}

	try {
		// 사용자가 작성한 댓글 조회
		const userComments = await prisma.comment.findMany({
			where: {
				authorId: user.id
			},
			include: {
				review: {
					select: {
						id: true,
						title: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		// 사용자가 좋아요한 게시물 조회
		const userLikes = await prisma.like.findMany({
			where: {
				userId: user.id
			},
			include: {
				review: {
					select: {
						id: true,
						title: true,
						content: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return {
			user,
			isAuthenticated: true,
			userComments,
			userLikes
		};
	} catch (error) {
		console.error('프로필 데이터 로드 실패:', error);
		return {
			user,
			isAuthenticated: true,
			userComments: [],
			userLikes: []
		};
	}
}; 