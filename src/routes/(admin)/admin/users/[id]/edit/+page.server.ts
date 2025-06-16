import { prisma } from '$lib/server/db';
import { error, redirect, fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const user = await prisma.user.findUnique({
			where: { id }
		});

		if (!user) {
			throw error(404, '유저를 찾을 수 없습니다.');
		}

		// 비밀번호 필드는 제외하고 반환
		const { passwordHash, ...userWithoutPassword } = user;

		return {
			user: userWithoutPassword
		};
	} catch (err) {
		console.error('유저 로드 실패:', err);
		throw error(500, '유저를 불러오는데 실패했습니다.');
	}
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const { id } = params;
		const data = await request.formData();

		const name = data.get('name') as string;
		const password = data.get('password') as string;
		const role = data.get('role') as string;

		// 유효성 검사
		if (!name?.trim()) {
			return fail(400, { error: '이름을 입력해주세요.' });
		}

		// 역할 검사
		if (!['USER', 'ADMIN'].includes(role)) {
			return fail(400, { error: '올바르지 않은 역할입니다.' });
		}

		try {
			// 현재 유저가 존재하는지 확인
			const existingUser = await prisma.user.findUnique({
				where: { id }
			});

			if (!existingUser) {
				return fail(404, { error: '유저를 찾을 수 없습니다.' });
			}

			// 업데이트할 데이터 준비
			const updateData: any = {
				name: name.trim(),
				role,
				updatedAt: new Date()
			};

			// 비밀번호가 입력되었으면 해시화해서 업데이트
			if (password?.trim()) {
				const salt = await bcrypt.genSalt(10);
				updateData.passwordHash = await bcrypt.hash(password.trim(), salt);
			}

			await prisma.user.update({
				where: { id },
				data: updateData
			});

		} catch (err) {
			console.error('유저 수정 실패:', err);
			return fail(500, { error: '유저 수정에 실패했습니다.' });
		}

		throw redirect(303, `/admin/users`);
	}
}; 