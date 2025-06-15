<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData, ActionData } from './$types';
	import { page } from '$app/stores';
	
	export let data: PageData;
	export let form: ActionData;

	interface Tag {
		id: string;
		name: string;
		reviewCount: number;
	}

	let selectedTagId: string | null = null;
	let editingTagId: string | null = null;
	let editingTagName = '';
	let searchQuery = '';

	// 검색 필터링
	$: filteredTags = data.tags.filter((tag: Tag) => {
		if (!searchQuery.trim()) return true;
		return tag.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	// 태그 선택
	function selectTag(tagId: string) {
		if (editingTagId) return;
		selectedTagId = selectedTagId === tagId ? null : tagId;
	}

	// 태그 편집 시작
	function startEditing(tag: Tag) {
		editingTagId = tag.id;
		editingTagName = tag.name;
		selectedTagId = null;
		// 다음 tick에서 포커스
		setTimeout(() => {
			const input = document.querySelector(`#edit-tag-input-${tag.id}`) as HTMLInputElement;
			if (input) {
				input.focus();
				input.select();
			}
		}, 0);
	}

	// 태그 편집 취소
	function cancelEditing() {
		editingTagId = null;
		editingTagName = '';
	}

	// 검색 초기화
	function clearSearch() {
		searchQuery = '';
	}

	// 키보드 이벤트 처리
	function handleKeydown(event: KeyboardEvent, action: string, tagId?: string) {
		if (event.key === 'Escape') {
			if (action === 'edit') {
				cancelEditing();
			}
		} else if (event.key === 'Enter' && action === 'edit') {
			event.preventDefault();
			if (editingTagName.trim() && editingTagName !== data.tags.find(t => t.id === tagId)?.name) {
				// 폼 제출 트리거
				const form = document.querySelector(`#edit-tag-form-${tagId}`) as HTMLFormElement;
				if (form) {
					form.requestSubmit();
				}
			}
		}
	}

	// 외부 클릭 처리
	function handleOutsideClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		
		// 태그 편집 중이고 해당 태그 카드가 아닌 곳을 클릭한 경우
		if (editingTagId && !target.closest(`#tag-card-${editingTagId}`)) {
			cancelEditing();
		}
	}

	// 폼 제출 후 처리
	function handleFormSubmit() {
		return async ({ result, update }: any) => {
			if (result.type === 'success') {
				editingTagId = null;
				editingTagName = '';
				selectedTagId = null;
				await update();
			} else if (result.type === 'failure') {
				// 에러가 있어도 상태 업데이트
				await update();
			}
		};
	}

	// 태그 삭제 확인
	function confirmDelete(tag: Tag) {
		if (confirm(`정말로 "${tag.name}" 태그를 삭제하시겠습니까?${tag.reviewCount > 0 ? '\n\n이 태그를 사용하는 게시물이 있어 삭제할 수 없습니다.' : ''}`)) {
			if (tag.reviewCount > 0) {
				return false;
			}
			return true;
		}
		return false;
	}
</script>

<svelte:head>
	<title>태그 관리 - ReviewDeck</title>
</svelte:head>

<svelte:window on:click={handleOutsideClick} />

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">태그 관리</h1>
			<p class="text-gray-600 mt-1">
				총 {filteredTags.length}개의 태그가 있습니다.
			</p>
		</div>
		<a
			href="/admin/tags/new"
			class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
		>
			<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			새 태그 생성
		</a>
	</div>

	<!-- 검색 영역 -->
	<div class="bg-white p-6 rounded-lg shadow-sm border">
		<div class="flex gap-4">
			<div class="flex-1">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="태그명으로 검색..."
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

	<!-- 태그 목록 -->
	<div class="space-y-4">
		<!-- 기존 태그 카드들 -->
		{#if filteredTags.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each filteredTags as tag (tag.id)}
					<div 
						id="tag-card-{tag.id}"
						class="bg-white p-6 rounded-lg shadow-sm border transition-all duration-200 cursor-pointer {selectedTagId === tag.id ? 'border-emerald-500 shadow-md ring-2 ring-emerald-200' : 'hover:shadow-md hover:border-gray-300'} {editingTagId === tag.id ? 'border-blue-500 shadow-md ring-2 ring-blue-200' : ''}"
						on:click={() => selectTag(tag.id)}
						on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectTag(tag.id)}
						role="button"
						tabindex="0"
					>
						{#if editingTagId === tag.id}
							<!-- 편집 모드 -->
							<form
								id="edit-tag-form-{tag.id}"
								method="POST"
								action="?/update"
								use:enhance={handleFormSubmit()}
								class="space-y-4"
							>
								<input type="hidden" name="id" value={tag.id} />
								<div>
									<input
										id="edit-tag-input-{tag.id}"
										name="name"
										type="text"
										bind:value={editingTagName}
										on:keydown={(e) => handleKeydown(e, 'edit', tag.id)}
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										required
									/>
								</div>
								<div class="flex gap-2">
									<button
										type="submit"
										disabled={!editingTagName.trim() || editingTagName === tag.name}
										class="px-3 py-1 text-sm rounded transition-colors {!editingTagName.trim() || editingTagName === tag.name ? 'bg-blue-300 text-blue-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}"
									>
										저장
									</button>
									<button
										type="button"
										on:click|stopPropagation={cancelEditing}
										class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
									>
										취소
									</button>
								</div>
							</form>
						{:else}
							<!-- 일반 모드 -->
							<div class="relative">
								<!-- 태그 정보 -->
								<div class="mb-3">
									<h3 class="text-lg font-semibold text-gray-900 mb-1">{tag.name}</h3>
									<p class="text-sm text-gray-500">
										{tag.reviewCount}개의 게시물에서 사용됨
									</p>
								</div>

								<!-- 태그 뱃지 -->
								<div>
									<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
										#{tag.name}
									</span>
								</div>

								<!-- 선택된 태그의 액션 버튼 -->
								{#if selectedTagId === tag.id}
									<div class="mt-4 pt-4 border-t border-gray-200 flex gap-3 justify-end">
										<button
											on:click|stopPropagation={() => startEditing(tag)}
											class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 rounded-lg transition-colors"
										>
											<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											수정
										</button>
										<form
											method="POST"
											action="?/delete"
											use:enhance={handleFormSubmit()}
											on:submit|preventDefault={(e) => {
												if (confirmDelete(tag)) {
													(e.target as HTMLFormElement).submit();
												}
											}}
											class="inline"
										>
											<input type="hidden" name="id" value={tag.id} />
											<button
												type="submit"
												on:click|stopPropagation
												class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg transition-colors {tag.reviewCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}"
												title={tag.reviewCount > 0 ? '사용 중인 태그는 삭제할 수 없습니다' : ''}
												disabled={tag.reviewCount > 0}
											>
												<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
												삭제
											</button>
										</form>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center py-12 bg-white rounded-lg border">
				<div class="text-gray-400 text-6xl mb-4">🏷️</div>
				<h3 class="mt-2 text-sm font-medium text-gray-900">태그가 없습니다</h3>
				<p class="mt-1 text-sm text-gray-500">
					{#if searchQuery}
						검색 결과가 없습니다. 다른 키워드로 검색해보세요.
					{:else}
						첫 번째 태그를 생성해보세요.
					{/if}
				</p>
				{#if !searchQuery}
					<div class="mt-6">
						<a
							href="/admin/tags/new"
							class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
						>
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
							새 태그 생성
						</a>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- 에러 메시지 -->
	{#if form?.error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<div class="ml-3">
					<p class="text-sm text-red-800">
						{form.error}
					</p>
				</div>
			</div>
		</div>
	{/if}
</div> 