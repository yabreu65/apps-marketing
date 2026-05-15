import { NextResponse } from 'next/server';

type ErrorDetails = Record<string, unknown> | unknown[] | undefined;

export function successResponse<T extends Record<string, unknown>>(data: T, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status });
}

export function errorResponse(message: string, status: number, errors?: ErrorDetails) {
  return NextResponse.json(
    {
      ok: false,
      message,
      ...(errors ? { errors } : {}),
    },
    { status },
  );
}

export function methodNotAllowedResponse(allowedMethods: string[]) {
  return NextResponse.json(
    {
      ok: false,
      message: 'Método no permitido.',
      errors: { allowedMethods },
    },
    {
      status: 405,
      headers: { Allow: allowedMethods.join(', ') },
    },
  );
}
