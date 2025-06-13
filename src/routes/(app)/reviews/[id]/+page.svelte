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
  let newComment = '';
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
  
  function handleCommentSubmit() {
    // TODO: 실제 댓글 제출 로직 구현
    console.log('댓글 제출:', newComment);
    newComment = '';
  }
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
    <CommentSection comments={review.comments} bind:newComment />
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