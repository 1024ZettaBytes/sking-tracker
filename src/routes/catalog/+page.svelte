<script lang="ts">
  import type { PageData } from "./$types";
  import ProfileMenu from "$lib/components/ProfileMenu.svelte";

  let { data }: { data: PageData } = $props();
  let searchQuery = $state("");

  let filteredBooks = $derived(
    data.books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );
</script>

<svelte:head>
  <title>Catalog | SK Tracker</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div
  class="min-h-screen bg-[#f5f2eb] text-stone-700"
  style="font-family: 'JetBrains Mono', monospace;"
>
  <!-- Header -->
  <header
    class="sticky top-0 z-50 backdrop-blur-md bg-[#f5f2eb]/90 border-b border-stone-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <a
            href="/"
            class="text-stone-500 hover:text-red-700 transition-colors"
            aria-label="Go back to home"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
          <h1 class="text-2xl font-bold text-stone-800">Book Catalog</h1>
        </div>

        <div class="flex items-center gap-4">
          <!-- Search Bar -->
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search books..."
              bind:value={searchQuery}
              class="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all font-sans"
            />
          </div>

          <!-- Profile Menu -->
          <ProfileMenu session={data.session} />
        </div>
      </div>
    </div>
  </header>

  <!-- Stats Bar -->
  <div class="border-b border-stone-300 bg-stone-100/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div
        class="flex items-center gap-6 text-sm"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        <div class="flex items-center gap-2">
          <span class="text-stone-500">Total:</span>
          <span class="text-stone-800 font-semibold"
            >{data.books.length} books</span
          >
        </div>
        {#if searchQuery}
          <div class="flex items-center gap-2">
            <span class="text-stone-500">Showing:</span>
            <span class="text-red-700 font-semibold"
              >{filteredBooks.length} results</span
            >
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Books Grid -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if filteredBooks.length === 0}
      <div class="text-center py-20">
        <svg
          class="w-16 h-16 text-stone-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6.253v11.494m-9-5.747h18"
          />
        </svg>
        <p class="text-stone-500 italic">No books found for "{searchQuery}"</p>
      </div>
    {:else}
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
      >
        {#each filteredBooks as book}
          <article class="group cursor-pointer">
            <!-- Book Cover -->
            <div
              class="relative aspect-[2/3] rounded-xl overflow-hidden bg-stone-200 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1"
            >
              {#if book.coverUrl}
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              {:else}
                <div
                  class="w-full h-full bg-stone-300 flex flex-col items-center justify-center p-4"
                >
                  <svg
                    class="w-10 h-10 text-stone-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span class="text-stone-500 text-xs font-mono">No Cover</span>
                </div>
              {/if}

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3"
              >
                {#if book.synopsis}
                  <p
                    class="text-[11px] text-stone-100 line-clamp-4 leading-relaxed font-sans"
                  >
                    {book.synopsis}
                  </p>
                {/if}
              </div>
            </div>

            <!-- Book Info -->
            <div class="mt-3 px-1">
              <span
                class="text-red-700 text-[10px] tracking-widest uppercase block mb-1"
                style="font-family: 'JetBrains Mono', monospace;"
              >
                {book.year}
              </span>
              <h2
                class="text-sm font-bold text-stone-800 group-hover:text-red-700 transition-colors duration-200 line-clamp-2 leading-snug"
              >
                {book.title}
              </h2>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="border-t border-stone-300 mt-auto bg-[#f5f2eb]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col items-center gap-2">
        <span class="text-red-700">◆</span>
        <p
          class="text-stone-500 text-xs text-center"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          Stephen King Book Tracker · {data.books.length} books catalogued
        </p>
      </div>
    </div>
  </footer>
</div>
