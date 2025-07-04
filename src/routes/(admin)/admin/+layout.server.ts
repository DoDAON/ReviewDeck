import type { LayoutServerLoad } from './$types';
import { getSessionFromCookies, validateSession } from '$lib/server/session.js';

export const load: LayoutServerLoad = async ({ cookies }) => {
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