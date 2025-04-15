<script lang="ts">
  import { SearchBar, TagFilter, SortSelect } from '$lib';
  
  export let tags: string[];
  export let selectedTag: string | null = null;
  export let searchQuery = '';
  export let sortBy = 'newest';
</script>

<div class="bg-white rounded-lg shadow-md p-6 mb-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- 검색 -->
    <SearchBar bind:searchQuery />
    
    <!-- 태그 필터 -->
    <TagFilter {tags} bind:selectedTag />
    
    <!-- 정렬 -->
    <SortSelect bind:sortBy />
  </div>
</div> 