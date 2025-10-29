'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from "@/lib/db";

export async function checkAndRefreshCredits(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return null;
  const now = new Date();
  const lastUpdate = user.lastCreditUpdate ? new Date(user.lastCreditUpdate) : new Date(0);
  // Always 24 hours for both plans, but different amounts
  const dailyInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const creditAmount = user.plan === "PRO" ? 100 : 10;

  // Check if 24 hours have passed
  const canClaim = now.getTime() - lastUpdate.getTime() >= dailyInterval;

  return {
    user,
    canClaim,
    nextClaimTime: new Date(lastUpdate.getTime() + dailyInterval),
    creditAmount
  };
}

export async function claimDailyCredits(userId: string) {
  const check = await checkAndRefreshCredits(userId);
  if (!check || !check.canClaim) return null;

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      lastCreditUpdate: new Date(),
      credits: { increment: check.creditAmount },
    }
  });

  return updatedUser;
}

export default function ClaimCredits({ userId }: { userId: string }) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [canClaim, setCanClaim] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkClaimStatus = async () => {
      const res = await fetch('/api/credits/check');
      const data = await res.json();
      
      if (data.canClaim) {
        setCanClaim(true);
        setTimeLeft('');
      } else {
        setCanClaim(false);
        updateCountdown(new Date(data.nextClaimTime));
      }
    };

    // Check initially
    checkClaimStatus();

    // Update every minute
    const interval = setInterval(checkClaimStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateCountdown = (nextClaimTime: Date) => {
    const now = new Date().getTime();
    const distance = nextClaimTime.getTime() - now;
    
    if (distance <= 0) {
      setCanClaim(true);
      setTimeLeft('');
      return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    setTimeLeft(`${hours}h ${minutes}m`);
  };

  const handleClaim = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/credits/claim', {
        method: 'POST',
      });
      
      if (!res.ok) throw new Error('Failed to claim');
      
      // Refresh the page to show new credits
      router.refresh();
      setCanClaim(false);
    } catch (error) {
      console.error('Failed to claim credits:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Daily Credits</h3>
      {timeLeft ? (
        <p className="text-sm text-gray-600 mb-2">
          Next claim available in: {timeLeft}
        </p>
      ) : null}
      <button
        onClick={handleClaim}
        disabled={!canClaim || loading}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors
          ${canClaim 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
      >
        {loading ? 'Claiming...' : canClaim ? 'Claim Daily Credits' : 'Not Available'}
      </button>
    </div>
  );
}