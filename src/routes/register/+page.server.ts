import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { prisma } from '$lib/server/db';
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
      // 이메일 중복 확인
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return fail(400, {
          message: '이미 존재하는 이메일입니다.',
          email,
          name
        });
      }

      // 닉네임 중복 확인
      const existingName = await prisma.user.findFirst({
        where: { name }
      });

      if (existingName) {
        return fail(400, {
          message: '이미 존재하는 닉네임입니다.',
          email,
          name
        });
      }

      // 비밀번호 해싱
      const passwordHash = await bcrypt.hash(password, 10);

      // 사용자 생성
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name,
          role: 'USER'
        }
      });

      console.log('새 사용자 생성:', user.email);

      // 회원가입 성공 응답
      return {
        success: true,
        message: '회원가입이 완료되었습니다!',
        user: {
          email: user.email,
          name: user.name
        }
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

    try {
      const existingName = await prisma.user.findFirst({
        where: { name }
      });

      if (existingName) {
        return fail(400, { message: '이미 존재하는 닉네임입니다.' });
      }

      return { success: true, message: '사용 가능한 닉네임입니다.' };
    } catch (error) {
      console.error('닉네임 확인 오류:', error);
      return fail(500, { message: '닉네임 확인 중 오류가 발생했습니다.' });
    }
  }
}; 