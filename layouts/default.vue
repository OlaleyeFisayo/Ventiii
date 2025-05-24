<template>
  <section class="flex flex-col min-h-[100dvh]">
    <AppNavBar />
    <main class="px-8 flex-1 flex flex-col">
      <section class="container mx-auto h-full flex-1">
        <slot />
      </section>
    </main>
  </section>
</template>
