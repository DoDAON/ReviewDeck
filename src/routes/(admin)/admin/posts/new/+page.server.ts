import { prisma } from '$lib/server/db';
import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const allTags = await prisma.tag.findMany({
			orderBy: { name: 'asc' }
		});

		return {
			allTags
		};
	} catch (err) {
		console.error('태그 로드 실패:', err);
		throw error(500, '태그를 불러오는데 실패했습니다.');
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
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
			const newReview = await prisma.review.create({
				data: {
					title: title.trim(),
					content: content.trim(),
					author: author.trim(),
					rating,
					published: true,
					createdAt: new Date(),
					updatedAt: new Date(),
					tags: {
						connect: selectedTags.map(tagId => ({ id: tagId }))
					}
				}
			});

			// 게시물 생성 성공 후 리디렉션
			throw redirect(303, `/admin/posts/${newReview.id}`);
		} catch (err) {
			// redirect 에러인지 확인
			if (err && typeof err === 'object' && 'status' in err && err.status === 303) {
				// 이것은 정상적인 리디렉션이므로 다시 던짐
				throw err;
			}
			console.error('게시물 생성 실패:', err);
			return fail(500, { error: '게시물 생성에 실패했습니다.' });
		}
	}
}; 