<script lang="ts">
	import { onMount } from 'svelte';
	import type { TransitionConfig } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function fadeAndFly(node: HTMLElement, { delay = 0 }): TransitionConfig {
		return {
			delay,
			duration: 800,
			css: (t: number) => `
                opacity: ${t};
                transform: translateY(${20 - t * 20}px);
            `
		};
	}
</script>

<main class="min-h-screen py-16">
	{#if mounted}
		<div class="mx-auto max-w-4xl space-y-16 px-4 sm:px-6 lg:px-8">
			<!-- 헤더 -->
			<header class="text-center" transition:fadeAndFly={{ delay: 0 }}>
				<h1 class="mb-4 text-4xl font-bold text-gray-900">당신만의 특별한 리뷰 공간</h1>
				<p class="text-xl text-gray-700">ReviewDeck과 함께 더 가치있는 리뷰를 만들어보세요</p>
			</header>

			<!-- 소개 문구 -->
			<section transition:fadeAndFly={{ delay: 100 }}>
				<div class="px-8 py-12">
					<blockquote class="mb-8 text-2xl font-semibold italic text-[#059669]">
						"저번에 블로그에서 본 노래 좋다고 했었나?"
					</blockquote>
					<div class="space-y-4 leading-relaxed text-gray-600">
						<p>
							일상을 공유하는 블로그에서 자주 보이는 리뷰, 일기를 보는 것도 물론 좋지만 가끔은 내
							친구의 맛집, 영화, 음악의 리뷰만 모아보고 싶을 때가 있습니다.
						</p>
						<p>
							ReviewDeck은 "헤매지 않고 원하는 리뷰 정보를 바로 습득할 수 있도록 하자" 라는
							아이디어에서 출발했습니다. 사용자에게 더 나은 경험을 선사하기 위해 끊임없이 노력하고
							있습니다.
						</p>
					</div>
				</div>
			</section>

			<!-- 주요 기능 -->
			<section class="grid gap-12" transition:fadeAndFly={{ delay: 200 }}>
				<!-- 리뷰 특화 기능 -->
				<div
					class="rounded-lg bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div class="flex items-start">
						<div class="rounded-full bg-[#059669] p-3">
							<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
						</div>
						<div class="ml-6">
							<h2 class="mb-3 text-2xl font-semibold text-gray-900">평점 기반 리뷰 시스템</h2>
							<p class="mb-4 text-gray-700">
								단순한 글쓰기를 넘어 체계적인 평가가 가능합니다. 평점과 태그를 활용해 당신의 경험을
								더 정확하게 기록하고, 다른 사용자들과 공유해보세요.
							</p>
							<ul class="space-y-2 text-gray-600">
								<li class="flex items-center">
									<svg class="mr-2 h-5 w-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
									별점 기반의 직관적인 평가
								</li>
								<li class="flex items-center">
									<svg class="mr-2 h-5 w-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
									태그 시스템으로 쉬운 분류와 검색
								</li>
								<li class="flex items-center">
									<svg class="mr-2 h-5 w-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
									댓글을 통한 사용자 경험 공유
								</li>
							</ul>
						</div>
					</div>
				</div>

			</section>

			<!-- Contact -->
			<section class="text-center" transition:fadeAndFly={{ delay: 300 }}>
				<h2 class="mb-6 text-2xl font-semibold text-gray-900">Contact Us</h2>
				<div class="inline-flex items-center space-x-8">
					<a
						href="mailto:devdaon500@gmail.com"
						class="flex items-center text-[#059669] transition-colors duration-200 hover:text-[#047857]"
					>
						<svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<span class="text-lg">devdaon500@gmail.com</span>
					</a>
					<a
						href="https://github.com/DoDAON"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center text-[#059669] transition-colors duration-200 hover:text-[#047857]"
					>
						<svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-lg">GitHub</span>
					</a>
				</div>
			</section>
		</div>
	{/if}
</main>
