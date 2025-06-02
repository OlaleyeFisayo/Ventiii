<template>
  <section class="pt-8 pb-4 flex flex-col sm:gap-8 gap-4">
    <div class="flex items-center justify-between gap-2">
      <h1 class="font-bold sm:text-4xl text-xl">
        Your Events
      </h1>
      <AppButton
        label="New Event"
        icon="i-tabler-plus"
        theme="secondary"
        class="sm:text-lg text-md"
      />
    </div>
    <AppInput
      placeholder="Search Event"
      icon="i-tabler-search"
      base-class="pl-9"
    />
  </section>
</template>
