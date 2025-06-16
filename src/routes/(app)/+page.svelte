<script lang="ts">
	import type { PageData } from './$types';
	import { Button, MainReviewCard } from '$lib';
	
	export let data: PageData;

	let featuredReviews = data.featuredReviews
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 날짜 기준 내림차순 정렬
		.slice(0, 3); // 최대 3개만 선택
</script>

<div class="min-h-screen bg-[#F9FAFB]">
	<section class="relative py-32">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-3xl text-center">
				<h1 class="mb-8 text-6xl font-bold tracking-tight text-[#1F2937]">
					Review<span class="text-[#059669]">Deck</span>
				</h1>
				<p class="mb-12 text-xl leading-relaxed text-[#4B5563]">
					당신의 리뷰를 한눈에 관리하고 공유하세요.
					<span class="mt-2 block"
						>평점과 태그별로 정리된 리뷰를 통해 더 나은 의사결정을 도와드립니다.</span
					>
				</p>
				<div class="flex flex-col sm:flex-row justify-center gap-4">
					<Button href="/reviews" variant="primary">
						리뷰 둘러보기
					</Button>
					<Button href="/about" variant="secondary">
						자세히 알아보기
					</Button>
				</div>
			</div>
		</div>
	</section>
	<section class="bg-white py-20">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold text-[#1F2937]">최신 리뷰</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredReviews as review}
					<MainReviewCard {review} />
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
</style>
