import { NextResponse } from 'next/server';

type ErrorDetails = Record<string, unknown> | unknown[] | undefined;

type ResponseHeaders = HeadersInit | undefined;

export function successResponse<T extends Record<string, unknown>>(data: T, status = 200, headers?: ResponseHeaders) {
  return NextResponse.json({ ok: true, ...data }, { status, headers });
}

export function errorResponse(message: string, status: number, errors?: ErrorDetails, headers?: ResponseHeaders) {
  return NextResponse.json(
    {
      ok: false,
      message,
      ...(errors ? { errors } : {}),
    },
    { status, headers },
  );
}

export function methodNotAllowedResponse(allowedMethods: string[], headers?: ResponseHeaders) {
  return NextResponse.json(
    {
      ok: false,
      message: 'Método no permitido.',
      errors: { allowedMethods },
    },
    {
      status: 405,
      headers: {
        Allow: allowedMethods.join(', '),
        ...(headers ?? {}),
      },
    },
  );
}
