export async function logResponseEntry(responseBody, status = 200) {
  try {
    await fetch("/api/response-logger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        responseBody,
      }),
      keepalive: true,
    });
  } catch {
    // Logging must not block the UI.
  }
}
