import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	try {
		// 총 게시물 수 (리뷰)
		const totalPosts = await prisma.review.count();
		
		// 총 태그 수
		const totalTags = await prisma.tag.count();
		
		// 총 유저 수
		const totalUsers = await prisma.user.count();

		return {
			stats: {
				totalPosts,
				totalTags,
				totalUsers
			}
		};
	} catch (error) {
		console.error('관리자 데이터 로드 오류:', error);
		return {
			stats: {
				totalPosts: 0,
				totalTags: 0,
				totalUsers: 0
			}
		};
	}
}; 