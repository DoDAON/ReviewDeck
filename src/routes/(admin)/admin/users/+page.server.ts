import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		// 모든 유저 조회
		const users = await prisma.user.findMany({
			orderBy: { createdAt: 'desc' }
		});

		return {
			users
		};
	} catch (error) {
		console.error('유저 로드 실패:', error);
		return {
			users: []
		};
	}
}; 