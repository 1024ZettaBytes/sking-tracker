<script lang="ts">
  import type { PageData } from "./$types";
  import ProfileMenu from "$lib/components/ProfileMenu.svelte";
  import { enhance } from "$app/forms";
  import { translations, type Language } from "$lib/i18n";

  let { data }: { data: PageData } = $props();
  let currentLang = $derived(
    (data.session?.user?.language as Language) || "ENG",
  );

  let sortedBooks = $derived(data.collection.sort((a, b) => a.year - b.year));

  let loadingState = $state<{
    bookId: number;
    action: "owned" | "read" | "rate";
  } | null>(null);

  function handleSubmit(bookId: number, action: "owned" | "read" | "rate") {
    return () => {
      loadingState = { bookId, action };
      return async ({ update }: { update: () => Promise<void> }) => {
        await update();
        loadingState = null;
      };
    };
  }
</script>

<svelte:head>
  <title>My Collection | SK Tracker</title>
</svelte:head>

<div
  class="min-h-screen bg-[#f5f2eb] text-stone-800"
  style="font-family: 'JetBrains Mono', monospace;"
>
  <!-- Header / Nav -->
  <header
    class="sticky top-0 z-50 backdrop-blur-md bg-[#f5f2eb]/90 border-b border-stone-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <!-- Top Row (Mobile) / Left Side (Desktop) -->
        <div
          class="flex items-center justify-between sm:justify-start w-full sm:w-auto sm:gap-4"
        >
          <a
            href="/"
            class="text-stone-500 hover:text-red-700 transition-colors"
            aria-label="Home"
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

          <!-- Mobile Profile -->
          <div class="sm:hidden">
            <ProfileMenu session={data.session} />
          </div>
        </div>

        <!-- Title Row (Mobile) / Attached to Left (Desktop) -->
        <!-- We move title out of the flex container above to allow it to be its own row on mobile if needed, or structured differently. 
             Actually, to match the desktop layout [Back][Title] ... [Profile], we can put title in the first div for desktop?
             If we put title in first div: on mobile it sits next to Back. Space in middle for Logo?
             Back (left) ... Logo ... Profile (right).
             Title needs to be on next line.
        -->
        <h1
          class="text-2xl font-bold text-stone-800 text-center sm:text-left sm:flex-1 sm:ml-4"
        >
          {translations[currentLang].myCollection}
        </h1>

        <!-- Desktop Profile -->
        <div class="hidden sm:block">
          <ProfileMenu session={data.session} />
        </div>
      </div>
    </div>
  </header>

  <!-- Stats Dashboard -->
  <div class="bg-stone-100 border-b border-stone-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
        <!-- Total -->
        <div
          class="text-center p-4 bg-white rounded-lg shadow-sm border border-stone-200"
        >
          <span
            class="block text-stone-500 text-xs uppercase tracking-widest mb-1"
            style="font-family: 'JetBrains Mono', monospace;"
            >{translations[currentLang].totalBooksLabel}</span
          >
          <span class="text-2xl sm:text-4xl font-bold text-stone-800"
            >{data.stats.total}</span
          >
        </div>

        <!-- Owned -->
        <div
          class="text-center p-4 bg-white rounded-lg shadow-sm border border-stone-200 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-stone-200/50 transform origin-bottom transition-transform duration-1000"
            style="transform: scaleY({data.stats.owned / data.stats.total});"
          ></div>
          <div class="relative z-10">
            <span
              class="block text-stone-500 text-xs uppercase tracking-widest mb-1"
              style="font-family: 'JetBrains Mono', monospace;"
              >{translations[currentLang].ownedLabel}</span
            >
            <span class="text-2xl sm:text-4xl font-bold text-stone-800"
              >{data.stats.owned}</span
            >
            <span
              class="text-[10px] text-stone-400 block mt-1"
              style="font-family: 'JetBrains Mono', monospace;"
              >{Math.round((data.stats.owned / data.stats.total) * 100)}%</span
            >
          </div>
        </div>

        <!-- Read -->
        <div
          class="text-center p-4 bg-white rounded-lg shadow-sm border border-stone-200 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-red-100/50 transform origin-bottom transition-transform duration-1000"
            style="transform: scaleY({data.stats.read / data.stats.total});"
          ></div>
          <div class="relative z-10">
            <span
              class="block text-red-700 text-xs uppercase tracking-widest mb-1"
              style="font-family: 'JetBrains Mono', monospace;"
              >{translations[currentLang].readLabel}</span
            >
            <span class="text-2xl sm:text-4xl font-bold text-red-800"
              >{data.stats.read}</span
            >
            <span
              class="text-[10px] text-red-400 block mt-1"
              style="font-family: 'JetBrains Mono', monospace;"
              >{Math.round((data.stats.read / data.stats.total) * 100)}%</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Timeline Content -->
  <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="relative pl-8 sm:pl-12 border-l-2 border-stone-300 space-y-12">
      {#each sortedBooks as book}
        <div class="relative group">
          <!-- Timeline Dot -->
          <div
            class="absolute -left-[41px] sm:-left-[58px] top-6 w-5 h-5 rounded-full border-4 border-[#f5f2eb] transition-colors duration-300 z-10
            {book.isRead
              ? 'bg-red-700 scale-125'
              : book.isOwned
                ? 'bg-stone-500'
                : 'bg-stone-300'}"
          ></div>

          <!-- Year Label -->
          <div
            class="absolute -left-[100px] sm:-left-[120px] top-6 w-12 text-right text-xs sm:text-sm font-bold tracking-tighter opacity-50 transition-opacity group-hover:opacity-100"
            style="font-family: 'JetBrains Mono', monospace;"
          >
            {book.year}
          </div>

          <!-- Book Card -->
          <div
            class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border transition-all duration-300
            {book.isOwned
              ? 'border-stone-300 opacity-100'
              : 'border-stone-100 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}"
          >
            <!-- Cover -->
            <div
              class="w-24 sm:w-32 flex-shrink-0 aspect-[2/3] rounded-lg overflow-hidden bg-stone-200 shadow-inner"
            >
              {#if book.coverUrl}
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              {:else}
                <div
                  class="w-full h-full flex items-center justify-center text-stone-400 text-xs font-mono"
                >
                  No Cover
                </div>
              {/if}
            </div>

            <!-- Content -->
            <div class="flex-1 flex flex-col">
              <div class="flex-1">
                <h3 class="text-lg sm:text-xl font-bold text-stone-800 mb-1">
                  {book.title}
                </h3>
                {#if book.synopsis}
                  <p
                    class="text-sm text-stone-500 line-clamp-2 sm:line-clamp-3 mb-4"
                  >
                    {book.synopsis}
                  </p>
                {/if}
              </div>

              <!-- Actions/Controls -->
              <div
                class="flex items-center gap-4 mt-4 pt-4 border-t border-stone-100"
              >
                <!-- Owned Toggle -->
                <form
                  method="POST"
                  action="?/toggleOwned"
                  use:enhance={handleSubmit(book.id, "owned")}
                >
                  <input type="hidden" name="bookId" value={book.id} />
                  <button
                    class="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:text-stone-900
                    {book.isOwned ? 'text-stone-800' : 'text-stone-400'}"
                    style="font-family: 'JetBrains Mono', monospace;"
                    disabled={loadingState?.bookId === book.id &&
                      loadingState?.action === "owned"}
                  >
                    <div
                      class="w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors relative
                      {book.isOwned
                        ? 'border-stone-800 bg-stone-800 text-white'
                        : 'border-stone-300'}"
                    >
                      {#if loadingState?.bookId === book.id && loadingState?.action === "owned"}
                        <svg
                          class="animate-spin h-3 w-3 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      {/if}
                    </div>
                    {translations[currentLang].markOwned}
                  </button>
                </form>

                <!-- Read Toggle -->
                <form
                  method="POST"
                  action="?/toggleRead"
                  use:enhance={handleSubmit(book.id, "read")}
                >
                  <input type="hidden" name="bookId" value={book.id} />
                  <button
                    class="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:text-red-800
                    {book.isRead ? 'text-red-700' : 'text-stone-400'}"
                    style="font-family: 'JetBrains Mono', monospace;"
                    disabled={loadingState?.bookId === book.id &&
                      loadingState?.action === "read"}
                  >
                    <div
                      class="w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors relative
                      {book.isRead
                        ? 'border-red-700 bg-red-700 text-white'
                        : 'border-stone-300'}"
                    >
                      {#if loadingState?.bookId === book.id && loadingState?.action === "read"}
                        <svg
                          class="animate-spin h-3 w-3 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      {/if}
                    </div>
                    {translations[currentLang].markRead}
                  </button>
                </form>
              </div>

              <!-- Rating Component -->
              <div class="mt-4 pt-4 border-t border-stone-100">
                <form
                  method="POST"
                  action="?/rateBook"
                  use:enhance={handleSubmit(book.id, "rate")}
                >
                  <input type="hidden" name="bookId" value={book.id} />
                  <div class="flex items-center gap-2">
                    <span
                      class="text-xs font-bold uppercase tracking-wider text-stone-400"
                      style="font-family: 'JetBrains Mono', monospace;"
                      >{translations[currentLang].rate}</span
                    >
                    <div class="flex items-center gap-1">
                      {#each Array(5) as _, i}
                        <button
                          type="submit"
                          name="rating"
                          value={i + 1}
                          class="focus:outline-none transition-transform hover:scale-110 disabled:cursor-not-allowed"
                          disabled={loadingState?.bookId === book.id &&
                            loadingState?.action === "rate"}
                        >
                          <svg
                            class="w-5 h-5 transition-colors {book.rating &&
                            book.rating >= i + 1
                              ? 'text-yellow-500 fill-current'
                              : 'text-stone-300'}"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.5"
                            fill="none"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </button>
                      {/each}
                    </div>
                    {#if loadingState?.bookId === book.id && loadingState?.action === "rate"}
                      <svg
                        class="animate-spin h-3 w-3 text-stone-400 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    {/if}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>
