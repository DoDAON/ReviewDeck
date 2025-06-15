import { PrismaClient, User, Tag } from '@prisma/client';
import bcrypt from 'bcrypt';
import { promises as fs } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('기존 데이터 삭제 중...');
  
  // 모든 데이터 삭제 (연관된 데이터도 함께) - 외래 키 제약 조건을 고려한 순서
  await prisma.like.deleteMany();    // Like 먼저 삭제 (User, Review 참조)
  await prisma.comment.deleteMany(); // Comment 삭제 (User, Review 참조)
  await prisma.image.deleteMany();   // Image 삭제 (Review 참조)
  await prisma.review.deleteMany();  // Review 삭제 (Tag 참조)
  await prisma.user.deleteMany();    // User 삭제
  await prisma.tag.deleteMany();     // Tag 삭제

  console.log('JSON 더미 데이터 로드 중...');

  // JSON 파일들 읽기
  const usersData = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'src/data/dummy-users.json'), 'utf-8')
  );
  const tagsData = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'src/data/dummy-tags.json'), 'utf-8')
  );
  const reviewsData = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'src/data/dummy-reviews.json'), 'utf-8')
  );

  console.log('사용자 계정들 생성 중...');

  // 실제 사용자 계정 생성 (관리자와 임시사용자만)
  const createdUsers: User[] = [];
  for (const userData of usersData) {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash: passwordHash,
        name: userData.name,
        role: userData.role
      }
    });
    createdUsers.push(user);
  }

  console.log('태그 생성 중...');

  // 태그 생성
  const createdTags: Tag[] = [];
  for (const tagName of tagsData) {
    const tag = await prisma.tag.create({
      data: {
        name: tagName
      }
    });
    createdTags.push(tag);
  }

  console.log('리뷰 및 댓글 생성 중...');

  // 리뷰 생성 (모든 리뷰는 관리자가 작성하되, author는 임의의 이름)
  const createdReviews: any[] = [];
  for (const reviewData of reviewsData) {
    // 태그 찾기
    const tag = createdTags.find(t => t.name === reviewData.tag);
    if (!tag) {
      console.warn(`태그를 찾을 수 없습니다: ${reviewData.tag}`);
      continue;
    }

    // 리뷰 생성 (author는 더미데이터의 이름을 그대로 사용)
    const review = await prisma.review.create({
      data: {
        title: reviewData.title,
        content: reviewData.content,
        author: reviewData.author, // 단순 문자열로 저장
        rating: reviewData.rating,
        published: true,
        createdAt: new Date(reviewData.createdAt),
        updatedAt: new Date(reviewData.createdAt),
        tags: {
          connect: { id: tag.id }
        }
      }
    });

    createdReviews.push(review);

    // 댓글 생성 (실제 사용자가 작성)
    if (reviewData.comments && reviewData.comments.length > 0) {
      for (const commentData of reviewData.comments) {
        // 임시사용자가 댓글 작성
        const commentAuthor = createdUsers.find(user => user.role === 'USER') || createdUsers[1];
        
        if (!commentAuthor) {
          console.warn(`댓글 작성자를 찾을 수 없습니다: ${commentData.author}`);
          continue;
        }

        await prisma.comment.create({
          data: {
            content: commentData.content,
            reviewId: review.id,
            authorId: commentAuthor.id,
            createdAt: new Date(commentData.createdAt),
            updatedAt: new Date(commentData.createdAt)
          }
        });
      }
    }
  }

  console.log('좋아요 데이터 생성 중...');

  // 임시사용자가 몇몇 리뷰에 좋아요를 누른 데이터 생성
  const regularUser = createdUsers.find(user => user.role === 'USER');
  if (regularUser && createdReviews.length > 0) {
    // 평점이 4.0 이상인 리뷰들에 좋아요 추가
    const highRatingReviews = createdReviews.filter((_, index) => 
      reviewsData[index]?.rating >= 4.0
    );

    for (let i = 0; i < Math.min(highRatingReviews.length, 5); i++) {
      const review = highRatingReviews[i];
      const reviewData = reviewsData.find(r => r.title === review.title);
      
      await prisma.like.create({
        data: {
          userId: regularUser.id,
          reviewId: review.id,
          createdAt: reviewData ? new Date(reviewData.createdAt) : new Date()
        }
      });
    }
  }

  console.log('데이터 시드 완료!');
  console.log('=== 생성된 데이터 요약 ===');
  console.log(`실제 사용자: ${createdUsers.length}명 (관리자 1명, 임시사용자 1명)`);
  console.log(`태그: ${createdTags.length}개`);
  console.log(`리뷰: ${reviewsData.length}개 (모든 리뷰는 관리자가 작성, 작성자명은 임의 부여)`);
  
  // 총 댓글 수 계산
  const totalComments = reviewsData.reduce((sum, review) => sum + (review.comments?.length || 0), 0);
  console.log(`댓글: ${totalComments}개 (임시사용자가 작성)`);

  // 좋아요 수 계산
  const totalLikes = await prisma.like.count();
  console.log(`좋아요: ${totalLikes}개 (임시사용자가 평점 4.0 이상 리뷰에 좋아요)`);

  console.log('\n=== 실제 생성된 계정 정보 ===');
  createdUsers.forEach(user => {
    const originalData = usersData.find(u => u.email === user.email);
    console.log(`- ${user.name} (${user.email}) [${user.role}] - 비밀번호: ${originalData?.password || 'N/A'}`);
  });
}

main()
  .catch((e) => {
    console.error('시드 실행 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 