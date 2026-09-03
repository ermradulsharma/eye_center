/**
 * Enterprise API Client Service Wrapper
 */
export async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(endpoint, options);
  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || `API Error: ${res.statusText}`);
  }

  return json;
}
