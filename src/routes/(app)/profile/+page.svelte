<script lang="ts">
	import { Button } from '$lib';

	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
	}

	interface ProfileData {
		user: User | null;
		isAuthenticated: boolean;
	}

	export let data: ProfileData;
	
	// 사용자 ID 표시/숨기기 상태
	let showUserId = false;
	
	function toggleUserId() {
		showUserId = !showUserId;
	}
</script>

<svelte:head>
	<title>프로필 - ReviewDeck</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="bg-white rounded-lg shadow-sm border p-6">
		<div class="flex items-center justify-between mb-6">
			<h1 class="text-2xl font-bold text-gray-900">프로필</h1>
		</div>

		{#if data.isAuthenticated && data.user}
			<div class="space-y-6">
				<!-- 사용자 기본 정보 -->
				<div class="border-b pb-6">
					<h2 class="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
					<div class="grid md:grid-cols-2 gap-4">
						<div>
							<div class="block text-sm font-medium text-gray-700 mb-1">이름</div>
							<div class="p-3 bg-gray-50 rounded-md text-gray-900">
								{data.user.name}
							</div>
						</div>
						<div>
							<div class="block text-sm font-medium text-gray-700 mb-1">이메일</div>
							<div class="p-3 bg-gray-50 rounded-md text-gray-900">
								{data.user.email}
							</div>
						</div>
						<div>
							<div class="block text-sm font-medium text-gray-700 mb-1">사용자 유형</div>
							<div class="p-3 bg-gray-50 rounded-md text-gray-900">
								{data.user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
							</div>
						</div>
						<div>
							<div class="block text-sm font-medium text-gray-700 mb-1">사용자 ID</div>
							<div class="p-3 bg-gray-50 rounded-md text-gray-600 text-sm flex items-center justify-between">
								<span class="font-mono">
									{showUserId ? data.user.id : '••••••••••••••••••••••••••••••••'}
								</span>
								<button
									on:click={toggleUserId}
									class="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
									type="button"
									title={showUserId ? 'ID 숨기기' : 'ID 보기'}
								>
									{#if showUserId}
										<!-- 눈 감은 아이콘 (숨기기) -->
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.9 4.24A9.12 9.12 0 0112 4c7.2 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22m-2-2l-7.02-7.02M5.45 5.11L2 8"></path>
										</svg>
									{:else}
										<!-- 눈 뜬 아이콘 (보기) -->
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
										</svg>
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- 계정 관리 -->
				<div class="border-b pb-6">
					<h2 class="text-lg font-semibold text-gray-900 mb-4">계정 관리</h2>
					<div class="space-y-3">
						<Button variant="secondary" className="w-full sm:w-auto">
							비밀번호 변경
						</Button>
						<Button variant="secondary" className="w-full sm:w-auto">
							프로필 수정
						</Button>
					</div>
				</div>

				<!-- 활동 요약 -->
				<div>
					<h2 class="text-lg font-semibold text-gray-900 mb-4">활동 요약</h2>
					<div class="grid sm:grid-cols-3 gap-4">
						<div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
							<div class="text-emerald-600 text-sm font-medium">작성한 리뷰</div>
							<div class="text-2xl font-bold text-emerald-800">0</div>
						</div>
						<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<div class="text-blue-600 text-sm font-medium">받은 좋아요</div>
							<div class="text-2xl font-bold text-blue-800">0</div>
						</div>
						<div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
							<div class="text-purple-600 text-sm font-medium">가입일</div>
							<div class="text-sm font-medium text-purple-800">최근</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center py-8">
				<div class="text-gray-500 mb-4">로그인이 필요한 페이지입니다.</div>
				<Button href="/login" variant="primary">
					로그인하기
				</Button>
			</div>
		{/if}
	</div>
</div> 