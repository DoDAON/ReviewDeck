<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchQuery = '';
	let currentPage = 1;
	const itemsPerPage = 10;

	// 행 클릭으로 상세 페이지 이동
	function goToPost(postId: string) {
		goto(`/admin/posts/${postId}`);
	}

	// 검색 초기화
	function clearSearch() {
		searchQuery = '';
		currentPage = 1;
	}

	// 필터링된 리뷰 목록
	$: filteredReviews = data.reviews.filter((review) => {
		if (!searchQuery.trim()) return true;
		
		const query = searchQuery.toLowerCase();
		return review.title.toLowerCase().includes(query);
	});

	// 페이지네이션 계산
	$: totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
	$: paginatedReviews = filteredReviews.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// 검색 시 첫 페이지로 이동
	$: if (searchQuery !== undefined) {
		currentPage = 1;
	}

	// 페이지 이동
	function goToPage(pageNum: number) {
		currentPage = pageNum;
	}

	// 날짜 포맷팅
	function formatDate(date: Date | string) {
		return new Date(date).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// 게시물 삭제
	async function deletePost(postId: string, title: string) {
		if (!confirm(`정말로 "${title}" 게시물을 삭제하시겠습니까?`)) {
			return;
		}

		try {
			const response = await fetch(`/admin/posts/${postId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				alert('게시물이 삭제되었습니다.');
				location.reload();
			} else {
				alert('게시물 삭제에 실패했습니다.');
			}
		} catch (error) {
			console.error('삭제 오류:', error);
			alert('게시물 삭제에 실패했습니다.');
		}
	}
</script>

<svelte:head>
	<title>게시물 관리 - ReviewDeck</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">게시물 관리</h1>
			<p class="text-gray-600 mt-1">
				총 {filteredReviews.length}개의 게시물이 있습니다.
			</p>
		</div>
		<a
			href="/admin/posts/new"
			class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
		>
			<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			새 게시물 작성
		</a>
	</div>

	<!-- 검색 영역 -->
	<div class="bg-white p-6 rounded-lg shadow-sm border">
		<div class="flex gap-4">
			<div class="flex-1">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="제목으로 검색..."
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
				/>
			</div>
			{#if searchQuery}
				<button
					on:click={clearSearch}
					class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
				>
					초기화
				</button>
			{/if}
		</div>
	</div>

	<!-- 게시물 목록 -->
	<div class="bg-white rounded-lg shadow-sm border overflow-hidden">
		{#if paginatedReviews.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								번호
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								제목
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								작성자
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								평점
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								태그
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								댓글
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								생성일
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								상태
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								작업
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each paginatedReviews as review, index}
							{@const rowNumber = (currentPage - 1) * itemsPerPage + index + 1}
							<tr 
								class="hover:bg-gray-50 cursor-pointer"
								on:click={() => goToPost(review.id)}
							>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{rowNumber}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div>
											<div class="text-sm font-medium text-gray-900">
												{review.title}
											</div>
											<div class="text-sm text-gray-500 truncate max-w-xs">
												{review.content.substring(0, 50)}...
											</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{review.author}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="text-sm font-medium text-gray-900">{review.rating}</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex flex-wrap gap-1">
										{#each review.tags as tag}
											<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
												{tag.name}
											</span>
										{/each}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{review.commentCount}개
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{formatDate(review.createdAt)}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									{#if review.published}
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
											발행됨
										</span>
									{:else}
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
											임시저장
										</span>
									{/if}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div class="flex space-x-2">
										<a
											href="/admin/posts/{review.id}/edit"
											class="text-blue-600 hover:text-blue-900"
											on:click={(e) => e.stopPropagation()}
										>
											수정
										</a>
										<button
											on:click={(e) => {
												e.stopPropagation();
												deletePost(review.id, review.title);
											}}
											class="text-red-600 hover:text-red-900"
										>
											삭제
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="text-center py-12">
				<h3 class="mt-2 text-sm font-medium text-gray-900">게시물이 없습니다</h3>
				<p class="mt-1 text-sm text-gray-500">
					{#if searchQuery}
						검색 결과가 없습니다. 다른 키워드로 검색해보세요.
					{:else}
						첫 번째 게시물을 작성해보세요.
					{/if}
				</p>
				<div class="mt-6">
					<a
						href="/admin/posts/new"
						class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
						</svg>
						새 게시물 작성
					</a>
				</div>
			</div>
		{/if}
	</div>

	<!-- 페이징 -->
	{#if totalPages > 1}
		<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg">
			<div class="flex-1 flex justify-between sm:hidden">
				{#if currentPage > 1}
					<button
						on:click={() => goToPage(currentPage - 1)}
						class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						이전
					</button>
				{/if}
				{#if currentPage < totalPages}
					<button
						on:click={() => goToPage(currentPage + 1)}
						class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						다음
					</button>
				{/if}
			</div>
			<div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-gray-700">
						총 <span class="font-medium">{filteredReviews.length}</span>개 중
						<span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
						-
						<span class="font-medium">
							{Math.min(currentPage * itemsPerPage, filteredReviews.length)}
						</span> 표시
					</p>
				</div>
				<div>
					<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
						{#if currentPage > 1}
							<button
								on:click={() => goToPage(currentPage - 1)}
								class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								aria-label="이전 페이지"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							</button>
						{/if}

						{#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNum}
							{#if pageNum === currentPage}
								<button
									class="relative inline-flex items-center px-4 py-2 border border-emerald-500 bg-emerald-50 text-sm font-medium text-emerald-600"
								>
									{pageNum}
								</button>
							{:else if Math.abs(pageNum - currentPage) <= 2 || pageNum === 1 || pageNum === totalPages}
								<button
									on:click={() => goToPage(pageNum)}
									class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
								>
									{pageNum}
								</button>
							{:else if pageNum === currentPage - 3 || pageNum === currentPage + 3}
								<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
									...
								</span>
							{/if}
						{/each}

						{#if currentPage < totalPages}
							<button
								on:click={() => goToPage(currentPage + 1)}
								class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								aria-label="다음 페이지"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
								</svg>
							</button>
						{/if}
					</nav>
				</div>
			</div>
		</div>
	{/if}
</div> 