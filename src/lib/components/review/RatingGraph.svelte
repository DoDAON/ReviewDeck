<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { Card } from '$lib';

  interface Review {
    id: string;
    title: string;
    rating: number;
    tag: string;
    author: string;
    excerpt: string;
    createdAt: string;
  }

  export let reviews: Review[];
  export let selectedRating: number | null = null;

  const dispatch = createEventDispatcher();
  
  // 평점 범위 정의
  const ratingRanges = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
  
  // 각 평점 범위에 해당하는 리뷰 수 계산
  $: ratingCounts = ratingRanges.map(rating => {
    if (rating === 4.5) {
      return reviews.filter(review => review.rating >= 4.5).length;
    }
    return reviews.filter(review => 
      review.rating >= rating && review.rating < rating + 0.5
    ).length;
  });
  
  // 최대 리뷰 수 계산
  $: maxCount = Math.max(...ratingCounts, 1); // 최소값을 1로 설정
  
  // 각 막대의 높이 비율 계산 (최소 높이 10%)
  $: heightPercentages = ratingCounts.map(count => 
    Math.max((count / maxCount) * 100, 10)
  );
  
  let hoveredRating: number | null = null;
  let isMounted = false;
  
  onMount(() => {
    isMounted = true;
  });
  
  function handleClick(rating: number) {
    if (selectedRating === rating) {
      selectedRating = null;
    } else {
      selectedRating = rating;
    }
  }
</script>

<Card className="mb-8">
  <div class="flex flex-col gap-2">
    <div class="flex items-end justify-between h-48 gap-[13px]">
      {#each ratingRanges as rating, i}
        <button 
          type="button"
          class="flex flex-col items-center gap-2 group cursor-pointer w-[11%] bg-transparent border-none p-0 h-full"
          on:mouseenter={() => hoveredRating = rating}
          on:mouseleave={() => hoveredRating = null}
          on:click={() => handleClick(rating)}
          aria-pressed={selectedRating === rating}
          aria-label="평점 {rating.toFixed(1)} 필터"
        >
          <div class="flex-1 w-full flex items-end">
            <div 
              class="w-full mx-auto transition-all duration-200"
              style="height: {isMounted ? heightPercentages[i] : 0}%"
            >
              <div
                class="w-full h-full rounded transition-colors duration-200 {
                  selectedRating === null 
                    ? hoveredRating === rating
                      ? 'bg-[#fde047]'
                      : 'bg-[#fde047]/40'
                    : selectedRating === rating
                      ? 'bg-[#fde047]'
                      : 'bg-[#fde047]/20'
                }"
              ></div>
            </div>
          </div>
          <span class="text-[#059669] text-base font-medium">{rating.toFixed(1)}</span>
        </button>
      {/each}
    </div>
    
    <!-- 그래프 제목과 부제목 -->
    <div class="mt-4 text-center">
      <h3 class="text-xl font-bold text-gray-900 mb-1">평점 별 리뷰 현황</h3>
      <p class="text-sm text-gray-500">클릭 시 평점 별로 게시물을 모아볼 수 있어요</p>
    </div>
  </div>
</Card>

<style>
  div[style*="height"] {
    transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style> 