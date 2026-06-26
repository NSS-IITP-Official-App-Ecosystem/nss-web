import { createBrowserClient } from '@supabase/ssr'

let clientInstance = null;

export function createClient() {
  // If rendering on server (SSR), create a fresh instance to avoid crossing client boundaries
  if (typeof window === 'undefined') {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  // On client, reuse the existing instance
  if (!clientInstance) {
    clientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return clientInstance;
}
