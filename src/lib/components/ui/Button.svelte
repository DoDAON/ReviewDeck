<script lang="ts">
  export let href: string = '/';
  export let variant: 'primary' | 'secondary' = 'primary';
  export let showArrow: boolean = false;
</script>

<a
  {href}
  class="inline-flex transform items-center rounded-lg px-8 py-4 text-lg font-medium
    shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl
    focus:outline-none focus:ring-2 focus:ring-offset-2
    {variant === 'primary' 
      ? 'bg-[#059669] text-white hover:bg-[#047857] focus:ring-[#34D399]' 
      : 'bg-[#E5E7EB] text-[#4B5563] hover:bg-[#9CA3AF] hover:text-white focus:ring-[#9CA3AF]'}"
>
  <slot />
  {#if showArrow}
    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  {/if}
</a> 