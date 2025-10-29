'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Check, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const upgraded = searchParams.get('upgraded') === 'true'

  useEffect(() => {
    if (upgraded) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push('/') // or wherever your dashboard is
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [upgraded, router])

  if (!upgraded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Invalid access
          </h1>
          <p className="mt-2 text-gray-600">
            Please complete your payment to access this page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div 
        className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #D97D55'
        }}
      >
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: '#6FA4AF' }}
          >
            Welcome to PRO!
          </h1>
          
          <p 
            className="text-lg mb-6"
            style={{ color: '#948979' }}
          >
            Your account has been successfully upgraded.
          </p>

          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(217, 125, 85, 0.1)' }}
            >
              <h2 className="font-semibold mb-2" style={{ color: '#D97D55' }}>
                What's included:
              </h2>
              <ul className="text-left text-sm space-y-2" style={{ color: '#948979' }}>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: '#D97D55' }} />
                  100 Monthly Credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: '#D97D55' }} />
                  Priority Email Support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: '#D97D55' }} />
                  Advanced Writing Features
                </li>
              </ul>
            </div>

            <div className="text-sm" style={{ color: '#948979' }}>
              Redirecting to dashboard in {countdown} seconds...
            </div>

            <button
              onClick={() => router.push('/home')}
              className="group w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#D97D55',
                color: '#F4E9D7',
              }}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}