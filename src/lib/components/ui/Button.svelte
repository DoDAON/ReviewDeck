<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let href: string | undefined = undefined;
  export let disabled = false;
  export let type: 'button' | 'submit' = 'button';
  export let className = '';

  const variantClasses = {
    primary: 'bg-[#059669] text-white hover:bg-[#047857]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
</script>

{#if href}
  <a
    href={href}
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors {variantClasses[variant]} {sizeClasses[size]} {className} {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors {variantClasses[variant]} {sizeClasses[size]} {className}"
    {disabled}
    on:click
  >
    <slot />
  </button>
{/if} 