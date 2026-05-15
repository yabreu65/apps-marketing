export function createJsonRequest(
  url: string,
  method: string,
  body?: unknown,
  headers?: HeadersInit,
): Request {
  const baseHeaders = new Headers(headers);
  if (!baseHeaders.has('content-type')) {
    baseHeaders.set('content-type', 'application/json');
  }

  return new Request(url, {
    method,
    headers: baseHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function readJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

type EnvPatch = Record<string, string | undefined>;

export function setTestEnv(patch: EnvPatch) {
  const previous: EnvPatch = {};

  for (const [key, value] of Object.entries(patch)) {
    previous[key] = process.env[key];

    if (typeof value === 'undefined') {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  return previous;
}

export function resetTestEnv(previous: EnvPatch) {
  for (const [key, value] of Object.entries(previous)) {
    if (typeof value === 'undefined') {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

export function sameOriginHeaders(origin = 'http://localhost:3000'): HeadersInit {
  return {
    origin,
    host: 'localhost:3000',
    'x-forwarded-proto': 'http',
  };
}
