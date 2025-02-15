'use client';

import { useState, useEffect } from 'react';

export function useNonce() {
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    const metaNonce = document.querySelector('meta[name="csp-nonce"]');
    if (metaNonce) {
      setNonce(metaNonce.getAttribute('content'));
    }
  }, []);

  return nonce;
}