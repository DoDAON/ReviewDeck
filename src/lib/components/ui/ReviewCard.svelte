<script lang="ts">
  import { Button } from '$lib';
  
  export let review: {
    id: string;
    title: string;
    rating: number;
    tag: string;
    author: string;
    excerpt: string;
  };
</script>

<div class="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-lg">
  <div class="p-6">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-1">
        <div class="text-[#FBBF24]">{'★'.repeat(Math.floor(review.rating))}{'☆'.repeat(5 - Math.floor(review.rating))}</div>
        <span class="text-[#4B5563] text-sm">{review.rating}</span>
      </div>
      <span class="rounded-full bg-[#E5E7EB] px-3 py-1 text-sm font-medium text-[#4B5563]">
        {review.tag}
      </span>
    </div>
    <h3 class="mb-2 text-xl font-bold text-[#1F2937] transition-colors duration-200 group-hover:text-[#059669]">
      {review.title}
    </h3>
    <p class="mb-4 line-clamp-2 text-[#4B5563]">{review.excerpt}</p>
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#9CA3AF]">작성자: {review.author}</span>
      <Button href={`/reviews/${review.id}`} variant="primary">
        자세히 보기
      </Button>
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 