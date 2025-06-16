import { prisma } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		// 모든 태그 조회
		const tags = await prisma.tag.findMany({
			include: {
				reviews: {
					select: { id: true }
				}
			},
			orderBy: { name: 'asc' }
		});

		return {
			tags: tags.map((tag) => ({
				...tag,
				reviewCount: tag.reviews.length
			}))
		};
	} catch (err) {
		console.error('태그 로드 실패:', err);
		return {
			tags: []
		};
	}
};

export const actions: Actions = {

	// 태그 수정
	update: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const name = formData.get('name') as string;

		if (!id) {
			return fail(400, { error: '태그 ID가 필요합니다.' });
		}

		if (!name || name.trim().length === 0) {
			return fail(400, { error: '태그 이름을 입력해주세요.' });
		}

		try {
			// 중복 태그명 확인 (자신 제외)
			const existingTag = await prisma.tag.findFirst({
				where: { 
					name: name.trim(),
					id: { not: id }
				}
			});

			if (existingTag) {
				return fail(400, { error: '이미 존재하는 태그명입니다.' });
			}

			const tag = await prisma.tag.update({
				where: { id },
				data: {
					name: name.trim()
				}
			});

			return { success: true, tag };
		} catch (err) {
			console.error('태그 수정 실패:', err);
			return fail(500, { error: '태그 수정에 실패했습니다.' });
		}
	},

	// 태그 삭제
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: '태그 ID가 필요합니다.' });
		}

		try {
			// 태그를 사용하는 게시물이 있는지 확인
			const tagWithReviews = await prisma.tag.findUnique({
				where: { id },
				include: {
					reviews: {
						select: { id: true }
					}
				}
			});

			if (!tagWithReviews) {
				return fail(404, { error: '태그를 찾을 수 없습니다.' });
			}

			if (tagWithReviews.reviews.length > 0) {
				return fail(400, { error: '이 태그를 사용하는 게시물이 있어 삭제할 수 없습니다.' });
			}

			await prisma.tag.delete({
				where: { id }
			});

			return { success: true };
		} catch (err) {
			console.error('태그 삭제 실패:', err);
			return fail(500, { error: '태그 삭제에 실패했습니다.' });
		}
	}
}; 