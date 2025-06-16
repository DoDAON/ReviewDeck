import { prisma } from '$lib/server/db';
import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const [review, allTags] = await Promise.all([
			prisma.review.findUnique({
				where: { id },
				include: {
					tags: true
				}
			}),
			prisma.tag.findMany({
				orderBy: { name: 'asc' }
			})
		]);

		if (!review) {
			throw error(404, '게시물을 찾을 수 없습니다.');
		}

		return {
			review,
			allTags
		};
	} catch (err) {
		console.error('게시물 로드 실패:', err);
		throw error(500, '게시물을 불러오는데 실패했습니다.');
	}
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const { id } = params;
		const data = await request.formData();

		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const author = data.get('author') as string;
		const rating = parseFloat(data.get('rating') as string);
		const selectedTags = data.getAll('tags') as string[];

		// 허용된 평점 값
		const allowedRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

		// 유효성 검사
		if (!title?.trim()) {
			return fail(400, { error: '제목을 입력해주세요.' });
		}
		
		if (!content?.trim()) {
			return fail(400, { error: '내용을 입력해주세요.' });
		}

		if (!author?.trim()) {
			return fail(400, { error: '작성자를 입력해주세요.' });
		}

		if (isNaN(rating) || !allowedRatings.includes(rating)) {
			return fail(400, { error: '평점은 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 중 하나여야 합니다.' });
		}

		try {
			await prisma.review.update({
				where: { id },
				data: {
					title: title.trim(),
					content: content.trim(),
					author: author.trim(),
					rating,
					published: true, // 항상 발행됨
					updatedAt: new Date(),
					tags: {
						set: [], // 기존 태그 연결 해제
						connect: selectedTags.map(tagId => ({ id: tagId })) // 새 태그 연결
					}
				}
			});

			throw redirect(303, `/admin/posts/${id}`);
		} catch (err) {
			console.error('게시물 수정 실패:', err);
			return fail(500, { error: '게시물 수정에 실패했습니다.' });
		}
	}
}; 