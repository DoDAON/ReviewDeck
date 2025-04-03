<script lang="ts">
  export let sortBy = 'newest';
</script>

<div>
  <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">정렬</label>
  <select
    id="sort"
    bind:value={sortBy}
    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
  >
    <option value="newest">최신순</option>
    <option value="rating">평점순</option>
    <option value="title">제목순</option>
  </select>
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