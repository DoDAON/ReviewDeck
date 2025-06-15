<script lang="ts">
	import { Button } from '$lib';
	import { fade, scale } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';

	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
	}

	interface Comment {
		id: string;
		content: string;
		createdAt: string;
		review: {
			id: string;
			title: string;
		};
	}

	interface Like {
		id: string;
		createdAt: string;
		review: {
			id: string;
			title: string;
			content: string;
		};
	}

	interface ProfileData {
		user: User | null;
		isAuthenticated: boolean;
		userComments: Comment[];
		userLikes: Like[];
	}

	export let data: ProfileData;
	
	// 사용자 ID 표시/숨기기 상태
	let showUserId = false;
	
	// 모달 상태
	let showCommentsModal = false;
	let showLikesModal = false;

	// 포털 컨테이너
	let modalContainer: HTMLElement;
	
	onMount(() => {
		// body에 모달 컨테이너 생성
		modalContainer = document.createElement('div');
		modalContainer.id = 'modal-portal';
		document.body.appendChild(modalContainer);

		return () => {
			// 컴포넌트 언마운트 시 컨테이너 제거
			if (modalContainer && modalContainer.parentNode) {
				modalContainer.parentNode.removeChild(modalContainer);
			}
		};
	});
	
	function toggleUserId() {
		showUserId = !showUserId;
	}

	function openCommentsModal() {
		showCommentsModal = true;
	}

	function openLikesModal() {
		showLikesModal = true;
	}

	function closeModal() {
		showCommentsModal = false;
		showLikesModal = false;
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function truncateContent(content: string, maxLength: number = 10) {
		return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
	}

	// 포털 액션 함수
	function appendToPortal(element: HTMLElement, container: HTMLElement) {
		container.appendChild(element);
		return {
			destroy() {
				if (element.parentNode) {
					element.parentNode.removeChild(element);
				}
			}
		};
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
					<div class="grid sm:grid-cols-2 gap-4">
						<button
							on:click={openCommentsModal}
							class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 hover:bg-emerald-100 transition-colors cursor-pointer text-left"
						>
							<div class="text-emerald-600 text-sm font-medium">작성한 댓글</div>
							<div class="text-2xl font-bold text-emerald-800">{data.userComments.length}</div>
						</button>
						<button
							on:click={openLikesModal}
							class="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer text-left"
						>
							<div class="text-blue-600 text-sm font-medium">좋아요 누른 게시물</div>
							<div class="text-2xl font-bold text-blue-800">{data.userLikes.length}</div>
						</button>
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

<!-- 모달들을 body에 포털로 렌더링 -->
{#if modalContainer}
	<!-- 댓글 모달 -->
	{#if showCommentsModal}
		<svelte:element this={'div'} use:appendToPortal={modalContainer}>
			<div 
				class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[99999]"
				transition:fade={{ duration: 300 }}
				on:click={closeModal}
				on:keydown={(e) => e.key === 'Escape' && closeModal()}
				role="button"
				tabindex="0"
			>
				<div 
					class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
					transition:scale={{ duration: 300, start: 0.95 }}
					on:click|stopPropagation
					on:keydown|stopPropagation
					role="dialog"
					tabindex="-1"
				>
					<div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold text-gray-900">작성한 댓글 ({data.userComments.length}개)</h3>
						<button
							on:click={closeModal}
							class="text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="모달 닫기"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="p-6">
						{#if data.userComments.length > 0}
							<div class="space-y-4">
								{#each data.userComments as comment}
									<div class="border border-gray-200 rounded-lg p-4">
										<div class="mb-3">
											<h4 class="font-medium text-gray-900 mb-1">게시물: {comment.review.title}</h4>
											<p class="text-sm text-gray-600">{formatDate(comment.createdAt)}</p>
										</div>
										<div class="mb-3">
											<p class="text-gray-700">{comment.content}</p>
										</div>
										<div class="flex justify-end">
											<Button href="/reviews/{comment.review.id}" variant="primary" className="text-sm">
												본문으로 가기
											</Button>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="text-center py-8">
								<p class="text-gray-500">작성한 댓글이 없습니다.</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</svelte:element>
	{/if}

	<!-- 좋아요 모달 -->
	{#if showLikesModal}
		<svelte:element this={'div'} use:appendToPortal={modalContainer}>
			<div 
				class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[99999]"
				transition:fade={{ duration: 300 }}
				on:click={closeModal}
				on:keydown={(e) => e.key === 'Escape' && closeModal()}
				role="button"
				tabindex="0"
			>
				<div 
					class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
					transition:scale={{ duration: 300, start: 0.95 }}
					on:click|stopPropagation
					on:keydown|stopPropagation
					role="dialog"
					tabindex="-1"
				>
					<div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold text-gray-900">좋아요 누른 게시물 ({data.userLikes.length}개)</h3>
						<button
							on:click={closeModal}
							class="text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="모달 닫기"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="p-6">
						{#if data.userLikes.length > 0}
							<div class="space-y-4">
								{#each data.userLikes as like}
									<div class="border border-gray-200 rounded-lg p-4">
										<div class="mb-3">
											<h4 class="font-medium text-gray-900 mb-1">{like.review.title}</h4>
											<p class="text-sm text-gray-600">좋아요 날짜: {formatDate(like.createdAt)}</p>
										</div>
										<div class="mb-3">
											<p class="text-gray-700">{truncateContent(like.review.content, 25)}</p>
										</div>
										<div class="flex justify-end">
											<Button href="/reviews/{like.review.id}" variant="primary" className="text-sm">
												본문으로 가기
											</Button>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="text-center py-8">
								<p class="text-gray-500">좋아요 누른 게시물이 없습니다.</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</svelte:element>
	{/if}
{/if} 