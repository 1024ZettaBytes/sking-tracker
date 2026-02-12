<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import towerLogo from "$lib/assets/icons/tower-logo.png";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- Global Logo -->
<a
  href="/"
  class="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-[60] hover:opacity-80 transition-opacity"
>
  <img
    src={towerLogo}
    alt="Tower Logo"
    class="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
  />
</a>

{@render children()}
