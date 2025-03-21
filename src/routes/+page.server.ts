import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // TODO: 실제 데이터베이스에서 데이터 가져오기
  return {
    featuredReviews: [
      {
        id: '1',
        title: '최고의 맛집 리뷰',
        rating: 4.8,
        category: '맛집',
        author: '김리뷰어'
      },
      {
        id: '2',
        title: '인기 영화 리뷰',
        rating: 4.5,
        category: '영화',
        author: '이리뷰어'
      },
      {
        id: '3',
        title: '추천 도서 리뷰',
        rating: 4.7,
        category: '도서',
        author: '박리뷰어'
      }
    ],
    categories: [
      { id: '1', name: '맛집', count: 150 },
      { id: '2', name: '영화', count: 120 },
      { id: '3', name: '도서', count: 100 },
      { id: '4', name: '게임', count: 80 },
      { id: '5', name: '여행', count: 90 }
    ],
    popularTags: [
      { name: '맛집', count: 200 },
      { name: '영화', count: 180 },
      { name: '도서', count: 150 },
      { name: '게임', count: 120 },
      { name: '여행', count: 100 }
    ]
  };
}; 