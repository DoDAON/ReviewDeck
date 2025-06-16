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