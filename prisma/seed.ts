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

  console.log('사용자 계정들 생성 중...');

  // 관리자 계정 생성
  const adminPasswordHash = await bcrypt.hash('admin123!', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'root@testtest.test',
      passwordHash: adminPasswordHash,
      name: '관리자',
      role: 'ADMIN'
    }
  });

  // 테스트용 일반 사용자들 생성
  const testUsers = [
    {
      email: 'test@example.com',
      password: 'test123!',
      name: '임시사용자'
    }
  ];

  for (const userData of testUsers) {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash: passwordHash,
        name: userData.name,
        role: 'USER'
      }
    });
  }

  console.log('생성된 계정들:');
  console.log('관리자:', {
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role
  });
  
  console.log('테스트 사용자들:');
  testUsers.forEach(user => {
    console.log(`- 이메일: ${user.email}, 비밀번호: ${user.password}, 이름: ${user.name}`);
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