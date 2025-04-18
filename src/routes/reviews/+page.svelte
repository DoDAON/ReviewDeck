<script lang="ts">
  import { page } from '$app/stores';
  import { ReviewCard, FilterSection, RatingGraph } from '$lib';
  
  interface Review {
    id: string;
    title: string;
    rating: number;
    tag: string;
    author: string;
    excerpt: string;
    createdAt: string;
  }
  
  interface PageData {
    reviews: Review[];
    tags: string[];
  }
  
  export let data: PageData;
  
  let reviews = data.reviews;
  let tags = data.tags;
  let selectedTag: string | null = null;
  let searchQuery = '';
  let sortBy = 'newest'; // 'newest', 'rating', 'title'
  let selectedRating: number | null = null;
  
  $: filteredReviews = reviews
    .filter((review: Review) => {
      // 태그 필터링
      if (selectedTag && review.tag !== selectedTag) return false;
      
      // 평점 필터링
      if (selectedRating !== null) {
        if (selectedRating === 4.5) {
          if (review.rating < 4.5) return false;
        } else {
          if (review.rating < selectedRating || review.rating >= selectedRating + 0.5) return false;
        }
      }
      
      // 검색어 필터링
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          review.title.toLowerCase().includes(query) ||
          review.excerpt.toLowerCase().includes(query) ||
          review.author.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a: Review, b: Review) => {
      // 정렬
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  
  function getRatingColor(rating: number) {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-green-500';
    if (rating >= 3.5) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-500';
  }
  
  const tagColors: Record<string, string> = {
    '음악': 'bg-blue-100 text-blue-800',
    '영화': 'bg-purple-100 text-purple-800',
    '도서': 'bg-green-100 text-green-800',
    '게임': 'bg-red-100 text-red-800',
    '드라마': 'bg-yellow-100 text-yellow-800'
  };
  
  function getTagColor(tag: string) {
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-8">리뷰 목록</h1>
  
  <!-- 평점 그래프 -->
  <div class="max-w-4xl mx-auto">
    <RatingGraph 
      reviews={reviews}
      bind:selectedRating
    />
  </div>
  
  <!-- 필터 섹션 -->
  <FilterSection
    {tags}
    bind:selectedTag
    bind:searchQuery
    bind:sortBy
  />
  
  <!-- 리뷰 그리드 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredReviews as review}
      <ReviewCard {review} />
    {/each}
  </div>
  
  <!-- 결과가 없을 때 -->
  {#if filteredReviews.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500 text-lg">검색 결과가 없습니다.</p>
    </div>
  {/if}
</div>

<style>
  :global(:root) {
    --primary: #059669;
    --primary-light: #34D399;
    --primary-dark: #047857;
  }
  
  :global(.bg-primary) {
    background-color: var(--primary);
  }
  
  :global(.text-primary) {
    color: var(--primary);
  }
  
  :global(.border-primary) {
    border-color: var(--primary);
  }
  
  :global(.focus\:ring-primary:focus) {
    --tw-ring-color: var(--primary);
  }
  
  :global(.focus\:border-primary:focus) {
    border-color: var(--primary);
  }
</style> 