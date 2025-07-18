<script setup>
import {
  UIcon,
} from "#components";

defineProps({
  socialLinks: {
    type: Object,
    required: true,
  },
});

const iconMap = {
  "LinkedIn": "tabler:brand-linkedin",
  "Facebook": "tabler:brand-facebook",
  "WhatsApp": "tabler:brand-whatsapp",
  "Twitter / X": "tabler:brand-x",
  "Instagram": "tabler:brand-instagram",
  "YouTube": "tabler:brand-youtube",
  "TikTok": "tabler:brand-tiktok",
  "Website": "tabler:world",
  "GitHub": "tabler:brand-github",
  "Behance": "tabler:brand-behance",
  "Dribbble": "tabler:brand-dribbble",
  "Medium": "tabler:brand-medium",
  "Personal Blog": "tabler:edit",
};

const colorMap = {
  "LinkedIn": "bg-blue-600 hover:bg-blue-700",
  "Facebook": "bg-blue-500 hover:bg-blue-600",
  "WhatsApp": "bg-green-500 hover:bg-green-600",
  "Twitter / X": "bg-black hover:bg-gray-800",
  "Instagram": "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600",
  "YouTube": "bg-red-600 hover:bg-red-700",
  "TikTok": "bg-black hover:bg-gray-800",
  "Website": "bg-gray-600 hover:bg-gray-700",
  "GitHub": "bg-gray-800 hover:bg-gray-900",
  "Behance": "bg-blue-400 hover:bg-blue-500",
  "Dribbble": "bg-pink-500 hover:bg-pink-600",
  "Medium": "bg-gray-700 hover:bg-gray-800",
  "Personal Blog": "bg-indigo-600 hover:bg-indigo-700",
};

function getIconName(platform) {
  return iconMap[platform] || "tabler:link";
}

function getIconBackgroundClass(platform) {
  return colorMap[platform] || "bg-gray-500 hover:bg-gray-600";
}

function getPlatformDisplayName(platform) {
  // Handle special cases for display names
  if (platform === "Twitter / X")
    return "X";
  if (platform === "Personal Blog")
    return "Blog";
  return platform;
}
</script>

<template>
  <div class="social-links-container">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <a
        v-for="(link, platform) in socialLinks"
        :key="platform"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link-item group"
      >
        <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div
            class="w-12 h-12 mb-3 flex items-center justify-center rounded-full transition-colors duration-300"
            :class="getIconBackgroundClass(platform)"
          >
            <UIcon
              :name="getIconName(platform)"
              class="w-6 h-6 text-white"
            />
          </div>
          <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            {{ getPlatformDisplayName(platform) }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.social-links-container {
  @apply max-w-4xl mx-auto p-6;
}

.social-link-item {
  @apply block no-underline;
}

.social-link-item:hover {
  @apply no-underline;
}

.social-link-item:hover .bg-gradient-to-r {
  background-size: 150% 150%;
  animation: gradient-shift 2s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
