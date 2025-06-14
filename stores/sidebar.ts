export const useSidebarStore = defineStore("useSidebarStore", () => {
  const {
    isMobile,
  } = useMobileBreakpoint();

  const desktopState = ref(false);
  const mobileState = ref(false);

  function toggleState() {
    if (isMobile.value)
      mobileState.value = !mobileState.value;
    else
      desktopState.value = !desktopState.value;
  }

  return {
    desktopState,
    mobileState,
    toggleState,
  };
});
