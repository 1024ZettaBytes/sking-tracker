<script lang="ts">
  import type { PageData } from "./$types";
  import { signIn } from "@auth/sveltekit/client";
  import GoogleIcon from "$lib/assets/icons/google.svg";
  let { data }: { data: PageData } = $props();

  let currentQuoteIndex = $state(0);
  const quotes = [
    { text: "Books are a uniquely portable magic.", book: "On Writing" },
    {
      text: "Monsters are real, and ghosts are real too. They live inside us, and sometimes, they win.",
      book: "The Shining",
    },
    {
      text: "We make up horrors to help us cope with the real ones.",
      book: "Dance Macabre",
    },
    {
      text: "The trust of the innocent is the liar's most useful tool.",
      book: "Needful Things",
    },
  ];

  $effect(() => {
    const interval = setInterval(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }, 6000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
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
  <title>SK Tracker</title>
</svelte:head>

<div
  class="min-h-screen bg-[#f5f2eb] text-stone-700"
  style="font-family: 'Libre Baskerville', Georgia, serif;"
>
  <!-- Cinematic Hero -->
  <section class="relative h-screen overflow-hidden">
    <!-- Grain overlay -->
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none z-50"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"
    ></div>

    <!-- Book covers mosaic background -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 opacity-[0.15] scale-110"
      >
        {#each [...data.featuredBooks, ...data.featuredBooks, ...data.featuredBooks, ...data.featuredBooks] as book, i}
          <div
            class="aspect-[2/3] overflow-hidden"
            style="filter: grayscale(100%) contrast(1.1);"
          >
            {#if book.coverUrl}
              <img
                src={book.coverUrl}
                alt=""
                class="w-full h-full object-cover"
              />
            {/if}
          </div>
        {/each}
      </div>
      <!-- Light gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#f5f2eb] via-[#f5f2eb]/80 to-[#f5f2eb]"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#f5f2eb] via-transparent to-[#f5f2eb]"
      ></div>
    </div>

    <!-- Red accent line -->
    <div
      class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent"
    ></div>

    <!-- Navigation -->
    <nav
      class="relative z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-6"
    >
      <div class="flex items-center gap-4 sm:gap-8">
        <a
          href="/catalog"
          class="text-stone-600 hover:text-stone-900 transition-colors text-xs sm:text-sm tracking-wider uppercase"
          style="font-family: 'JetBrains Mono', monospace;">Catalog</a
        >
        <button
          onclick={() => signIn("google")}
          class="bg-[#CCC0AF] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-[#878074] hover:border-blue-500 inline-flex items-center rounded"
          style="font-family: 'JetBrains Mono', monospace; cursor: pointer;"
        >
          <img
            src={GoogleIcon}
            alt="Google Icon"
            width="24"
            height="24"
            class="mr-2"
          />
          Log In</button
        >
      </div>
    </nav>

    <!-- Hero Content -->
    <div
      class="relative z-30 flex flex-col items-center justify-center h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)] px-4 sm:px-6"
    >
      <div class="sk-title-wrapper lg:text-8xl">
        <span class="sk-title">
          <div>Stephen</div>
          <div>King</div>
        </span>
      </div>
      <div class="text-center max-w-4xl w-full">
        <!-- Small label -->
        <p
          class="text-red-700 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-6 sm:mb-8"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          Book tracker For the Constant Readers
        </p>

        <!-- Main title - editorial style -->
        <h1
          class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-stone-800 leading-[0.95] sm:leading-[0.9] mb-4 sm:mb-6"
        >
          Every Story.<br />
          <span class="italic font-normal text-stone-500">Every Nightmare.</span
          >
        </h1>

        <!-- Typewriter-style subtitle -->
        <p
          class="text-stone-600 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12 text-xs sm:text-sm"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          Track your journey through Stephen King's universe.
          <span class="text-red-700">_</span>
        </p>

        <!-- Simple CTA -->
        <a
          href="/catalog"
          class="inline-block border border-stone-400 hover:border-red-700 hover:bg-red-700/10 px-8 sm:px-12 py-3 sm:py-4 text-stone-700 hover:text-red-800 transition-all duration-300 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          Begin
        </a>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-30">
      <div class="flex flex-col items-center gap-2 text-stone-500">
        <span
          class="text-[10px] sm:text-xs tracking-widest uppercase"
          style="font-family: 'JetBrains Mono', monospace;">Scroll</span
        >
        <div
          class="w-px h-6 sm:h-8 bg-gradient-to-b from-stone-500 to-transparent"
        ></div>
      </div>
    </div>
  </section>

  <!-- Quote Section - Full width, dramatic -->
  <section
    class="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t border-stone-300"
  >
    <div class="max-w-5xl mx-auto text-center">
      <span class="text-red-700 text-4xl sm:text-6xl leading-none">"</span>
      <blockquote
        class="text-lg sm:text-2xl md:text-4xl text-stone-700 italic leading-relaxed mt-3 sm:mt-4 mb-6 sm:mb-8 px-2"
      >
        {quotes[currentQuoteIndex].text}
      </blockquote>
      <cite
        class="text-stone-500 not-italic tracking-wider uppercase text-xs sm:text-sm"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        — {quotes[currentQuoteIndex].book}
      </cite>
    </div>
  </section>

  <!-- Collection Preview - Magazine layout -->
  <section
    class="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-stone-300"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Section header -->
      <div
        class="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 md:mb-16 border-b border-stone-300 pb-4 sm:pb-6 gap-2 sm:gap-0"
      >
        <div>
          <span
            class="text-red-700 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs block mb-1 sm:mb-2"
            style="font-family: 'JetBrains Mono', monospace;">The Library</span
          >
          <h2
            class="text-2xl sm:text-4xl md:text-5xl text-stone-800"
            style="font-family: 'JetBrains Mono', monospace;"
          >
            From the Collection
          </h2>
        </div>
        <a
          href="/catalog"
          class="text-stone-500 hover:text-red-700 transition-colors text-xs sm:text-sm tracking-wider uppercase hidden sm:block"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          View All →
        </a>
      </div>

      <!-- Asymmetric grid -->
      <div class="grid grid-cols-2 sm:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
        {#each data.featuredBooks.slice(0, 5) as book, i}
          {#if i === 0}
            <!-- Large featured -->
            <article
              class="col-span-2 sm:col-span-12 md:col-span-5 md:row-span-2 group cursor-pointer"
            >
              <div
                class="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-stone-200 shadow-lg rounded-xl"
              >
                {#if book.coverUrl}
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                  />
                {/if}
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                ></div>
                <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <span
                    class="text-red-400 text-[10px] sm:text-xs tracking-widest uppercase"
                    style="font-family: 'JetBrains Mono', monospace;"
                    >{book.year}</span
                  >
                  <h3
                    class="text-xl sm:text-2xl md:text-3xl text-white mt-1 sm:mt-2 leading-tight"
                    style="font-family: 'JetBrains Mono', monospace;"
                  >
                    {book.title}
                  </h3>
                </div>
              </div>
            </article>
          {:else}
            <!-- Smaller items -->
            <article
              class="col-span-1 sm:col-span-6 md:col-span-{i === 1 || i === 2
                ? '3'
                : '4'} group cursor-pointer"
            >
              <div
                class="relative aspect-[2/3] overflow-hidden bg-stone-200 mb-2 sm:mb-3 shadow-md to-transparent rounded-xl"
              >
                {#if book.coverUrl}
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  />
                {/if}
              </div>
              <span
                class="text-stone-500 text-[10px] sm:text-xs"
                style="font-family: 'JetBrains Mono', monospace;"
                >{book.year}</span
              >
              <h3
                class="text-stone-700 group-hover:text-red-700 transition-colors text-xs sm:text-sm md:text-base mt-1 leading-snug line-clamp-2"
                style="font-family: 'JetBrains Mono', monospace;"
              >
                {book.title}
              </h3>
            </article>
          {/if}
        {/each}
      </div>

      <a
        href="/catalog"
        class="text-stone-500 hover:text-red-700 transition-colors text-xs sm:text-sm tracking-wider uppercase mt-6 sm:mt-8 block sm:hidden"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        View All →
      </a>
    </div>
  </section>

  <!-- What you can do - Minimal, text-focused -->
  <section
    class="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t border-stone-300 bg-stone-100/50"
  >
    <div
      class="max-w-4xl mx-auto"
      style="font-family: 'JetBrains Mono', monospace;"
    >
      <span
        class="text-red-700 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs block mb-6 sm:mb-8"
        >How it works</span
      >

      <div class="space-y-10 sm:space-y-16">
        <div
          class="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-8 items-start"
        >
          <span class="text-stone-300 text-4xl sm:text-6xl sm:col-span-2"
            >01</span
          >
          <div class="sm:col-span-10">
            <h3
              class="text-xl sm:text-2xl md:text-3xl text-stone-800 mb-2 sm:mb-4"
            >
              Discover the complete bibliography
            </h3>
            <p class="text-stone-600 leading-relaxed text-sm sm:text-base">
              Every novel, novella, short story collection, and non-fiction
              work. From Carrie to Holly, nothing is left behind.
            </p>
          </div>
        </div>

        <div
          class="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-8 items-start"
        >
          <span
            class="text-stone-300 text-4xl sm:text-6xl sm:col-span-2"
            style="font-family: 'JetBrains Mono', monospace;">02</span
          >
          <div class="sm:col-span-10">
            <h3
              class="text-xl sm:text-2xl md:text-3xl text-stone-800 mb-2 sm:mb-4"
            >
              Mark what you've conquered
            </h3>
            <p class="text-stone-600 leading-relaxed text-sm sm:text-base">
              Track read books, current reads, and your personal wishlist. Rate
              them, add notes, remember every journey through Castle Rock and
              Derry.
            </p>
          </div>
        </div>

        <div
          class="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-8 items-start"
        >
          <span
            class="text-stone-300 text-4xl sm:text-6xl sm:col-span-2"
            style="font-family: 'JetBrains Mono', monospace;">03</span
          >
          <div class="sm:col-span-10">
            <h3
              class="text-xl sm:text-2xl md:text-3xl text-stone-800 mb-2 sm:mb-4"
            >
              See the gaps in your shelf
            </h3>
            <p class="text-stone-600 leading-relaxed text-sm sm:text-base">
              Instantly know what you're missing. Find connections between
              books. Plan your next descent into the King universe.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA - Dramatic, simple -->
  <section
    class="relative py-20 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 border-t border-stone-300 overflow-hidden"
  >
    <!-- Subtle background -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] border border-red-700 rounded-full"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] border border-red-700 rounded-full"
      ></div>
    </div>

    <div
      class="relative z-10 max-w-3xl mx-auto text-center px-2"
      style="font-family: 'JetBrains Mono', monospace;"
    >
      <h2 class="text-3xl sm:text-4xl md:text-6xl text-stone-800 mb-6 sm:mb-8">
        Ready to start<br />
        <span class="italic text-stone-500">your collection?</span>
      </h2>
      <a
        href="/catalog"
        class="inline-block bg-red-700 hover:bg-red-800 px-8 sm:px-12 md:px-16 py-4 sm:py-5 text-white transition-all duration-300 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        Enter the Library
      </a>
    </div>
  </section>

  <!-- Footer - Minimal -->
  <footer class="border-t border-stone-300 py-8 sm:py-12 px-4 sm:px-6 md:px-12">
    <div
      class="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4"
    >
      <div class="flex items-center gap-2">
        <span class="text-red-700">◆</span>
      </div>
      <p
        class="text-stone-500 text-[10px] sm:text-xs text-center"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        A project for Constant Readers. Not affiliated with Stephen King.
      </p>
    </div>
  </footer>
</div>
