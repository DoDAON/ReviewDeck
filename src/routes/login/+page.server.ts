import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser } from '$lib/server/auth.js';
import { createSession, setSessionCookie, getSessionFromCookies, validateSession } from '$lib/server/session.js';

export const load: PageServerLoad = async ({ cookies }) => {
    // 이미 로그인된 사용자는 홈으로 리다이렉트
    const sessionId = getSessionFromCookies(cookies);
    if (sessionId) {
        const { valid } = await validateSession(sessionId);
        if (valid) {
            throw redirect(302, '/');
        }
    }
    
    return {};
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const rememberMe = data.get('rememberMe') === 'on';

        // 입력 값 검증
        if (!email) {
            return fail(400, {
                email,
                emailError: '이메일을 입력해주세요',
                passwordError: ''
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return fail(400, {
                email,
                emailError: '올바른 이메일 형식이 아닙니다',
                passwordError: ''
            });
        }

        if (!password) {
            return fail(400, {
                email,
                emailError: '',
                passwordError: '비밀번호를 입력해주세요'
            });
        }

        // 데이터베이스에서 사용자 인증
        const authResult = await authenticateUser(email, password);
        
        if (!authResult.success) {
            return fail(400, {
                email,
                emailError: '',
                passwordError: '',
                loginError: authResult.message
            });
        }

        // 세션 생성
        const sessionId = createSession(authResult.user!.id, rememberMe);
        
        // 세션 쿠키 설정
        setSessionCookie(cookies, sessionId, rememberMe);

        // 로그인 성공 후 홈으로 리다이렉트
        throw redirect(302, '/');
    }
}; 