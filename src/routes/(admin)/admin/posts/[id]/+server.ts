import { prisma } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;

	try {
		// 게시물 존재 확인
		const review = await prisma.review.findUnique({
			where: { id }
		});

		if (!review) {
			throw error(404, '게시물을 찾을 수 없습니다.');
		}

		// 게시물 삭제 (관련된 댓글, 이미지도 CASCADE로 함께 삭제됨)
		await prisma.review.delete({
			where: { id }
		});

		return json({ success: true, message: '게시물이 삭제되었습니다.' });
	} catch (err) {
		console.error('게시물 삭제 실패:', err);
		throw error(500, '게시물 삭제에 실패했습니다.');
	}
}; 