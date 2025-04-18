<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let email = '';
    let password = '';
    let confirmPassword = '';
    let nickname = '';
    let isNicknameChecked = false;
    let emailError = '';
    let passwordError = '';
    let nicknameError = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateEmail() {
        if (!email) {
            emailError = '이메일을 입력해주세요';
            return false;
        }
        if (!emailRegex.test(email)) {
            emailError = '올바른 이메일 형식이 아닙니다';
            return false;
        }
        emailError = '';
        return true;
    }

    function validatePassword() {
        if (!password) {
            passwordError = '비밀번호를 입력해주세요';
            return false;
        }
        if (!confirmPassword) {
            passwordError = '비밀번호 확인을 입력해주세요';
            return false;
        }
        if (password !== confirmPassword) {
            passwordError = '비밀번호가 일치하지 않습니다';
            return false;
        }
        passwordError = '';
        return true;
    }

    function checkNickname() {
        if (!nickname) {
            nicknameError = '닉네임을 입력해주세요';
            return;
        }
        if (nickname.length < 2) {
            nicknameError = '닉네임은 2자 이상이어야 합니다';
            isNicknameChecked = false;
            return;
        }
        if (nickname.length > 8) {
            nicknameError = '닉네임은 8자를 초과할 수 없습니다';
            isNicknameChecked = false;
            return;
        }
        // TODO: 실제 닉네임 중복 체크 로직 구현
        isNicknameChecked = true;
        nicknameError = '';
        alert('사용 가능한 닉네임입니다');
    }

    function validateForm() {
        let isValid = true;

        if (!validateEmail()) isValid = false;
        if (!validatePassword()) isValid = false;
        
        if (!nickname) {
            nicknameError = '닉네임을 입력해주세요';
            isValid = false;
        } else if (!isNicknameChecked) {
            nicknameError = '닉네임 중복 확인이 필요합니다';
            isValid = false;
        }

        return isValid;
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (validateForm()) {
            // TODO: 실제 회원가입 로직 구현
            alert('회원가입이 완료되었습니다!');
            goto('/');
        }
    }

    // 입력 시 에러 메시지 초기화
    function clearError(field: 'email' | 'password' | 'nickname') {
        if (field === 'email') emailError = '';
        if (field === 'password') passwordError = '';
        if (field === 'nickname') {
            nicknameError = '';
            isNicknameChecked = false;
        }
    }

    onMount(() => {
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
                ReviewDeck 회원가입
            </h2>
        </div>
        <form class="mt-8 space-y-6" on:submit={handleSubmit} novalidate>
            <div class="rounded-md shadow-sm space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-dark">이메일</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        on:input={() => clearError('email')}
                        on:blur={validateEmail}
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
                        on:input={() => clearError('password')}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="비밀번호"
                    />
                </div>

                <div>
                    <label for="confirm-password" class="block text-sm font-medium text-dark">비밀번호 확인</label>
                    <input
                        id="confirm-password"
                        type="password"
                        bind:value={confirmPassword}
                        on:input={() => clearError('password')}
                        on:blur={validatePassword}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="비밀번호 확인"
                    />
                    {#if passwordError}
                        <p class="mt-1 text-sm text-red-500">{passwordError}</p>
                    {/if}
                </div>

                <div>
                    <label for="nickname" class="block text-sm font-medium text-dark">닉네임</label>
                    <div class="flex space-x-3">
                        <input
                            id="nickname"
                            type="text"
                            bind:value={nickname}
                            on:input={() => clearError('nickname')}
                            maxlength="8"
                            class="appearance-none rounded-lg relative block w-2/3 px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            placeholder="사용할 닉네임 (2-8자)"
                        />
                        <button
                            type="button"
                            on:click={checkNickname}
                            class="w-1/3 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            중복확인
                        </button>
                    </div>
                    {#if nicknameError}
                        <p class="mt-1 text-sm text-red-500">{nicknameError}</p>
                    {/if}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    회원가입
                </button>
            </div>
        </form>

        <div class="text-center">
            <p class="text-sm text-dark">
                이미 계정이 있으신가요?{' '}
                <a
                    href="/login"
                    class="font-medium text-primary hover:text-primary-dark"
                >
                    로그인
                </a>
            </p>
        </div>
    </div>
</div> 