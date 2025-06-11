import { fail } from '@sveltejs/kit';
import { createUser, checkNickname } from '$lib/server/auth.js';
import type { Actions } from './$types';

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    const name = data.get('name') as string; // nickname을 name으로 변경

    // 기본 유효성 검사
    if (!email || !password || !confirmPassword || !name) {
      return fail(400, {
        message: '모든 필드를 입력해주세요.',
        email,
        name
      });
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, {
        message: '올바른 이메일 형식이 아닙니다.',
        email,
        name
      });
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      return fail(400, {
        message: '비밀번호가 일치하지 않습니다.',
        email,
        name
      });
    }

    // 비밀번호 길이 검사
    if (password.length < 6) {
      return fail(400, {
        message: '비밀번호는 6자 이상이어야 합니다.',
        email,
        name
      });
    }

    // 닉네임 길이 검사
    if (name.length < 2 || name.length > 8) {
      return fail(400, {
        message: '닉네임은 2자 이상 8자 이하여야 합니다.',
        email,
        name
      });
    }

    try {
      // auth.ts의 createUser 함수 사용
      const result = await createUser(email, password, name);

      if (!result.success) {
        return fail(400, {
          message: result.message,
          email,
          name
        });
      }

      console.log('새 사용자 생성:', result.user?.email);

      // 회원가입 성공 응답
      return {
        success: true,
        message: result.message,
        user: result.user
      };

    } catch (error) {
      console.error('회원가입 오류:', error);
      return fail(500, {
        message: '회원가입 중 오류가 발생했습니다.',
        email,
        name
      });
    }
  },

  checkNickname: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;

    if (!name) {
      return fail(400, { message: '닉네임을 입력해주세요.' });
    }

    if (name.length < 2 || name.length > 8) {
      return fail(400, { message: '닉네임은 2자 이상 8자 이하여야 합니다.' });
    }

    // auth.ts의 checkNickname 함수 사용
    const result = await checkNickname(name);
    
    if (!result.success) {
      return fail(400, { message: result.message });
    }

    return { success: true, message: result.message };
  }
}; 