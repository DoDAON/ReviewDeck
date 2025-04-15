<script lang="ts">
  import { createEventDispatcher } from 'svelte';

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
  
  function handleClick(rating: number) {
    if (selectedRating === rating) {
      selectedRating = null;
    } else {
      selectedRating = rating;
    }
  }
</script>

<div class="flex flex-col gap-2 mb-8">
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
            style="height: {heightPercentages[i]}%"
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
</div> 