<script lang="ts">
  export let tags: string[];
  export let selectedTag: string | null = null;
  
  const tagColors: Record<string, string> = {
    '음악': 'bg-blue-100 text-blue-800',
    '영화': 'bg-purple-100 text-purple-800',
    '도서': 'bg-green-100 text-green-800',
    '게임': 'bg-red-100 text-red-800',
    '드라마': 'bg-yellow-100 text-yellow-800'
  };
  
  function getTagColor(tag: string) {
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  }
  
  function handleTagClick(tag: string | null) {
    selectedTag = tag;
  }
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">태그</label>
  <div class="flex flex-wrap gap-2">
    <button
      class="px-3 py-1 rounded-full text-sm {selectedTag === null ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}"
      on:click={() => handleTagClick(null)}
    >
      전체
    </button>
    {#each tags as tag}
      <button
        class="px-3 py-1 rounded-full text-sm {selectedTag === tag ? 'bg-primary text-white' : getTagColor(tag)}"
        on:click={() => handleTagClick(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
</div>

<style>
  :global(:root) {
    --primary: #059669;
  }
  
  :global(.bg-primary) {
    background-color: var(--primary);
  }
  
  :global(.text-primary) {
    color: var(--primary);
  }
</style> 