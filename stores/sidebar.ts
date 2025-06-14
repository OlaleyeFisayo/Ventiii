export const useSidebarStore = defineStore("useSidebarStore", () => {
  const {
    isMobile,
  } = useMobileBreakpoint();

  const getInitialDesktopState = () => {
    try {
      const saved = localStorage.getItem("sidebar-desktop-state");
      return saved ? JSON.parse(saved) : false;
    }
    catch {
      return false;
    }
  };

  const desktopState = ref(getInitialDesktopState());
  const mobileState = ref(false);

  watch(desktopState, (newValue) => {
    try {
      localStorage.setItem("sidebar-desktop-state", JSON.stringify(newValue));
    }
    catch (error) {
      console.error("Failed to save sidebar state to localStorage:", error);
    }
  });

  watch(isMobile, (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      mobileState.value = false;
    }
  });

  function toggleState() {
    if (isMobile.value) {
      mobileState.value = !mobileState.value;
    }
    else {
      desktopState.value = !desktopState.value;
    }
  }

  return {
    desktopState,
    mobileState,
    toggleState,
  };
});
