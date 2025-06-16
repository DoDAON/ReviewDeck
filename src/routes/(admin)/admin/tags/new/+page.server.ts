import { prisma } from '$lib/server/db';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name || name.trim().length === 0) {
			return fail(400, { error: '태그 이름을 입력해주세요.' });
		}

		try {
			// 중복 태그명 확인
			const existingTag = await prisma.tag.findUnique({
				where: { name: name.trim() }
			});

			if (existingTag) {
				return fail(400, { error: '이미 존재하는 태그명입니다.' });
			}

			await prisma.tag.create({
				data: {
					name: name.trim()
				}
			});

		} catch (err) {
			console.error('태그 생성 실패:', err);
			return fail(500, { error: '태그 생성에 실패했습니다.' });
		}

		// 성공 시 리다이렉트
		throw redirect(303, '/admin/tags');
	}
}; 