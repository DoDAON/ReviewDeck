<script lang="ts">
	import '../app.css';
	import { slide, fade } from 'svelte/transition';

	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
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

<div class="min-h-screen bg-white">
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
						<button
							type="button"
							class="btn-ghost rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
							aria-label="메인 메뉴"
							on:click={toggleMobileMenu}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</button>
					</div>
					<a href="/" class="ml-2 text-xl font-bold text-gray-900">Review<span class="text-[#059669]">Deck</span></a>
				</div>
				<div class="hidden lg:flex lg:items-center lg:space-x-8">
					<a href="/reviews" class="text-gray-700 hover:text-gray-900">리뷰</a>
					<a href="/about" class="text-gray-700 hover:text-gray-900">About</a>
				</div>
				<div>
					<a href="/login" class="btn btn-primary bg-[#059669]">로그인</a>
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
					<a
						href="/dashboard"
						class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
						on:click={toggleMobileMenu}
					>
						대시보드
					</a>
					<a
						href="/about"
						class="block rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
						on:click={toggleMobileMenu}
					>
						About
					</a>
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
