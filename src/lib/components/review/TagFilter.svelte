<script lang="ts">
  export let tags: string[];
  export let selectedTag: string | null = null;
  
  // 사용 가능한 색상 조합들
  const colorClasses = [
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-teal-100 text-teal-800',
    'bg-orange-100 text-orange-800',
    'bg-cyan-100 text-cyan-800',
    'bg-emerald-100 text-emerald-800',
    'bg-violet-100 text-violet-800',
    'bg-fuchsia-100 text-fuchsia-800',
    'bg-rose-100 text-rose-800',
    'bg-sky-100 text-sky-800',
    'bg-lime-100 text-lime-800'
  ];
  
  // 문자열을 해시값으로 변환하는 함수
  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit 정수로 변환
    }
    return Math.abs(hash);
  }
  
  function getTagColor(tag: string) {
    const hash = hashString(tag);
    const colorIndex = hash % colorClasses.length;
    return colorClasses[colorIndex];
  }
  
  function handleTagClick(tag: string | null) {
    selectedTag = tag;
  }
</script>

<div>
  <label for="tag-filter" class="block text-sm font-medium text-gray-700 mb-1">태그</label>
  <div class="flex flex-wrap gap-2">
    <button
      id="tag-filter"
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