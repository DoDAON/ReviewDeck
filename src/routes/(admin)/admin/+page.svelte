<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
	}

	interface AdminData {
		user: User | null;
		isAuthenticated: boolean;
	}

	// 서버에서 로드한 통계 데이터
	const { stats } = data;
</script>

<svelte:head>
	<title>관리자 대시보드 - ReviewDeck</title>
</svelte:head>

<div class="space-y-6">
	<!-- 헤더 -->
	<div>
		<h1 class="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
		<p class="text-gray-600 mt-1">ReviewDeck 시스템을 관리하고 모니터링하세요.</p>
	</div>

	<!-- 통계 카드 -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="bg-white p-6 rounded-lg shadow-sm border">
			<div class="flex items-center">
				<div class="p-2 bg-emerald-100 rounded-lg">
					<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
				</div>
				<div class="ml-4">
					<h3 class="text-lg font-semibold text-gray-900">총 게시물</h3>
					<p class="text-2xl font-bold text-emerald-600">{stats.totalPosts.toLocaleString()}</p>
				</div>
			</div>
		</div>

		<div class="bg-white p-6 rounded-lg shadow-sm border">
			<div class="flex items-center">
				<div class="p-2 bg-purple-100 rounded-lg">
					<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
					</svg>
				</div>
				<div class="ml-4">
					<h3 class="text-lg font-semibold text-gray-900">총 태그</h3>
					<p class="text-2xl font-bold text-purple-600">{stats.totalTags.toLocaleString()}</p>
				</div>
			</div>
		</div>

		<div class="bg-white p-6 rounded-lg shadow-sm border">
			<div class="flex items-center">
				<div class="p-2 bg-blue-100 rounded-lg">
					<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
					</svg>
				</div>
				<div class="ml-4">
					<h3 class="text-lg font-semibold text-gray-900">총 유저</h3>
					<p class="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- 최근 활동 -->
		<div class="bg-white p-6 rounded-lg shadow-sm border">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">최근 활동</h2>
			<div class="space-y-4">
				<div class="flex items-center p-3 bg-gray-50 rounded-lg">
					<div class="p-2 bg-green-100 rounded-full mr-3">
						<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-900">새로운 게시물 작성</p>
						<p class="text-xs text-gray-500">"JavaScript 팁" 게시물이 작성되었습니다 • 5분 전</p>
					</div>
				</div>

				<div class="flex items-center p-3 bg-gray-50 rounded-lg">
					<div class="p-2 bg-purple-100 rounded-full mr-3">
						<svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
						</svg>
					</div>
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-900">새로운 태그 생성</p>
						<p class="text-xs text-gray-500">"React" 태그가 추가되었습니다 • 12분 전</p>
					</div>
				</div>

				<div class="flex items-center p-3 bg-gray-50 rounded-lg">
					<div class="p-2 bg-blue-100 rounded-full mr-3">
						<svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
						</svg>
					</div>
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-900">새로운 유저 가입</p>
						<p class="text-xs text-gray-500">김철수님이 가입했습니다 • 1시간 전</p>
					</div>
				</div>
			</div>
		</div>

		<!-- 시스템 상태 -->
		<div class="bg-white p-6 rounded-lg shadow-sm border">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">시스템 상태</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
						<span class="text-sm font-medium text-gray-900">데이터베이스</span>
					</div>
					<span class="text-sm text-green-600 font-medium">정상</span>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
						<span class="text-sm font-medium text-gray-900">API 서버</span>
					</div>
					<span class="text-sm text-green-600 font-medium">정상</span>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
						<span class="text-sm font-medium text-gray-900">이메일 서비스</span>
					</div>
					<span class="text-sm text-yellow-600 font-medium">지연</span>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
						<span class="text-sm font-medium text-gray-900">파일 스토리지</span>
					</div>
					<span class="text-sm text-green-600 font-medium">정상</span>
				</div>
			</div>

			<div class="mt-6 p-4 bg-gray-50 rounded-lg">
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm font-medium text-gray-700">서버 가동시간</span>
					<span class="text-sm text-gray-900">99.9%</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-2">
					<div class="bg-green-500 h-2 rounded-full" style="width: 99.9%"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- 빠른 작업 -->
	<div class="bg-white p-6 rounded-lg shadow-sm border">
		<h2 class="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<a 
				href="/admin/posts" 
				class="flex flex-col items-center p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
			>
				<svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<span class="text-sm font-medium text-gray-700">게시물 관리</span>
			</a>

			<a 
				href="/admin/tags" 
				class="flex flex-col items-center p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
			>
				<svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
				</svg>
				<span class="text-sm font-medium text-gray-700">태그 관리</span>
			</a>

			<a 
				href="/admin/users" 
				class="flex flex-col items-center p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
			>
				<svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
				</svg>
				<span class="text-sm font-medium text-gray-700">유저 관리</span>
			</a>
		</div>
	</div>
</div> 