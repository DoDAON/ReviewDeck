import { getSessionFromCookies, validateSession } from '$lib/server/session.js';
import type { Cookies } from '@sveltejs/kit';

export const load = async ({ cookies }: { cookies: Cookies }) => {
    const sessionId = getSessionFromCookies(cookies);
    
    if (!sessionId) {
        return {
            user: null,
            isAuthenticated: false
        };
    }
    
    const { valid, user } = await validateSession(sessionId);
    
    return {
        user,
        isAuthenticated: valid
    };
}; 