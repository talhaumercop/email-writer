'use client'

import React, { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';

interface UserCreditsProps {
  className?: string;
}

export default function UserCredits({ className = '' }: UserCreditsProps) {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const response = await fetch('/api/user/credits');
        const data = await response.json();
        
        if (response.ok) {
          setCredits(data.credits);
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCredits();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (credits === null) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${className}`}
      style={{
        backgroundColor: 'rgba(217, 125, 85, 0.1)',
        color: '#D97D55',
      }}
    >
      <Coins className="w-4 h-4" />
      <span>{credits} credits</span>
    </div>
  );
}