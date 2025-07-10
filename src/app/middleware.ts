// /src/app/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const protectedRoutes = req.nextUrl.pathname.startsWith('/(protected)')

  if (protectedRoutes && !session) {
    return NextResponse.redirect(new URL('/(auth)/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((protected)*)'], // middleware only runs on /protected/*
}
