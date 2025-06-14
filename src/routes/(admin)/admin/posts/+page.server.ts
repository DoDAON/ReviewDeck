import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		// 모든 게시물 조회 (클라이언트에서 필터링)
		const reviews = await prisma.review.findMany({
			include: {
				tags: true,
				comments: {
					select: { id: true }
				}
			},
			orderBy: { createdAt: 'desc' }
		});

		return {
			reviews: reviews.map((review) => ({
				...review,
				commentCount: review.comments.length
			}))
		};
	} catch (error) {
		console.error('게시물 로드 실패:', error);
		return {
			reviews: []
		};
	}
}; 