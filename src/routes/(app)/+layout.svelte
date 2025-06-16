<script lang="ts">
	import '../../app.css';
	import { slide, fade } from 'svelte/transition';
	import { Button } from '$lib';
	import { invalidateAll } from '$app/navigation';

	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
	}

	interface LayoutData {
		user: User | null;
		isAuthenticated: boolean;
	}

	export let data: LayoutData;

	let isMobileMenuOpen = false;
	let showUserMenu = false;
	let isLoggingOut = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	async function handleLogout() {
		isLoggingOut = true;
		
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			if (response.ok) {
				showUserMenu = false;
				await invalidateAll(); // 모든 데이터를 다시 로드
				// 메인 페이지로 리다이렉트
				window.location.href = '/';
			}
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			isLoggingOut = false;
		}
	}

	// 외부 클릭 시 메뉴 닫기
	function handleOutsideClick() {
		if (showUserMenu) {
			showUserMenu = false;
		}
	}

	// 모바일 메뉴가 열려있을 때 스크롤 방지
	$: if (typeof document !== 'undefined') {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}
</script>

<div class="min-h-screen bg-white" on:click={handleOutsideClick} on:keydown={handleOutsideClick} role="presentation">
	{#if isMobileMenuOpen}
		<!-- 배경 오버레이 -->
		<div
			class="fixed inset-0 z-30 bg-black/30"
			on:click={toggleMobileMenu}
			on:keydown={(e) => e.key === 'Escape' && toggleMobileMenu()}
			role="button"
			tabindex="0"
			transition:fade={{ duration: 150 }}
		></div>
	{/if}

	<header class="relative z-40 border-b bg-gray-50">
		<div class="container mx-auto px-4">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<div class="lg:hidden">
						<Button
							variant="ghost"
							size="sm"
							on:click={toggleMobileMenu}
							className="p-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{#if !isMobileMenuOpen}
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								{:else}
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								{/if}
							</svg>
						</Button>
					</div>
					<a href="/" class="ml-2 text-xl font-bold text-gray-900">Review<span class="text-[#059669]">Deck</span></a>
				</div>
				<div class="hidden lg:flex lg:items-center lg:space-x-8">
					<a href="/reviews" class="text-gray-700 hover:text-gray-900">리뷰</a>
					<a href="/about" class="text-gray-700 hover:text-gray-900">About</a>
				</div>
				<div class="relative">
					{#if data.isAuthenticated && data.user}
						<button
							on:click|stopPropagation={toggleUserMenu}
							class="flex items-center text-gray-700 hover:text-gray-900 font-medium"
						>
							안녕하세요, <span class="font-bold">{data.user.name}</span>님
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
								{#if data.user?.role === 'ADMIN'}
									<a
										href="/admin"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										on:click={() => showUserMenu = false}
									>
										관리자 페이지
									</a>
									<a
										href="/profile"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										on:click={() => showUserMenu = false}
									>
										프로필
									</a>
								{:else}
									<a
										href="/profile"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										on:click={() => showUserMenu = false}
									>
										프로필
									</a>
								{/if}
								<button
									on:click={handleLogout}
									disabled={isLoggingOut}
									class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{#if isLoggingOut}
										<span class="flex items-center">
											<svg class="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
												<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											로그아웃 중...
										</span>
									{:else}
										로그아웃
									{/if}
								</button>
							</div>
						{/if}
					{:else}
						<Button href="/login" variant="primary">
							로그인
						</Button>
					{/if}
				</div>
			</div>
		</div>

		{#if isMobileMenuOpen}
			<div
				class="absolute left-0 right-0 top-16 border-b bg-white shadow-lg lg:hidden"
				transition:slide={{ duration: 200 }}
			>
				<nav class="container mx-auto px-4 py-2">
					<a
						href="/reviews"
						class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
						on:click={toggleMobileMenu}
					>
						리뷰
					</a>
					{#if data.user?.role === 'ADMIN'}
						<a
							href="/admin"
							class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
							on:click={toggleMobileMenu}
						>
							관리자 페이지
						</a>
						<a
							href="/profile"
							class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
							on:click={toggleMobileMenu}
						>
							프로필
						</a>
					{:else}
						<a
							href="/profile"
							class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
							on:click={toggleMobileMenu}
						>
							프로필
						</a>
					{/if}
					<a
						href="/about"
						class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
						on:click={toggleMobileMenu}
					>
						About
					</a>
					
					{#if data.isAuthenticated && data.user}
						<div class="border-t pt-2 mt-2">
							<div class="px-4 py-2 text-sm text-gray-500">
								{data.user.name}님
							</div>
							<button
								on:click={() => { handleLogout(); toggleMobileMenu(); }}
								disabled={isLoggingOut}
								class="block w-full text-left rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{#if isLoggingOut}
									<span class="flex items-center">
										<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										로그아웃 중...
									</span>
								{:else}
									로그아웃
								{/if}
							</button>
						</div>
					{:else}
						<div class="border-t pt-2 mt-2">
							<a
								href="/login"
								class="block rounded-lg px-4 py-3 text-primary font-medium transition-colors duration-200 hover:bg-gray-50"
								on:click={toggleMobileMenu}
							>
								로그인
							</a>
						</div>
					{/if}
				</nav>
			</div>
		{/if}
	</header>

	<main class="container relative z-0 mx-auto px-4 py-8">
		<slot />
	</main>

	<footer class="relative z-0 border-t bg-gray-50">
		<div class="container mx-auto px-4 py-6 text-center text-gray-600">
			<p>Copyright © 2024 - All rights reserved by ReviewDeck</p>
		</div>
	</footer>
</div>

<style>
	/* Svelte 트랜지션을 위한 스타일 */
	:global(.fade-enter) {
		opacity: 0;
	}
	:global(.fade-enter-active) {
		opacity: 1;
		transition: opacity 200ms ease-in;
	}
	:global(.fade-exit) {
		opacity: 1;
	}
	:global(.fade-exit-active) {
		opacity: 0;
		transition: opacity 200ms ease-in;
	}
</style>
