<script lang="ts">
  import Button from '../ui/Button.svelte';
  
  interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }
  
  export let comments: Comment[] = [];
  export let newComment = '';
  
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
  
  function handleCommentSubmit() {
    const trimmedComment = newComment.trim();
    
    if (!trimmedComment || trimmedComment.length < 5) {
      alert('댓글은 5자 이상으로 작성해야 합니다');
      return;
    }
    
    alert('댓글이 작성되었습니다!');
    newComment = '';
  }
</script>

<div class="border-t border-gray-200 pt-8">
  <h2 class="text-xl font-semibold mb-6">댓글 ({comments.length})</h2>
  
  <!-- 댓글 작성 폼 -->
  <div class="mb-8">
    <textarea
      bind:value={newComment}
      placeholder="댓글을 작성하세요..."
      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
      rows="3"
    ></textarea>
    <div class="flex justify-end mt-2">
      <Button
        variant="primary"
        on:click={handleCommentSubmit}
      >
        댓글 작성
      </Button>
    </div>
  </div>
  
  <!-- 댓글 목록 -->
  <div class="space-y-6">
    {#each comments as comment}
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex justify-between items-start mb-2">
          <span class="font-medium text-gray-900">{comment.author}</span>
          <span class="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
        </div>
        <p class="text-gray-700">{comment.content}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  :global(:root) {
    --primary: #059669;
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