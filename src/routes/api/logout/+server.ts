import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSessionFromCookies, deleteSession, deleteSessionCookie } from '$lib/server/session.js';

export const POST: RequestHandler = async ({ cookies }) => {
    const sessionId = getSessionFromCookies(cookies);
    
    if (sessionId) {
        // 서버에서 세션 삭제
        deleteSession(sessionId);
    }
    
    // 세션 쿠키 제거
    deleteSessionCookie(cookies);
    
    return json({ success: true });
}; 