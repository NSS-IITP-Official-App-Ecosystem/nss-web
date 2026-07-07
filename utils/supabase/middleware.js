import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Global in-memory cache to track POST requests by client IP
const ipRequests = new Map();
const RATE_LIMIT_LIMIT = 5; // Max 5 POST requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute (60,000 ms)

export async function updateSession(request) {
  // --- IN-MEMORY RATE LIMITING FOR POST REQUESTS (FORM SUBMISSIONS) ---
  if (request.method === 'POST') {
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    if (!ipRequests.has(ip)) {
      ipRequests.set(ip, []);
    }

    let timestamps = ipRequests.get(ip);
    // Filter out old timestamps
    timestamps = timestamps.filter(t => t > windowStart);

    if (timestamps.length >= RATE_LIMIT_LIMIT) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please slow down and try again later." }),
        { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Record current request timestamp
    timestamps.push(now);
    ipRequests.set(ip, timestamps);

    // Memory Pruning: Clean up expired keys when map size is large to prevent memory leaks
    if (ipRequests.size > 1000) {
      for (const [key, tList] of ipRequests.entries()) {
        const validTList = tList.filter(t => t > now - RATE_LIMIT_WINDOW);
        if (validTList.length === 0) {
          ipRequests.delete(key);
        } else {
          ipRequests.set(key, validTList);
        }
      }
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not write code between createServerClient and supabase.auth.getUser().
  // A simple mistake can write a session token back to the client that is not yours.
  await supabase.auth.getUser()

  return supabaseResponse
}
