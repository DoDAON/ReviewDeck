import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // TODO: 실제 데이터베이스에서 데이터 가져오기
  return {
    featuredReviews: [
      {
        id: '1',
        title: 'O.O',
        rating: 5.0,
        category: '음악',
        author: '김리뷰어',
        excerpt: '누구나 실패할 거라 생각한 장르로 당당하게 성공한 그룹',
        createdAt: '2024-03-21T14:00:00Z'
      },
      {
        id: '2',
        title: '위플래쉬(2014)',
        rating: 4.5,
        category: '영화',
        author: '이리뷰어',
        excerpt: '미치고 미칠 정도로 열광할 수 있는 뜨거운 순간',
        createdAt: '2024-03-21T14:30:00Z'
      },
      {
        id: '3',
        title: '쇼코의 미소',
        rating: 4.7,
        category: '도서',
        author: '박리뷰어',
        excerpt: '멀지만 가까운 두 사람에게서 느낀 색다른 감정',
        createdAt: '2024-03-21T15:00:00Z'
      }
    ]
  };
}; 