'use client';

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const defaultStale = 1000 * 60 * 5;

function isAdmin() {
  const userCookie = Cookies.get('user');
  if (!userCookie) return false;
  try {
    const user = JSON.parse(userCookie);
    return user?.role === 'admin' || user?.isAdmin === true;
  } catch (e) {
    return false;
  }
}

/**
 * useAdminQuery - shared helper for admin queries
 * keyParts: array or string appended after 'admin'
 * queryFn: async function that performs the fetch
 * opts: optional overrides (staleTime, keepPreviousData, enabled, etc.)
 */
export default function useAdminQuery(keyParts, queryFn, opts = {}) {
  const queryKey = Array.isArray(keyParts) ? ['admin', ...keyParts] : ['admin', keyParts];

  const enabled = typeof opts.enabled !== 'undefined' ? opts.enabled : isAdmin();

  return useQuery({
    queryKey,
    queryFn,
    // enabled,
    staleTime: opts.staleTime ?? defaultStale,
    keepPreviousData: opts.keepPreviousData ?? false,
    refetchOnWindowFocus: opts.refetchOnWindowFocus ?? false,
    ...opts,
  });
}
