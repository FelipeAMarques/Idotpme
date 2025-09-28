import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Adiciona headers necessários para a API
  const headers = new Headers(request.headers);
  headers.set('x-api-route', 'true');

  // Retorna a requisição com os headers atualizados
  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
};