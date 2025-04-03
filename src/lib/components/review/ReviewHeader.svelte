<script lang="ts">
  export let review: {
    title: string;
    rating: number;
    tag: string;
    author: string;
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

<div class="mb-8">
  <div class="flex justify-between items-start mb-4">
    <h1 class="text-3xl font-bold text-gray-900">{review.title}</h1>
    <span class="text-2xl font-bold {getRatingColor(review.rating)}">{review.rating.toFixed(1)}</span>
  </div>
  
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center">
      <span class="text-gray-600">{review.author}</span>
      <span class="mx-2 text-gray-300">•</span>
      <span class="text-gray-500">{formatDate(review.createdAt)}</span>
    </div>
    
    <span class="px-3 py-1 rounded-full text-sm {getTagColor(review.tag)}">
      {review.tag}
    </span>
  </div>
</div> 