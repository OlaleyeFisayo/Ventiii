import type {
  NavigationMenuItem,
} from "@nuxt/ui";

export const useSidebarStore = defineStore(
  "useSidebarStore",
  () => {
    const {
      isMobile,
    } = useMobileBreakpoint();

    const getInitialDesktopState = () => {
      try {
        const saved = localStorage.getItem("sidebar-desktop-state");
        return saved
          ? JSON.parse(saved)
          : false;
      }
      catch {
        return false;
      }
    };

    const desktopState = ref(getInitialDesktopState());
    const mobileState = ref(false);

    watch(
      desktopState,
      (newValue) => {
        try {
          localStorage.setItem(
            "sidebar-desktop-state",
            JSON.stringify(newValue),
          );
        }
        catch (error) {
          console.error(
            "Failed to save sidebar state to localStorage:",
            error,
          );
        }
      },
    );

    watch(
      isMobile,
      (
        newValue,
        oldValue,
      ) => {
        if (oldValue === true && newValue === false) {
          mobileState.value = false;
        }
      },
    );

    function toggleState() {
      if (isMobile.value) {
        mobileState.value = !mobileState.value;
      }
      else {
        desktopState.value = !desktopState.value;
      }
    }

    function navigation(eventId: string): NavigationMenuItem[][] {
      const defaultEventUrl = `/event/${eventId}`;
      return [
        [
          {
            label: "Navigation:",
            type: "label",
          },
          {
            label: "Overview",
            to: defaultEventUrl,
            icon: "i-tabler-layout-dashboard",
            tooltip: desktopState.value
              ? {
                  text: "Overview",
                }
              : undefined,
          },
        ],
        [
          {
            label: "Settings",
            to: `${defaultEventUrl}/settings`,
            icon: "i-tabler-settings",
            tooltip: desktopState.value
              ? {
                  text: "Event Settings",
                }
              : undefined,
          },
        ],

      ];
    }

    return {
      desktopState,
      mobileState,
      toggleState,
      navigation,
    };
  },
);
