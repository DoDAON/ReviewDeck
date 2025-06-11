<script lang="ts">
	import '../../app.css';
	import { slide, fade } from 'svelte/transition';
	import { Button } from '$lib';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
	}

	interface AdminLayoutData {
		user: User | null;
		isAuthenticated: boolean;
	}

	export let data: AdminLayoutData;

	let isSidebarOpen = true;
	let showUserMenu = false;

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	async function handleLogout() {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			if (response.ok) {
				showUserMenu = false;
				await invalidateAll();
			}
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	// 관리자 권한 확인
	$: isAdmin = data.user?.role === 'admin';

	// 현재 경로에 따른 활성 메뉴 확인
	$: currentPath = $page.url.pathname;

	// 외부 클릭 시 메뉴 닫기
	function handleOutsideClick() {
		if (showUserMenu) {
			showUserMenu = false;
		}
	}
</script>

{#if !isAdmin}
	<!-- 관리자가 아닌 경우 접근 거부 -->
	<div class="min-h-screen bg-gray-100 flex items-center justify-center">
		<div class="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
			<div class="text-red-500 text-6xl mb-4">⚠️</div>
			<h1 class="text-2xl font-bold text-gray-900 mb-4">접근 권한이 없습니다</h1>
			<p class="text-gray-600 mb-6">이 페이지는 관리자만 접근할 수 있습니다.</p>
			<Button href="/" variant="primary">홈으로 돌아가기</Button>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-100" on:click={handleOutsideClick} on:keydown={handleOutsideClick} role="presentation">
		<!-- 사이드바 -->
		<div class="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0">
			<div class="flex items-center justify-between h-16 px-4 bg-gray-800">
				<a href="/admin" class="text-xl font-bold">
					Review<span class="text-emerald-400">Deck</span> Admin
				</a>
				<button 
					on:click={toggleSidebar}
					class="lg:hidden p-2 rounded-md hover:bg-gray-700"
					aria-label="사이드바 닫기"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<nav class="mt-8 px-4">
				<ul class="space-y-2">
					<li>
						<a 
							href="/admin" 
							class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors {currentPath === '/admin' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-700'}"
						>
							<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v6l3-3 3 3V5" />
							</svg>
							대시보드
						</a>
					</li>
					<li>
						<a 
							href="/admin/posts" 
							class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors {currentPath.startsWith('/admin/posts') ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-700'}"
						>
							<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							게시물 관리
						</a>
					</li>
					<li>
						<a 
							href="/admin/tags" 
							class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors {currentPath.startsWith('/admin/tags') ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-700'}"
						>
							<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
							태그 관리
						</a>
					</li>
					<li>
						<a 
							href="/admin/users" 
							class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors {currentPath.startsWith('/admin/users') ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-700'}"
						>
							<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
							</svg>
							유저 관리
						</a>
					</li>
				</ul>
			</nav>

			<!-- 사이드바 하단 -->
			<div class="absolute bottom-0 left-0 right-0 p-4">
				<a 
					href="/" 
					class="flex items-center px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
				>
					<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					사용자 사이트로
				</a>
			</div>
		</div>

		<!-- 메인 콘텐츠 영역 -->
		<div class="lg:ml-64">
			<!-- 상단 헤더 -->
			<header class="bg-white shadow-sm border-b">
				<div class="flex items-center justify-between h-16 px-6">
					<div class="flex items-center">
						<button 
							on:click={toggleSidebar}
							class="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
							aria-label="사이드바 열기"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
						<h1 class="text-lg font-semibold text-gray-900">관리자 패널</h1>
					</div>

					<div class="relative">
						<button
							on:click|stopPropagation={toggleUserMenu}
							class="flex items-center text-gray-700 hover:text-gray-900 font-medium"
						>
							관리자 <span class="font-bold ml-1">{data.user?.name}</span>님
							<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
							</svg>
						</button>
						
						{#if showUserMenu}
							<div
								class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
								on:click|stopPropagation
								on:keydown|stopPropagation
								role="menu"
								tabindex="-1"
								transition:slide={{ duration: 150 }}
							>
								<a
									href="/profile"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									on:click={() => showUserMenu = false}
								>
									프로필
								</a>
								<button
									on:click={handleLogout}
									class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									로그아웃
								</button>
							</div>
						{/if}
					</div>
				</div>
			</header>

			<!-- 페이지 콘텐츠 -->
			<main class="p-6">
				<slot />
			</main>
		</div>

		<!-- 모바일에서 사이드바가 열려있을 때 배경 오버레이 -->
		{#if isSidebarOpen}
			<div
				class="fixed inset-0 z-30 bg-black/30 lg:hidden"
				on:click={toggleSidebar}
				on:keydown={(e) => e.key === 'Escape' && toggleSidebar()}
				role="button"
				tabindex="0"
				transition:fade={{ duration: 150 }}
			></div>
		{/if}
	</div>
{/if} 