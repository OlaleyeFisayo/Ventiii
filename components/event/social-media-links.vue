<script setup lang="ts">
type SocialLinks = {
  [key: string]: string;
};

defineProps({
  socialLinks: {
    type: Object as PropType<SocialLinks>,
    required: true,
  },
});

const iconMap: Record<string, string> = {
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

const colorMap: Record<string, string> = {
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

const urlPatterns: Record<string, string> = {
  "LinkedIn": "https://linkedin.com/in/",
  "Facebook": "https://facebook.com/",
  "WhatsApp": "https://wa.me/",
  "Twitter / X": "https://x.com/",
  "Instagram": "https://instagram.com/",
  "YouTube": "https://youtube.com/@",
  "TikTok": "https://tiktok.com/@",
  "GitHub": "https://github.com/",
  "Behance": "https://behance.net/",
  "Dribbble": "https://dribbble.com/",
  "Medium": "https://medium.com/@",
  "Personal Blog": "",
};

function getIconName(platform: string): string {
  return iconMap[platform] || "tabler:link";
}

function getIconBackgroundClass(platform: string): string {
  return colorMap[platform] || "bg-gray-500 hover:bg-gray-600";
}

function getPlatformDisplayName(platform: string): string {
  if (platform === "Twitter / X")
    return "X";
  if (platform === "Personal Blog")
    return "Blog";
  return platform;
}

function buildUrl(
  platform: string,
  value: string,
): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const baseUrl = urlPatterns[platform];
  if (!baseUrl) {
    return value.startsWith("http") ? value : `https://${value}`;
  }

  const cleanUsername = value.startsWith("@") ? value.slice(1) : value;

  return `${baseUrl}${cleanUsername}`;
}
</script>

<template>
  <div class="flex flex-wrap gap-3 mt-2">
    <a
      v-for="(link, platform) in socialLinks"
      :key="platform"
      :href="buildUrl(platform, link)"
      target="_blank"
      rel="noopener noreferrer"
      class="social-icon-link group"
      :title="`Visit ${getPlatformDisplayName(platform)}`"
    >
      <div
        class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
        :class="getIconBackgroundClass(platform)"
      >
        <UIcon
          :name="getIconName(platform)"
          class="w-5 h-5 text-white"
        />
      </div>
    </a>
  </div>
</template>

<style scoped>
.social-icon-link {
  @apply block no-underline;
}

.social-icon-link:hover .bg-gradient-to-r {
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
