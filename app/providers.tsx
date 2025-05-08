// app/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider
      refetchInterval={60 * 60} // Refresh session every hour
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}