import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const review = await prisma.review.findUnique({
			where: { id },
			include: {
				tags: true,
				comments: {
					include: {
						author: {
							select: {
								id: true,
								name: true,
								email: true
							}
						}
					},
					orderBy: { createdAt: 'desc' }
				},
				images: true
			}
		});

		if (!review) {
			throw error(404, '게시물을 찾을 수 없습니다.');
		}

		return {
			review
		};
	} catch (err) {
		console.error('게시물 로드 실패:', err);
		throw error(500, '게시물을 불러오는데 실패했습니다.');
	}
};

 