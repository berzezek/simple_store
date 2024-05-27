<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <blocks-main-nav />

    <!-- Sidebar -->

    <blocks-main-asside />

    <main class="p-4 md:ml-64 h-auto pt-20">
      <slot />

    </main>
  </div>
</template>
