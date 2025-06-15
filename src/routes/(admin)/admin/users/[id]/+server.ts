import { prisma } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;

	try {
		// 유저 존재 확인
		const user = await prisma.user.findUnique({
			where: { id }
		});

		if (!user) {
			throw error(404, '유저를 찾을 수 없습니다.');
		}

		// 유저 삭제 (관련된 댓글도 CASCADE로 함께 삭제됨)
		await prisma.user.delete({
			where: { id }
		});

		return json({ success: true, message: '유저가 삭제되었습니다.' });
	} catch (err) {
		console.error('유저 삭제 실패:', err);
		throw error(500, '유저 삭제에 실패했습니다.');
	}
}; 