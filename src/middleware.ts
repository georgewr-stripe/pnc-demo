import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' https://connect-js.stripe.com https://js.stripe.com 'unsafe-eval' 'unsafe-inline';
    style-src 'self' sha256-0hAheEzaMe6uXIKV4EehS9pu1am1lj/KnnzrOYqckXk= 'unsafe-inline';
    img-src 'self' blob: data: https://*.stripe.com;
    frame-src 'self' https://connect-js.stripe.com https://js.stripe.com;
    connect-src 'self' https://*.stripe.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}
