<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let featuredReviews = data.featuredReviews.sort((a, b) => parseInt(b.id) - parseInt(a.id)); // id 내림차순 정렬
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
	<!-- Hero Section -->
	<section class="relative py-32">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-3xl text-center">
				<h1 class="mb-8 text-6xl font-bold tracking-tight text-gray-900">
					Review<span class="text-blue-600">Deck</span>
				</h1>
				<p class="mb-12 text-xl leading-relaxed text-gray-600">
					당신의 리뷰를 한눈에 관리하고 공유하세요.
					<span class="mt-2 block"
						>평점과 카테고리별로 정리된 리뷰를 통해 더 나은 의사결정을 도와드립니다.</span
					>
				</p>
				<a
					href="/reviews"
					class="inline-flex transform items-center rounded-full bg-blue-600 px-8 py-4 text-lg font-medium
                  text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700
                  hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					리뷰 둘러보기
					<svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Latest Reviews -->
	<section class="bg-white py-20">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold text-gray-900">최신 리뷰</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredReviews as review}
					<a
						href="/reviews/{review.id}"
						class="group block transform transition-all duration-200 hover:scale-105"
					>
						<div
							class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg
                        transition-shadow duration-200 hover:shadow-xl"
						>
							<div class="p-6">
								<div class="mb-4 flex items-center justify-between">
									<span class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
										{review.category}
									</span>
									<div class="flex items-center gap-1">
										<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
											<path
												d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
											/>
										</svg>
										<span class="font-medium text-gray-900">{review.rating}</span>
									</div>
								</div>
								<h3
									class="mb-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600"
								>
									{review.title}
								</h3>
								<p class="mb-4 line-clamp-2 text-gray-600">{review.excerpt}</p>
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-500">작성자: {review.author}</span>
									<span
										class="transform text-blue-600 transition-transform duration-200 group-hover:translate-x-2"
									>
										자세히 보기 →
									</span>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
