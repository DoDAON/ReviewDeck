<script lang="ts">
  import { Button } from '$lib';
  import { onMount } from 'svelte';
  
  interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }
  
  export let reviewId: string;
  export let comments: Comment[] = [];
  export let newComment = '';
  
  let isSubmitting = false;
  let isLoading = false;
  
  // 댓글 목록 로드
  async function loadComments() {
    if (!reviewId) return;
    
    isLoading = true;
    try {
      const response = await fetch(`/api/reviews/${reviewId}/comments`);
      const data = await response.json();
      
      if (data.success) {
        comments = data.comments;
      } else {
        console.error('댓글 로드 실패:', data.error);
      }
    } catch (error) {
      console.error('댓글 로드 중 오류:', error);
    } finally {
      isLoading = false;
    }
  }
  
  // 컴포넌트 마운트 시 댓글 로드
  onMount(() => {
    loadComments();
  });
  
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
  
  async function handleCommentSubmit() {
    const trimmedComment = newComment.trim();
    
    if (!trimmedComment || trimmedComment.length < 5) {
      alert('댓글은 5자 이상으로 작성해야 합니다');
      return;
    }
    
    if (isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: trimmedComment,
          reviewId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 댓글 작성 완료 알림
        alert('댓글이 작성되었습니다!');
        
        // 입력 필드 초기화
        newComment = '';
        
        // 댓글 목록 다시 로드
        await loadComments();
      } else {
        alert(data.error || '댓글 작성에 실패했습니다');
      }
    } catch (error) {
      console.error('댓글 작성 중 오류:', error);
      alert('댓글 작성 중 오류가 발생했습니다');
    } finally {
      isSubmitting = false;
    }
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
        disabled={isSubmitting}
      >
        {isSubmitting ? '작성 중...' : '댓글 작성'}
      </Button>
    </div>
  </div>
  
  <!-- 댓글 목록 -->
  {#if isLoading}
    <div class="flex justify-center py-8">
      <div class="text-gray-500">댓글을 불러오는 중...</div>
    </div>
  {:else}
    <div class="space-y-6">
      {#each comments as comment}
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <span class="font-medium text-gray-900">{comment.author}</span>
            <span class="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
          </div>
          <p class="text-gray-700">{comment.content}</p>
        </div>
      {:else}
        <div class="text-center py-8 text-gray-500">
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </div>
      {/each}
    </div>
  {/if}
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