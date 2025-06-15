<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let searchQuery = '';
	let currentPage = 1;
	const itemsPerPage = 10;

	// 검색 초기화
	function clearSearch() {
		searchQuery = '';
		currentPage = 1;
	}

	// 필터링된 유저 목록
	$: filteredUsers = data.users.filter((user) => {
		if (!searchQuery.trim()) return true;
		
		const query = searchQuery.toLowerCase();
		return user.name.toLowerCase().includes(query) || 
			   user.email.toLowerCase().includes(query);
	});

	// 페이지네이션 계산
	$: totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	$: paginatedUsers = filteredUsers.slice(
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

	// 유저 삭제
	async function deleteUser(userId: string, userName: string) {
		if (!confirm(`정말로 "${userName}" 유저를 삭제하시겠습니까?`)) {
			return;
		}

		try {
			const response = await fetch(`/admin/users/${userId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				alert('유저가 삭제되었습니다.');
				location.reload();
			} else {
				alert('유저 삭제에 실패했습니다.');
			}
		} catch (error) {
			console.error('삭제 오류:', error);
			alert('유저 삭제에 실패했습니다.');
		}
	}
</script>

<svelte:head>
	<title>유저 관리 - ReviewDeck</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">유저 관리</h1>
			<p class="text-gray-600 mt-1">
				총 {filteredUsers.length}명의 유저가 있습니다.
			</p>
		</div>
	</div>

	<!-- 검색 영역 -->
	<div class="bg-white p-6 rounded-lg shadow-sm border">
		<div class="flex gap-4">
			<div class="flex-1">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="이름 또는 이메일로 검색..."
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

	<!-- 유저 목록 -->
	<div class="bg-white rounded-lg shadow-sm border overflow-hidden">
		{#if paginatedUsers.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								번호
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								이름
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								이메일 (아이디)
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								UID
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								역할
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								생성일
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								작업
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each paginatedUsers as user, index}
							{@const rowNumber = (currentPage - 1) * itemsPerPage + index + 1}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{rowNumber}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm font-medium text-gray-900">
										{user.name}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{user.email}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{user.id}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
										{user.role}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{formatDate(user.createdAt)}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div class="flex space-x-2">
										<a
											href="/admin/users/{user.id}/edit"
											class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors"
										>
											수정
										</a>
										<button
											on:click={() => deleteUser(user.id, user.name)}
											class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
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

			<!-- 페이지네이션 -->
			{#if totalPages > 1}
				<div class="bg-white px-6 py-3 border-t border-gray-200">
					<div class="flex items-center justify-between">
						<div class="flex-1 flex justify-between sm:hidden">
							<button
								on:click={() => goToPage(Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
								class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								이전
							</button>
							<button
								on:click={() => goToPage(Math.min(totalPages, currentPage + 1))}
								disabled={currentPage === totalPages}
								class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								다음
							</button>
						</div>
						<div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
							<div>
								<p class="text-sm text-gray-700">
									총 <span class="font-medium">{filteredUsers.length}</span>개 중{' '}
									<span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>-<span class="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span>개 표시
								</p>
							</div>
							<div>
								<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
									<button
										on:click={() => goToPage(Math.max(1, currentPage - 1))}
										disabled={currentPage === 1}
										class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
										</svg>
									</button>
									{#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNum}
										{#if pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)}
											<button
												on:click={() => goToPage(pageNum)}
												class="relative inline-flex items-center px-4 py-2 border text-sm font-medium {pageNum === currentPage ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}"
											>
												{pageNum}
											</button>
										{:else if pageNum === currentPage - 3 || pageNum === currentPage + 3}
											<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
												...
											</span>
										{/if}
									{/each}
									<button
										on:click={() => goToPage(Math.min(totalPages, currentPage + 1))}
										disabled={currentPage === totalPages}
										class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
										</svg>
									</button>
								</nav>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			<div class="text-center py-12">
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<h3 class="mt-2 text-sm font-medium text-gray-900">유저가 없습니다</h3>
				<p class="mt-1 text-sm text-gray-500">
					{#if searchQuery}
						검색 조건에 맞는 유저를 찾을 수 없습니다.
					{:else}
						등록된 유저가 없습니다.
					{/if}
				</p>
			</div>
		{/if}
	</div>
</div> 