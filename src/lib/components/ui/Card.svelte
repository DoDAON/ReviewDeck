<script lang="ts">
  export let className = '';
  export let padding = 'p-6';
</script>

<div class="bg-white rounded-lg shadow-md {padding} {className}">
  <slot />
</div> 