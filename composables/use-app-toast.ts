export function useAppToast() {
  const toast = useToast();

  function successToast(msg: string) {
    toast.add({
      title: "Success",
      description: msg,
      color: "success",
    });
  }

  function errorToast(msg: string) {
    toast.add({
      title: "Error",
      description: msg,
      color: "error",
    });
  }

  return {
    successToast,
    errorToast,
  };
}
