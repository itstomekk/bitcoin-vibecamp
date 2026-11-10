// Tiny client for the site's Pages Functions under /api.
export async function postJSON<T = unknown>(path: string, body: unknown): Promise<{ status: number; data: T | null }> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    /* empty or non-JSON body */
  }
  return { status: res.status, data };
}
