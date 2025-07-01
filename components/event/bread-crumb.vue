<script setup lang="ts">
import {
  AppBreadCrumb,
} from "#components";

type BreadcrumbLink = {
  label: string;
  to?: string;
  icon?: string;
};

type Props = {
  items?: BreadcrumbLink[];
};

const props = withDefaults(
  defineProps<Props>(),
  {
    items: () => [],
  },
);

const route = useRoute();

// Auto-generate breadcrumbs from route if no items provided
const breadcrumbitems = computed(() => {
  if (props.items.length > 0) {
    return props.items;
  }

  // Auto-generate from current route
  const pathSegments = route.path.split("/").filter(Boolean);
  const items: BreadcrumbLink[] = [{
    label: "Dashboard", // Changed from "Home" to "Dashboard"
    to: "/dashboard",
  }];

  let currentPath = "";
  pathSegments.forEach((
    segment: string,
    index: number,
  ) => {
    // Skip the "event" segment
    if (segment.toLowerCase() === "event") {
      currentPath += `/${segment}`;
      return;
    }

    currentPath += `/${segment}`;

    // Format segment name (capitalize and replace hyphens)
    const label = segment
      .replace(
        /-/g,
        " ",
      )
      .replace(
        /\b\w/g,
        (l: string) => l.toUpperCase(),
      );

    // Don't add link for the current page (last segment)
    const isLastSegment = index === pathSegments.length - 1;

    items.push({
      label,
      to: isLastSegment ? undefined : currentPath,
    });
  });

  return items;
});
</script>

<template>
  <AppBreadCrumb :items="breadcrumbitems" />
</template>
