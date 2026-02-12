<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";
  import GoogleIcon from "$lib/assets/icons/google.svg";
  import type { Session } from "@auth/core/types";

  let { session }: { session: Session | null } = $props();
  let isOpen = $state(false);

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(".profile-menu-container")) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  });
</script>

{#if session?.user}
  <!-- Logged in state -->
  <div class="profile-menu-container relative">
    <button
      onclick={toggleMenu}
      class="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
      aria-label="Open profile menu"
    >
      {#if session.user.image}
        <img
          src={session.user.image}
          alt={session.user.name || "User"}
          class="w-9 h-9 rounded-full border-2 border-stone-300 hover:border-red-700 transition-colors"
          referrerpolicy="no-referrer"
        />
      {:else}
        <div
          class="w-9 h-9 rounded-full bg-stone-300 flex items-center justify-center text-stone-600 font-bold"
        >
          {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "?"}
        </div>
      {/if}
    </button>

    {#if isOpen}
      <div
        class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden z-50"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        <!-- User info header -->
        <div class="px-4 py-3 bg-stone-50 border-b border-stone-200">
          <div class="flex items-center gap-3">
            {#if session.user.image}
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                class="w-10 h-10 rounded-full flex-shrink-0"
                referrerpolicy="no-referrer"
              />
            {:else}
              <div
                class="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center text-stone-600 font-bold flex-shrink-0"
              >
                {session.user.name?.charAt(0) ||
                  session.user.email?.charAt(0) ||
                  "?"}
              </div>
            {/if}
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-stone-800 truncate">
                {session.user.name || "User"}
              </p>
              <p class="text-xs text-stone-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        <!-- Menu items -->
        <div class="py-2">
          <a
            href="/collection"
            class="flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
          >
            <svg
              class="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
            My Collection
          </a>
        </div>

        <!-- Sign out -->
        <div class="border-t border-stone-200 py-2">
          <button
            onclick={() => signOut()}
            class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <svg
              class="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Sign out
          </button>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <!-- Logged out state -->
  <button
    onclick={() => signIn("google")}
    class="bg-[#CCC0AF] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-[#878074] hover:border-blue-500 inline-flex items-center rounded"
    style="font-family: 'JetBrains Mono', monospace; cursor: pointer;"
  >
    Sign in
    <img
      src={GoogleIcon}
      alt="Google Icon"
      width="24"
      height="24"
      class="ml-2"
    />
  </button>
{/if}
