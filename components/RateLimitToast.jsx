"use client";

import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function RateLimitToast() {
  const { toast } = useToast();

  useEffect(() => {
    const handleRateLimit = (response) => {
      if (response.status === 429) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Please wait before making more requests.",
          variant: "destructive",
        });
      }
    };

    // Add event listener
    window.addEventListener('rateLimitError', handleRateLimit);

    // Cleanup
    return () => {
      window.removeEventListener('rateLimitError', handleRateLimit);
    };
  }, [toast]);

  return null;
} 