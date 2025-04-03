<script lang="ts">
  export let review: {
    id: string;
    title: string;
    rating: number;
    tag: string;
    author: string;
    excerpt: string;
    createdAt: string;
  };
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  
  function getRatingColor(rating: number) {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-green-500';
    if (rating >= 3.5) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-500';
  }
  
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
</script>

<a href="/reviews/{review.id}" class="block">
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[200px]">
    <div class="p-6 h-full flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-xl font-semibold text-gray-900 line-clamp-1 overflow-hidden">{review.title}</h2>
        <span class="text-lg font-bold {getRatingColor(review.rating)}">{review.rating.toFixed(1)}</span>
      </div>
      
      <p class="text-gray-600 mb-4 overflow-hidden relative flex-grow">
        <span class="line-clamp-2 overflow-hidden text-ellipsis">
          {review.excerpt}
        </span>
      </p>
      
      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center">
          <span class="text-sm text-gray-500">{review.author}</span>
          <span class="mx-2 text-gray-300">•</span>
          <span class="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
        </div>
        
        <span class="px-2 py-1 text-xs rounded-full {getTagColor(review.tag)}">
          {review.tag}
        </span>
      </div>
    </div>
  </div>
</a>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style> 