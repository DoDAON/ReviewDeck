import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // TODO: 실제 데이터베이스에서 데이터 가져오기
  return {
    reviews: [
      {
        id: '1',
        title: 'O.O',
        rating: 5.0,
        tag: '음악',
        author: '김리뷰어',
        excerpt: '누구나 실패할 거라 생각한 장르로 당당하게 성공한 그룹',
        createdAt: '2024-03-12T14:00:00Z'
      },
      {
        id: '2',
        title: '위플래쉬(2014)',
        rating: 4.5,
        tag: '영화',
        author: '이리뷰어',
        excerpt: '미치고 미칠 정도로 열광할 수 있는 뜨거운 순간',
        createdAt: '2024-03-15T14:30:00Z'
      },
      {
        id: '3',
        title: '쇼코의 미소',
        rating: 4.0,
        tag: '도서',
        author: '박리뷰어',
        excerpt: '멀지만 가까운 두 사람에게서 느낀 색다른 감정',
        createdAt: '2024-03-17T15:00:00Z'
      },
      {
        id: '4',
        title: '스즈메의 문단속',
        rating: 3.5,
        tag: '영화',
        author: '최리뷰어',
        excerpt: '아름다운 영상미와 함께 펼쳐지는 모험',
        createdAt: '2024-03-18T15:30:00Z'
      },
      {
        id: '5',
        title: '데드 스페이스',
        rating: 3.0,
        tag: '게임',
        author: '정리뷰어',
        excerpt: '공포와 액션이 절묘하게 어우러진 걸작',
        createdAt: '2024-03-19T16:00:00Z'
      },
      {
        id: '6',
        title: '더 글로리',
        rating: 2.5,
        tag: '드라마',
        author: '한리뷰어',
        excerpt: '복수극의 새로운 지평을 연 작품',
        createdAt: '2024-03-20T16:30:00Z'
      },
      {
        id: '7',
        title: '블루 아카이브',
        rating: 2.0,
        tag: '게임',
        author: '강리뷰어',
        excerpt: '독특한 세계관과 캐릭터의 매력',
        createdAt: '2024-03-20T17:00:00Z'
      },
      {
        id: '8',
        title: '스파이 패밀리',
        rating: 1.5,
        tag: '드라마',
        author: '윤리뷰어',
        excerpt: '유쾌한 스파이 가족의 이야기',
        createdAt: '2024-03-21T17:30:00Z'
      },
      {
        id: '9',
        title: '하이큐!!',
        rating: 1.0,
        tag: '드라마',
        author: '임리뷰어',
        excerpt: '열정 넘치는 배구부 이야기',
        createdAt: '2024-03-21T18:00:00Z'
      },
      {
        id: '10',
        title: '원피스',
        rating: 0.5,
        tag: '드라마',
        author: '배리뷰어',
        excerpt: '끝나지 않는 해적의 모험',
        createdAt: '2024-03-21T18:30:00Z'
      }
    ],
    tags: ['음악', '영화', '도서', '게임', '드라마']
  };
}; 