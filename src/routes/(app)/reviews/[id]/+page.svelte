<script lang="ts">
  import { page } from '$app/stores';
  import { ReviewHeader, CommentSection } from '$lib';
  
  interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }
  
  interface Review {
    id: string;
    title: string;
    rating: number;
    tag: string;
    author: string;
    content: string;
    createdAt: string;
    comments: Comment[];
  }
  
  interface PageData {
    review: Review;
  }
  
  export let data: PageData;
  
  let { review } = data;
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <!-- 리뷰 헤더 -->
    <ReviewHeader {review} />
    
    <!-- 리뷰 내용 -->
    <div class="prose prose-lg max-w-none mb-12">
      <p class="whitespace-pre-line">{review.content}</p>
    </div>
    
    <!-- 댓글 섹션 -->
    <CommentSection reviewId={review.id} />
  </div>
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
  
  :global(.bg-primary-dark) {
    background-color: var(--primary-dark);
  }
</style> 