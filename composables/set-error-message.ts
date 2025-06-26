export function setErrorMessage(
  errorMessage: Ref<string>,
  msg: string,
) {
  errorMessage.value = msg;
  setTimeout(
    () => {
      errorMessage.value = "";
    },
    10000,
  );
}
