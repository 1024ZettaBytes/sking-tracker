<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let searchQuery = $state('');
  
  let filteredBooks = $derived(
    data.books.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <title>Stephen King Collection</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-zinc-100">
  <!-- Header -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">
            Stephen King
            <span class="text-zinc-500 font-normal text-lg ml-2">Collection</span>
          </h1>
        </div>
        
        <!-- Search Bar -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Search books..."
            bind:value={searchQuery}
            class="w-full sm:w-64 pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          />
        </div>
      </div>
    </div>
  </header>

  <!-- Stats Bar -->
  <div class="border-b border-zinc-800/50 bg-zinc-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex items-center gap-6 text-sm">
        <div class="flex items-center gap-2">
          <span class="text-zinc-500">Total:</span>
          <span class="text-white font-semibold">{data.books.length} books</span>
        </div>
        {#if searchQuery}
          <div class="flex items-center gap-2">
            <span class="text-zinc-500">Showing:</span>
            <span class="text-amber-500 font-semibold">{filteredBooks.length} results</span>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Books Grid -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if filteredBooks.length === 0}
      <div class="text-center py-20">
        <svg class="w-16 h-16 text-zinc-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v11.494m-9-5.747h18"/>
        </svg>
        <p class="text-zinc-500">No books found for "{searchQuery}"</p>
      </div>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {#each filteredBooks as book}
          <article class="group cursor-pointer">
            <!-- Book Cover -->
            <div class="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-800 transition-all duration-300 group-hover:ring-amber-500/50 group-hover:shadow-lg group-hover:shadow-amber-500/10 group-hover:-translate-y-1">
              {#if book.coverUrl}
                <img 
                  src={book.coverUrl} 
                  alt={book.title} 
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              {:else}
                <div class="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-4">
                  <svg class="w-10 h-10 text-zinc-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  <span class="text-zinc-600 text-xs">No Cover</span>
                </div>
              {/if}
              
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
                {#if book.synopsis}
                  <p class="text-xs text-zinc-300 line-clamp-4 leading-relaxed">
                    {book.synopsis}
                  </p>
                {/if}
              </div>
            </div>
            
            <!-- Book Info -->
            <div class="mt-3 px-1">
              <h2 class="text-sm font-medium text-zinc-200 group-hover:text-amber-400 transition-colors duration-200 line-clamp-2 leading-snug">
                {book.title}
              </h2>
              <p class="text-xs text-zinc-500 mt-1 font-medium">{book.year}</p>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </main>
  
  <!-- Footer -->
  <footer class="border-t border-zinc-800/50 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p class="text-zinc-600 text-sm text-center">
        Stephen King Book Tracker · {data.books.length} books catalogued
      </p>
    </div>
  </footer>
</div>
