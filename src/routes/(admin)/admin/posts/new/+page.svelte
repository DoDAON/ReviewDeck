<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let isSubmitting = false;
	let selectedTagIds: string[] = [];

	// 태그 선택 토글
	function toggleTag(tagId: string) {
		if (selectedTagIds.includes(tagId)) {
			selectedTagIds = selectedTagIds.filter(id => id !== tagId);
		} else {
			selectedTagIds = [...selectedTagIds, tagId];
		}
	}

	// 평점 옵션
	const ratingOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
</script>

<svelte:head>
	<title>새 게시물 작성 - ReviewDeck</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
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
			<h1 class="text-2xl font-bold text-gray-900">새 게시물 작성</h1>
			<p class="text-gray-600 mt-1">새로운 리뷰 게시물을 작성하세요.</p>
		</div>
	</div>

	<!-- 에러 메시지 -->
	{#if form?.error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4">
			<div class="flex">
				<svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<div>
					<h3 class="text-sm font-medium text-red-800">오류가 발생했습니다</h3>
					<p class="text-sm text-red-700 mt-1">{form.error}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- 작성 폼 -->
	<form
		method="POST"
		action="?/create"
		class="bg-white rounded-lg shadow-sm border"
		use:enhance={() => {
			isSubmitting = true;
			return ({ update }) => {
				update();
				isSubmitting = false;
			};
		}}
	>
		<div class="p-6 space-y-6">
			<!-- 제목 -->
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700 mb-2">
					제목 *
				</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
					placeholder="게시물 제목을 입력하세요"
				/>
			</div>

			<!-- 작성자 -->
			<div>
				<label for="author" class="block text-sm font-medium text-gray-700 mb-2">
					작성자 *
				</label>
				<input
					type="text"
					id="author"
					name="author"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
					placeholder="작성자 이름을 입력하세요"
				/>
			</div>

			<!-- 평점 -->
			<div>
				<label for="rating" class="block text-sm font-medium text-gray-700 mb-2">
					평점 *
				</label>
				<select
					id="rating"
					name="rating"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
				>
					<option value="">평점을 선택하세요</option>
					{#each ratingOptions as rating}
						<option value={rating}>
							{rating}
						</option>
					{/each}
				</select>
			</div>

			<!-- 태그 선택 -->
			<fieldset>
				<legend class="block text-sm font-medium text-gray-700 mb-2">
					태그
				</legend>
				<div class="flex flex-wrap gap-2">
					{#each data.allTags as tag}
						<label class="inline-flex items-center">
							<input
								type="checkbox"
								name="tags"
								value={tag.id}
								checked={selectedTagIds.includes(tag.id)}
								on:change={() => toggleTag(tag.id)}
								class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
							/>
							<span class="ml-2 text-sm text-gray-700">{tag.name}</span>
						</label>
					{/each}
				</div>
				{#if data.allTags.length === 0}
					<p class="text-sm text-gray-500 mt-2">사용 가능한 태그가 없습니다.</p>
				{/if}
			</fieldset>

			<!-- 내용 -->
			<div>
				<label for="content" class="block text-sm font-medium text-gray-700 mb-2">
					내용 *
				</label>
				<textarea
					id="content"
					name="content"
					rows="12"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
					placeholder="게시물 내용을 입력하세요"
				></textarea>
			</div>


		</div>

		<!-- 버튼 영역 -->
		<div class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
			<div class="flex justify-between">
				<a
					href="/admin/posts"
					class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					취소
				</a>
				<button
					type="submit"
					disabled={isSubmitting}
					class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors"
				>
					{#if isSubmitting}
						<svg class="w-4 h-4 inline mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						작성 중...
					{:else}
						<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						작성 완료
					{/if}
				</button>
			</div>
		</div>
	</form>
</div> 