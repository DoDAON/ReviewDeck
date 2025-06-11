import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('기존 사용자 데이터 삭제 중...');
  
  // 모든 사용자 데이터 삭제 (연관된 데이터도 함께)
  await prisma.comment.deleteMany();
  await prisma.image.deleteMany();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();

  console.log('관리자 계정 생성 중...');

  // 관리자 비밀번호 해싱
  const passwordHash = await bcrypt.hash('admin123!', 10);

  // 관리자 계정 생성
  const adminUser = await prisma.user.create({
    data: {
      email: 'root@testtest.test',
      passwordHash: passwordHash,
      name: '관리자',
      role: 'ADMIN'
    }
  });

  console.log('관리자 계정이 생성되었습니다:');
  console.log({
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role,
    createdAt: adminUser.createdAt
  });

  // 선택사항: 샘플 태그 생성
  const sampleTags = await prisma.tag.createMany({
    data: [
      { name: '음악' },
      { name: '영화' },
      { name: '도서' },
      { name: '게임' },
      { name: '드라마' }
    ]
  });

  console.log(`${sampleTags.count}개의 샘플 태그가 생성되었습니다.`);
}

main()
  .catch((e) => {
    console.error('시드 실행 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 