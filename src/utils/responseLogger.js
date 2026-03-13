export async function logResponseEntry({ title, response }) {
  try {
    await fetch("/api/response-logger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        response,
      }),
      keepalive: true,
    });
  } catch {
    // Logging must not block the UI.
  }
}
