import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

// 비밀번호 검증
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

// 사용자 인증
export async function authenticateUser(email: string, password: string) {
    try {
        // 이메일로 사용자 찾기
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                passwordHash: true,
                role: true
            }
        });

        if (!user) {
            return { success: false, message: '사용자를 찾을 수 없습니다.' };
        }

        // 비밀번호 검증
        const isValidPassword = await verifyPassword(password, user.passwordHash);
        
        if (!isValidPassword) {
            return { success: false, message: '비밀번호가 올바르지 않습니다.' };
        }

        // 성공 시 비밀번호 해시는 제외하고 반환
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = user;
        
        return { 
            success: true, 
            user: userWithoutPassword,
            message: '로그인에 성공했습니다.' 
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return { 
            success: false, 
            message: '인증 중 오류가 발생했습니다.' 
        };
    }
}

// 닉네임 중복 확인
export async function checkNickname(name: string) {
    try {
        const existingName = await prisma.user.findFirst({
            where: { name }
        });

        if (existingName) {
            return { success: false, message: '이미 존재하는 닉네임입니다.' };
        }

        return { success: true, message: '사용 가능한 닉네임입니다.' };
    } catch (error) {
        console.error('Nickname check error:', error);
        return { success: false, message: '닉네임 확인 중 오류가 발생했습니다.' };
    }
}

// 사용자 생성 (회원가입용)
export async function createUser(email: string, password: string, name: string) {
    try {
        // 이미 존재하는 이메일인지 확인
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { success: false, message: '이미 등록된 이메일입니다.' };
        }

        // 닉네임 중복 확인
        const existingName = await prisma.user.findFirst({
            where: { name }
        });

        if (existingName) {
            return { success: false, message: '이미 존재하는 닉네임입니다.' };
        }

        // 비밀번호 해싱
        const passwordHash = await hashPassword(password);

        // 사용자 생성
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                role: 'USER'
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        return { 
            success: true, 
            user,
            message: '회원가입이 완료되었습니다.' 
        };
    } catch (error) {
        console.error('User creation error:', error);
        return { 
            success: false, 
            message: '회원가입 중 오류가 발생했습니다.' 
        };
    }
}

// 사용자 ID로 사용자 정보 가져오기
export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        return user;
    } catch (error) {
        console.error('Get user by ID error:', error);
        return null;
    }
}

// Prisma 클라이언트 종료 (앱 종료 시)
export async function disconnectDatabase() {
    await prisma.$disconnect();
} 