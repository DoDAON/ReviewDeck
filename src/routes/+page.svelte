<script lang="ts">
  import { onMount } from 'svelte';
  
  let featuredReviews = [
    {
      id: '3',
      title: '추천 도서 리뷰',
      rating: 4.7,
      category: '도서',
      author: '박리뷰어',
      excerpt: '이 책은 정말 많은 통찰을 주는 책입니다. 강력 추천합니다.',
      createdAt: '2024-03-21T15:00:00Z'
    },
    {
      id: '2',
      title: '인기 영화 리뷰',
      rating: 4.5,
      category: '영화',
      author: '이리뷰어',
      excerpt: '오랜만에 정말 재미있게 본 영화. 연출과 연기 모두 인상적이었습니다.',
      createdAt: '2024-03-21T14:30:00Z'
    },
    {
      id: '1',
      title: '최고의 맛집 리뷰',
      rating: 4.8,
      category: '맛집',
      author: '김리뷰어',
      excerpt: '맛과 분위기 모두 완벽했던 곳. 특히 디저트는 놓치면 후회할 정도입니다.',
      createdAt: '2024-03-21T14:00:00Z'
    }
  ].sort((a, b) => parseInt(b.id) - parseInt(a.id)); // id 내림차순 정렬
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
  <!-- Hero Section -->
  <section class="relative py-32">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-6xl font-bold text-gray-900 mb-8 tracking-tight">
          Review<span class="text-blue-600">Deck</span>
        </h1>
        <p class="text-xl text-gray-600 mb-12 leading-relaxed">
          당신의 리뷰를 한눈에 관리하고 공유하세요. 
          <span class="block mt-2">평점과 카테고리별로 정리된 리뷰를 통해 더 나은 의사결정을 도와드립니다.</span>
        </p>
        <a href="/reviews" 
           class="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full
                  transform transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl">
          리뷰 둘러보기
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Latest Reviews -->
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">최신 리뷰</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each featuredReviews as review}
          <a href="/reviews/{review.id}" 
             class="group block transform transition-all duration-200 hover:scale-105">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100
                        transition-shadow duration-200 hover:shadow-xl">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                    {review.category}
                  </span>
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-medium text-gray-900">{review.rating}</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 
                           transition-colors duration-200">
                  {review.title}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">{review.excerpt}</p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">작성자: {review.author}</span>
                  <span class="text-blue-600 group-hover:translate-x-2 transform transition-transform duration-200">
                    자세히 보기 →
                  </span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>