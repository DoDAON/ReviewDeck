import { getUserById } from './auth.js';
import type { Cookies } from '@sveltejs/kit';
import { randomBytes } from 'crypto';

// 세션 인터페이스
export interface Session {
    id: string;
    userId: string;
    expiresAt: Date;
}

// 메모리 기반 세션 스토어 (실제 프로덕션에서는 Redis나 데이터베이스 사용 권장)
const sessions = new Map<string, Session>();

// 세션 생성
export function createSession(userId: string, rememberMe = false): string {
    // 안전한 세션 ID 생성
    const sessionId = randomBytes(32).toString('hex');
    
    // 만료 시간 설정 (기본 24시간, 기억하기 체크 시 30일)
    const expiresAt = new Date();
    if (rememberMe) {
        expiresAt.setDate(expiresAt.getDate() + 30); // 30일
    } else {
        expiresAt.setDate(expiresAt.getDate() + 1); // 1일
    }
    
    // 세션 저장
    sessions.set(sessionId, {
        id: sessionId,
        userId,
        expiresAt
    });
    
    return sessionId;
}

// 세션 검증 및 사용자 정보 반환
export async function validateSession(sessionId: string) {
    const session = sessions.get(sessionId);
    
    if (!session) {
        return { valid: false, user: null };
    }
    
    // 세션 만료 확인
    if (session.expiresAt < new Date()) {
        sessions.delete(sessionId);
        return { valid: false, user: null };
    }
    
    // 사용자 정보 가져오기
    const user = await getUserById(session.userId);
    
    if (!user) {
        sessions.delete(sessionId);
        return { valid: false, user: null };
    }
    
    return { valid: true, user };
}

// 세션 삭제
export function deleteSession(sessionId: string): boolean {
    return sessions.delete(sessionId);
}

// 세션 정리 (만료된 세션들 제거)
export function cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [sessionId, session] of sessions.entries()) {
        if (session.expiresAt < now) {
            sessions.delete(sessionId);
        }
    }
}

// 쿠키에서 세션 ID 가져오기
export function getSessionFromCookies(cookies: Cookies): string | null {
    return cookies.get('session') || null;
}

// 쿠키에 세션 설정
export function setSessionCookie(cookies: Cookies, sessionId: string, rememberMe = false): void {
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30일 또는 1일
    
    cookies.set('session', sessionId, {
        path: '/',
        httpOnly: true,
        secure: false, // 개발환경에서는 false, 프로덕션에서는 true
        sameSite: 'strict',
        maxAge
    });
}

// 세션 쿠키 삭제
export function deleteSessionCookie(cookies: Cookies): void {
    cookies.delete('session', { path: '/' });
}

// 정기적으로 만료된 세션 정리 (1시간마다)
setInterval(cleanupExpiredSessions, 60 * 60 * 1000); 