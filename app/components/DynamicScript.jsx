'use client';

import { useNonce } from '@/hooks/use-nonce';

export function DynamicScript({ children }) {
  const nonce = useNonce();
  
  return (
    <script nonce={nonce}>
      {children}
    </script>
  );
}