<script lang="ts">
  export let searchQuery = '';
</script>

<div>
  <label for="search" class="block text-sm font-medium text-gray-700 mb-1">검색</label>
  <input
    type="text"
    id="search"
    bind:value={searchQuery}
    placeholder="제목, 내용, 작성자로 검색"
    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
  />
</div>

<style>
  :global(:root) {
    --primary: #059669;
  }
  
  :global(.focus\:ring-primary:focus) {
    --tw-ring-color: var(--primary);
  }
  
  :global(.focus\:border-primary:focus) {
    border-color: var(--primary);
  }
</style> 