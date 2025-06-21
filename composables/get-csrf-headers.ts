export async function getCsrfHeaders() {
  try {
    const {
      csrf,
    } = useCsrf();

    // Wait for CSRF token to be available
    if (!csrf) {
      console.warn("CSRF token not available, retrying...");
      await new Promise(resolve => setTimeout(
        resolve,
        100,
      ));
      const {
        csrf: retryToken,
      } = useCsrf();
      if (!retryToken) {
        throw new Error("CSRF token unavailable after retry");
      }
      return {
        "csrf-token": retryToken,
      };
    }

    return {
      "csrf-token": csrf,
    };
  }
  catch (error) {
    console.error(
      "Failed to get CSRF token:",
      error,
    );
    throw error;
  }
}
