<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let isDeleting = false;

	// 날짜 포맷팅
	function formatDate(date: Date | string) {
		return new Date(date).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}



	// 게시물 삭제
	async function deletePost() {
		if (!confirm(`정말로 "${data.review.title}" 게시물을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
			return;
		}

		isDeleting = true;

		try {
			const response = await fetch(`/admin/posts/${data.review.id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				alert('게시물이 삭제되었습니다.');
				window.location.href = '/admin/posts';
			} else {
				alert('게시물 삭제에 실패했습니다.');
			}
		} catch (error) {
			console.error('삭제 오류:', error);
			alert('게시물 삭제에 실패했습니다.');
		} finally {
			isDeleting = false;
		}
	}
</script>

<svelte:head>
	<title>{data.review.title} - ReviewDeck 관리</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex justify-between items-start">
		<div class="flex items-center space-x-4">
			<a
				href="/admin/posts"
				class="text-gray-500 hover:text-gray-700 transition-colors"
				aria-label="게시물 목록으로 돌아가기"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</a>
			<div>
				<h1 class="text-2xl font-bold text-gray-900">게시물 상세</h1>
				<p class="text-gray-600 mt-1">게시물을 확인하고 관리하세요.</p>
			</div>
		</div>
		<div class="flex space-x-3">
			<a
				href="/admin/posts/{data.review.id}/edit"
				class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
			>
				<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
				</svg>
				수정
			</a>
			<button
				on:click={deletePost}
				disabled={isDeleting}
				class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
			>
				<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
				{isDeleting ? '삭제 중...' : '삭제'}
			</button>
		</div>
	</div>

	<!-- 게시물 정보 -->
	<div class="bg-white rounded-lg shadow-sm border">
		<div class="p-6">
			<!-- 제목과 메타 정보 -->
			<div class="mb-6">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">{data.review.title}</h2>
				<div class="flex flex-wrap items-center gap-6 text-sm text-gray-600">
					<div class="flex items-center">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						작성자: {data.review.author}
					</div>
					<div class="flex items-center">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						작성일: {formatDate(data.review.createdAt)}
					</div>
					{#if data.review.updatedAt !== data.review.createdAt}
						<div class="flex items-center">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							수정일: {formatDate(data.review.updatedAt)}
						</div>
					{/if}
					<div class="flex items-center">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
						댓글: {data.review.comments.length}개
					</div>
				</div>
			</div>

			<!-- 평점 -->
			<div class="mb-6">
				<div class="flex items-center">
					<span class="text-sm font-medium text-gray-700 mr-2">평점:</span>
					<span class="text-lg font-bold text-gray-900">{data.review.rating}</span>
				</div>
			</div>

			<!-- 태그 -->
			{#if data.review.tags.length > 0}
				<div class="mb-6">
					<span class="text-sm font-medium text-gray-700 mr-2">태그:</span>
					<div class="flex flex-wrap gap-2 mt-2">
						{#each data.review.tags as tag}
							<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
								{tag.name}
							</span>
						{/each}
					</div>
				</div>
			{/if}

			<!-- 발행 상태 -->
			<div class="mb-6">
				<span class="text-sm font-medium text-gray-700 mr-2">상태:</span>
				{#if data.review.published}
					<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						발행됨
					</span>
				{:else}
					<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						임시저장
					</span>
				{/if}
			</div>

			<!-- 구분선 -->
			<div class="border-t border-gray-200 my-6"></div>

			<!-- 내용 -->
			<div class="prose max-w-none">
				<div class="text-gray-900 leading-relaxed whitespace-pre-wrap">{data.review.content}</div>
			</div>

			<!-- 이미지 (있다면) -->
			{#if data.review.images.length > 0}
				<div class="mt-8">
					<h3 class="text-lg font-medium text-gray-900 mb-4">첨부 이미지</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each data.review.images as image}
							<div class="border border-gray-200 rounded-lg overflow-hidden">
								<img 
									src={image.url} 
									alt="게시물 이미지"
									class="w-full h-48 object-cover"
								/>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- 댓글 목록 -->
	{#if data.review.comments.length > 0}
		<div class="bg-white rounded-lg shadow-sm border">
			<div class="p-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">
					댓글 ({data.review.comments.length}개)
				</h3>
				<div class="space-y-4">
					{#each data.review.comments as comment}
						<div class="border-l-4 border-blue-500 pl-4 py-2">
							<div class="flex items-center justify-between mb-2">
								<div class="flex items-center space-x-2">
									<span class="font-medium text-gray-900">{comment.author.name}</span>
									<span class="text-sm text-gray-500">({comment.author.email})</span>
								</div>
								<span class="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
							</div>
							<p class="text-gray-700">{comment.content}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-white rounded-lg shadow-sm border">
			<div class="p-6 text-center">
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
				<h3 class="mt-2 text-sm font-medium text-gray-900">댓글이 없습니다</h3>
				<p class="mt-1 text-sm text-gray-500">이 게시물에는 아직 댓글이 없습니다.</p>
			</div>
		</div>
	{/if}
</div> 