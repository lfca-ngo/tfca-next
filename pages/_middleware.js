import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next()
  }
  const country = request.geo.country

  const url = request.nextUrl.clone()

  switch (country) {
    case 'DE':
      url.pathname = '/deu'
      break
    case 'FR':
      url.pathname = '/fra'
      break
    case 'ES':
      url.pathname = '/esp'
      break
    case 'TR':
      url.pathname = '/tur'
      break
    case 'US':
      url.pathname = '/usa'
      break
    default:
      url.pathname = '/int'
      break
  }

  return NextResponse.rewrite(url)
}
