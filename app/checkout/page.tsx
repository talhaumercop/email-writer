'use client'

import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
import CheckoutForm from '@/components/CheckoutForm'
import convertToSubcurrency from '@/lib/convertToSubCurrency'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const priceParam = searchParams.get('price')
  const price = priceParam ? parseFloat(priceParam) : NaN
  const amount = !isNaN(price) && price > 0 ? price : 0

  useEffect(() => {
    if (!amount) {
      setError('No price provided. Open /checkout?price=9.99 or select a plan.')
      return
    }

    const createPaymentIntent = async () => {
      try {
        // try to get current user id (include cookies so server can read session)
        let userId: string | undefined
        try {
          const ures = await fetch('/api/user', { credentials: 'include' })
          if (ures.ok) {
            const udata = await ures.json()
            userId = udata.id
          }
        } catch (e) {
          console.warn('Could not fetch user id, proceeding without metadata', e)
        }

        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // send cookies so the server can recognize session
          body: JSON.stringify({
            amount: convertToSubcurrency(amount),
            userId,
            plan: 'PRO',
          }),
        })

        // if server returned HTML (redirected to sign-in or an error page), show it
        const contentType = res.headers.get('content-type') || ''
        if (!res.ok) {
          const text = contentType.includes('application/json') ? await res.json() : await res.text()
          console.error('Payment intent failed:', text)
          setError(typeof text === 'string' ? text : (text?.error || 'Payment initialization failed'))
          return
        }

        if (!contentType.includes('application/json')) {
          const text = await res.text()
          console.error('Expected JSON but got:', text)
          setError('Unexpected server response. Check server logs.')
          return
        }

        const data = await res.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Create payment intent error:', err)
        setError('Network error creating payment intent.')
      }
    }

    createPaymentIntent()
  }, [amount])

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!clientSecret) return <p>Initializing payment…</p>

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-lg mb-6">Total amount: ${amount.toFixed(2)}</p>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: { theme: 'stripe' },
        }}
      >
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  )
}
