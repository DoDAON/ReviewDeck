<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isSubmitting = false;
</script>

<svelte:head>
	<title>새 태그 생성 - ReviewDeck</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex items-center space-x-4">
		<a
			href="/admin/tags"
			class="text-gray-500 hover:text-gray-700 transition-colors"
			aria-label="태그 목록으로 돌아가기"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</a>
		<div>
			<h1 class="text-2xl font-bold text-gray-900">새 태그 생성</h1>
			<p class="text-gray-600 mt-1">새로운 태그를 생성하세요.</p>
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
					<h3 class="text-sm font-medium text-red-800">태그 생성에 실패했습니다</h3>
					<p class="text-sm text-red-700 mt-1">{form.error}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- 생성 폼 -->
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
			<!-- 태그 이름 -->
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
					태그 이름 *
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
					placeholder="태그 이름을 입력하세요"
					maxlength="50"
				/>
				<p class="text-sm text-gray-500 mt-1">
					태그 이름은 50자 이내로 입력하세요. 예: JavaScript, React, 개발, 리뷰
				</p>
			</div>
		</div>

		<!-- 버튼 영역 -->
		<div class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
			<div class="flex justify-between">
				<a
					href="/admin/tags"
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
						생성 중...
					{:else}
						<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						생성
					{/if}
				</button>
			</div>
		</div>
	</form>
</div> 