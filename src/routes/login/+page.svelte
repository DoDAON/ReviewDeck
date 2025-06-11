<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    let isLoading = false;

    // 입력 시 에러 메시지 초기화
    function clearError(field: 'email' | 'password') {
        if (form) {
            if (field === 'email') form.emailError = '';
            if (field === 'password') form.passwordError = '';
        }
    }

    onMount(() => {
        // 페이지 로드 시 이메일 입력창에 포커스
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.focus();
        }
    });
</script>

<div class="min-h-screen flex items-center justify-center bg-lightest">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-darkest">
                ReviewDeck 로그인
            </h2>
        </div>
        <form 
            class="mt-8 space-y-6" 
            method="POST" 
            action="?/login"
            use:enhance={() => {
                isLoading = true;
                return async ({ result, update }) => {
                    isLoading = false;
                    await update();
                };
            }}
            novalidate
        >
            <div class="rounded-md shadow-sm space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-dark">이메일</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form?.email ?? ''}
                        on:input={() => clearError('email')}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="이메일 주소"
                    />
                    {#if form?.emailError}
                        <p class="mt-1 text-sm text-red-500">{form.emailError}</p>
                    {/if}
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-dark">비밀번호</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        on:input={() => clearError('password')}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="비밀번호"
                    />
                    {#if form?.passwordError}
                        <p class="mt-1 text-sm text-red-500">{form.passwordError}</p>
                    {/if}
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        id="remember-me"
                        name="rememberMe"
                        type="checkbox"
                        class="h-4 w-4 text-primary focus:ring-primary border-light rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-dark">
                        아이디 저장
                    </label>
                </div>
            </div>

            {#if form && 'loginError' in form}
                <div class="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
                    {form.loginError}
                </div>
            {/if}

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if isLoading}
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        로그인 중...
                    {:else}
                        로그인
                    {/if}
                </button>
            </div>
        </form>

        <div class="text-center">
            <p class="text-sm text-dark">
                새로 등록하시겠습니까?{' '}
                <a
                    href="/register"
                    class="font-medium text-primary hover:text-primary-dark"
                >
                    회원가입
                </a>
            </p>
        </div>
    </div>
</div> 