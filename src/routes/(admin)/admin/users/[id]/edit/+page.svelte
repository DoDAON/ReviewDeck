<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;
	let formName = data.user.name;
	let formPassword = '';
	let formRole = data.user.role;

	// 폼 데이터가 원본과 동일한지 확인
	$: isUnchanged = formName === data.user.name && 
					 formPassword === '' && 
					 formRole === data.user.role;

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
</script>

<svelte:head>
	<title>유저 수정 - ReviewDeck</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex items-center space-x-4">
    <a
				href="/admin/users"
				class="text-gray-500 hover:text-gray-700 transition-colors"
				aria-label="유저 목록으로 돌아가기"
		>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
		</a>
		<div>
			<h1 class="text-2xl font-bold text-gray-900">유저 수정</h1>
			<p class="text-gray-600 mt-1">유저 정보를 수정할 수 있습니다.</p>
		</div>
	</div>

	<!-- 에러 메시지 -->
	{#if form?.error}
		<div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
			<div class="flex">
				<svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
				</svg>
				{form.error}
			</div>
		</div>
	{/if}

	<!-- 유저 정보 -->
	<div class="bg-white rounded-lg shadow-sm border p-6">
		<div class="mb-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
			<div class="grid grid-cols-1 gap-4 text-sm">
				<div>
					<span class="text-gray-500">UID:</span>
					<span class="ml-2 font-mono text-gray-900">{data.user.id}</span>
				</div>
				<div>
					<span class="text-gray-500">생성일:</span>
					<span class="ml-2 text-gray-900">{formatDate(data.user.createdAt)}</span>
				</div>
				<div>
					<span class="text-gray-500">수정일:</span>
					<span class="ml-2 text-gray-900">{formatDate(data.user.updatedAt)}</span>
				</div>
			</div>
		</div>

		<!-- 수정 폼 -->
		<form
			method="POST"
			action="?/update"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<div class="space-y-6">
				<!-- 이름 -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
						이름 <span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						bind:value={formName}
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						placeholder="유저 이름을 입력하세요"
					/>
				</div>

				<!-- 이메일 (읽기 전용) -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						이메일 (아이디)
					</label>
					<div class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
						{data.user.email}
					</div>
				</div>

				<!-- 비밀번호 -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
						비밀번호
					</label>
					<input
						type="password"
						id="password"
						name="password"
						bind:value={formPassword}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						placeholder="새 비밀번호를 입력하세요 (공백 시 기존 비밀번호 유지)"
					/>
					<p class="text-sm text-gray-500 mt-1">
						비밀번호를 변경하지 않으려면 공백으로 두세요.
					</p>
				</div>

				<!-- 역할 -->
				<div>
					<label for="role" class="block text-sm font-medium text-gray-700 mb-2">
						역할 <span class="text-red-500">*</span>
					</label>
					<select
						id="role"
						name="role"
						bind:value={formRole}
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
					>
						<option value="USER">USER</option>
						<option value="ADMIN">ADMIN</option>
					</select>
				</div>

				<!-- 버튼 -->
				<div class="flex gap-4 pt-6">
					<button
						type="submit"
						disabled={loading || isUnchanged}
						class="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if loading}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							수정 중...
						{:else if isUnchanged}
							변경사항 없음
						{:else}
							수정하기
						{/if}
					</button>
					<button
						type="button"
						on:click={() => goto('/admin/users')}
						class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
					>
						취소
					</button>
				</div>
			</div>
		</form>
	</div>
</div> 