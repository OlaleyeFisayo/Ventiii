<script lang="ts" setup>
defineProps({
  total: Number,
  itemsPerPage: Number,
  siblingCount: {
    type: Number,
    default: 1,
  },
  disabled: Boolean,
});

const page = defineModel<number>("page", {
  default: 1,
});
</script>

<template>
  <UPagination
    v-model:page="page"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="siblingCount"
    :disabled="disabled"
  />
</template>
