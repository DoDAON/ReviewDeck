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
  let likesLoading = false;
  let totalLikes = 0;
  let isLiked = false;
  let showCancelConfirm = false;
  
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
  
  // 좋아요 상태 로드
  async function loadLikes() {
    if (!reviewId) return;
    
    likesLoading = true;
    try {
      const response = await fetch(`/api/reviews/${reviewId}/likes`);
      const data = await response.json();
      
      if (data.success) {
        totalLikes = data.totalLikes;
        isLiked = data.isLiked;
      } else {
        console.error('좋아요 로드 실패:', data.error);
      }
    } catch (error) {
      console.error('좋아요 로드 중 오류:', error);
    } finally {
      likesLoading = false;
    }
  }
  
  // 좋아요 처리
  async function handleLike() {
    if (likesLoading) return;

    // 이미 좋아요를 누른 상태라면 취소 확인 표시
    if (isLiked) {
      showCancelConfirm = true;
      return;
    }

    // 좋아요 추가
    await toggleLike();
  }
  
  // 좋아요 취소 확인
  async function confirmCancelLike() {
    showCancelConfirm = false;
    await toggleLike();
  }
  
  // 좋아요 취소 확인 모달 닫기
  function closeCancelConfirm() {
    showCancelConfirm = false;
  }
  
  // 좋아요 토글
  async function toggleLike() {
    if (likesLoading) return;
    
    likesLoading = true;
    try {
      const response = await fetch(`/api/reviews/${reviewId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        totalLikes = data.totalLikes;
        isLiked = data.isLiked;
      } else {
        if (data.error === '로그인이 필요합니다') {
          alert('로그인 후 좋아요를 누를 수 있습니다.');
        } else {
          alert(data.error || '좋아요 처리에 실패했습니다');
        }
      }
    } catch (error) {
      console.error('좋아요 토글 중 오류:', error);
      alert('좋아요 처리 중 오류가 발생했습니다');
    } finally {
      likesLoading = false;
    }
  }
  
  // 컴포넌트 마운트 시 댓글과 좋아요 로드
  onMount(() => {
    loadComments();
    loadLikes();
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
  <!-- 좋아요 섹션 -->
  <div class="mb-6 flex items-center justify-between">
    <h2 class="text-xl font-semibold">댓글 ({comments.length})</h2>
    
    <!-- 좋아요 버튼 -->
    <div class="relative flex items-center">
      <button
        on:click={handleLike}
        disabled={likesLoading}
        class="flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 {isLiked 
          ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100' 
          : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50'} 
        {likesLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
      >
        <!-- 하트 아이콘 -->
        <svg 
          class="w-5 h-5 transition-colors duration-200 {isLiked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        
        <!-- 좋아요 수 -->
        <span class="font-medium {isLiked ? 'text-red-600' : 'text-gray-600'}">
          {totalLikes}
        </span>
      </button>

      <!-- 좋아요 취소 확인 모달 -->
      {#if showCancelConfirm}
        <div class="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
          <p class="text-sm text-gray-700 mb-3">좋아요를 취소할까요?</p>
          <div class="flex justify-end space-x-2">
            <button
              on:click={closeCancelConfirm}
              class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              아니오
            </button>
            <button
              on:click={confirmCancelLike}
              class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              예
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
  
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

<!-- 모달 배경 클릭 시 닫기 -->
{#if showCancelConfirm}
  <div 
    class="fixed inset-0 z-0" 
    on:click={closeCancelConfirm}
    on:keydown={(e) => e.key === 'Escape' && closeCancelConfirm()}
    role="button"
    tabindex="0"
  ></div>
{/if}

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