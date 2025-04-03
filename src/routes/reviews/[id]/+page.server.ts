import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  // TODO: 실제 데이터베이스에서 데이터 가져오기
  const reviews = [
    {
      id: '1',
      title: 'O.O',
      rating: 5.0,
      tag: '음악',
      author: '김리뷰어',
      content: '누구나 실패할 거라 생각한 장르로 당당하게 성공한 그룹. 이 앨범은 K-POP의 한계를 뛰어넘는 도전적인 시도가 담겨 있습니다. 기존의 장르 구분을 무시하고 다양한 음악적 요소를 조화롭게 녹여낸 작품입니다. 특히 타이틀곡 "O.O"는 힙합, 록, EDM 등 다양한 장르가 뒤섞인 독특한 구성이 돋보입니다. 뮤직비디오 역시 기존 K-POP의 틀을 벗어난 실험적인 영상미를 보여주고 있습니다. 이 앨범은 단순한 음악을 넘어 하나의 예술 작품으로 평가받을 만합니다.',
      createdAt: '2024-03-21T14:00:00Z',
      comments: [
        {
          id: '1',
          content: '정말 혁신적인 앨범이에요!',
          author: '팬1',
          createdAt: '2024-03-21T15:00:00Z'
        },
        {
          id: '2',
          content: '처음에는 이해하기 어려웠는데, 여러번 듣다보니 매력이 느껴지네요.',
          author: '팬2',
          createdAt: '2024-03-21T16:00:00Z'
        }
      ]
    },
    {
      id: '2',
      title: '위플래쉬(2014)',
      rating: 4.5,
      tag: '영화',
      author: '이리뷰어',
      content: '미치고 미칠 정도로 열광할 수 있는 뜨거운 순간. 이 영화는 재즈 드러머를 꿈꾸는 한 청년의 광기어린 도전을 다룬 작품입니다. 주인공 앤드루의 완벽주의적 성격과 지옥 같은 연습 과정이 생생하게 묘사되어 있습니다. 특히 마지막 솔로 공연 장면은 영화사에 길이 남을 명장면으로 평가받고 있습니다. 음악과 연기, 연출이 완벽하게 조화를 이루어낸 걸작입니다.',
      createdAt: '2024-03-21T14:30:00Z',
      comments: [
        {
          id: '3',
          content: '드러머 지망생이라 더 공감이 됐어요.',
          author: '음악학도',
          createdAt: '2024-03-21T17:00:00Z'
        },
        {
          id: '4',
          content: '마지막 장면은 정말 압권이었습니다.',
          author: '영화팬',
          createdAt: '2024-03-21T17:30:00Z'
        }
      ]
    },
    {
      id: '3',
      title: '쇼코의 미소',
      rating: 4.0,
      tag: '도서',
      author: '박리뷰어',
      content: '멀지만 가까운 두 사람에게서 느낀 색다른 감정. 이 소설은 서로 다른 문화와 언어를 가진 두 사람의 특별한 만남을 그린 작품입니다. 작가는 섬세한 필치로 문화적 차이와 소통의 어려움, 그리고 그 속에서 피어나는 진정한 이해와 우정을 아름답게 묘사합니다. 특히 주인공들이 서로를 이해하려 노력하는 과정에서 느끼는 미묘한 감정의 변화가 인상적입니다. 번역의 품질도 원작의 감동을 잘 살려냈습니다.',
      createdAt: '2024-03-21T15:00:00Z',
      comments: [
        {
          id: '5',
          content: '번역이 정말 자연스러워요.',
          author: '독서광',
          createdAt: '2024-03-21T18:00:00Z'
        },
        {
          id: '6',
          content: '문화적 차이를 다루는 방식이 인상적이었습니다.',
          author: '책벌레',
          createdAt: '2024-03-21T18:30:00Z'
        }
      ]
    }
  ];
  
  const review = reviews.find(r => r.id === params.id);
  
  if (!review) {
    throw error(404, '리뷰를 찾을 수 없습니다.');
  }
  
  return {
    review
  };
}; 