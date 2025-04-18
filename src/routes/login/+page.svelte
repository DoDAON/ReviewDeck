<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let email = '';
    let password = '';
    let rememberMe = false;
    let emailError = '';
    let passwordError = '';

    function validateForm() {
        let isValid = true;
        
        // 이메일 검증
        if (!email) {
            emailError = '이메일을 입력해주세요';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError = '올바른 이메일 형식이 아닙니다';
            isValid = false;
        } else {
            emailError = '';
        }

        // 비밀번호 검증
        if (!password) {
            passwordError = '비밀번호를 입력해주세요';
            isValid = false;
        } else {
            passwordError = '';
        }

        return isValid;
    }

    function handleLogin(e: Event) {
        e.preventDefault();
        if (validateForm()) {
            // TODO: 실제 로그인 로직 구현
            console.log('Login attempt:', { email, password, rememberMe });
            alert('로그인 시도');
            goto('/');
        }
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    }

    // 입력 시 에러 메시지 초기화
    function clearError(field: 'email' | 'password') {
        if (field === 'email') emailError = '';
        if (field === 'password') passwordError = '';
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
        <form class="mt-8 space-y-6" on:submit={handleLogin} novalidate>
            <div class="rounded-md shadow-sm space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-dark">이메일</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        on:keypress={handleKeyPress}
                        on:input={() => clearError('email')}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="이메일 주소"
                    />
                    {#if emailError}
                        <p class="mt-1 text-sm text-red-500">{emailError}</p>
                    {/if}
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-dark">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        on:keypress={handleKeyPress}
                        on:input={() => clearError('password')}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="비밀번호"
                    />
                    {#if passwordError}
                        <p class="mt-1 text-sm text-red-500">{passwordError}</p>
                    {/if}
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        bind:checked={rememberMe}
                        class="h-4 w-4 text-primary focus:ring-primary border-light rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-dark">
                        아이디 저장
                    </label>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    로그인
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