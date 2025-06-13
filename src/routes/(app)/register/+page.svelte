<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import type { ActionData, PageData } from './$types';

    export let form: ActionData;

    let email = '';
    let password = '';
    let confirmPassword = '';
    let nickname = '';
    let isNicknameChecked = false;
    let emailError = '';
    let passwordError = '';
    let nicknameError = '';
    let isSubmitting = false;
    let isCheckingNickname = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 서버에서 전달된 값들로 초기화
    $: if (form?.email) email = form.email;
    $: if (form?.name) nickname = form.name;

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
        if (password.length < 6) {
            passwordError = '비밀번호는 6자 이상이어야 합니다';
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

    async function checkNickname() {
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

        isCheckingNickname = true;
        const formData = new FormData();
        formData.append('name', nickname);

        try {
            const response = await fetch('?/checkNickname', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.type === 'success') {
                isNicknameChecked = true;
                nicknameError = '';
                alert('사용 가능한 닉네임입니다');
            } else if (result.type === 'failure') {
                isNicknameChecked = false;
                nicknameError = result.data?.message || '이미 존재하는 닉네임입니다';
            } else {
                isNicknameChecked = false;
                nicknameError = '닉네임 확인에 실패했습니다';
            }
        } catch (error) {
            isNicknameChecked = false;
            nicknameError = '닉네임 확인 중 오류가 발생했습니다';
        } finally {
            isCheckingNickname = false;
        }
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

        <!-- 서버 에러 메시지 표시 -->
        {#if form?.message}
            <div class="rounded-md bg-red-50 p-4">
                <div class="text-sm text-red-700">{form.message}</div>
            </div>
        {/if}

        <form 
            method="POST" 
            action="?/register"
            class="mt-8 space-y-6" 
            use:enhance={() => {
                isSubmitting = true;
                return async ({ result, update }) => {
                    isSubmitting = false;
                    
                    if (result.type === 'success' && result.data?.success) {
                        // 회원가입 성공 시 alert 표시 후 로그인 페이지로 이동
                        alert(result.data.message || '회원가입이 완료되었습니다!');
                        window.location.href = '/login';
                    } else {
                        // 실패 시 폼 업데이트
                        await update();
                    }
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
                        bind:value={email}
                        on:input={() => clearError('email')}
                        on:blur={validateEmail}
                        required
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
                        name="password"
                        type="password"
                        bind:value={password}
                        on:input={() => clearError('password')}
                        required
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="비밀번호 (6자 이상)"
                    />
                </div>

                <div>
                    <label for="confirm-password" class="block text-sm font-medium text-dark">비밀번호 확인</label>
                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        bind:value={confirmPassword}
                        on:input={() => clearError('password')}
                        on:blur={validatePassword}
                        required
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
                            name="name"
                            type="text"
                            bind:value={nickname}
                            on:input={() => clearError('nickname')}
                            maxlength="8"
                            required
                            class="appearance-none rounded-lg relative block w-2/3 px-3 py-2 border border-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            placeholder="사용할 닉네임 (2-8자)"
                        />
                        <button
                            type="button"
                            on:click={checkNickname}
                            disabled={isCheckingNickname}
                            class="w-1/3 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                            {isCheckingNickname ? '확인중...' : '중복확인'}
                        </button>
                    </div>
                    {#if nicknameError}
                        <p class="mt-1 text-sm text-red-500">{nicknameError}</p>
                    {/if}
                    {#if isNicknameChecked}
                        <p class="mt-1 text-sm text-green-600">사용 가능한 닉네임입니다</p>
                    {/if}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                    {isSubmitting ? '회원가입 중...' : '회원가입'}
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