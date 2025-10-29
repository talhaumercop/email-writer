'use client'

import Link from 'next/link'

export default function PricingPage() {
  const proPrice = 9.99

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Choose a plan</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="p-6 rounded-xl border bg-white shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Free</h2>
            <p className="text-lg text-gray-600 mb-4">$0 / month</p>
            <ul className="text-sm text-gray-500 mb-6 space-y-2">
              <li>10 credits / month</li>
              <li>Basic email rewrite</li>
              <li>Community support</li>
            </ul>

            <Link
              href="/"
              className="inline-block px-5 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium"
            >
              Continue with Free
            </Link>
          </section>

          <section className="p-6 rounded-xl border-2 border-yellow-400 bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Pro</h2>
            <p className="text-lg text-gray-800 mb-4 font-bold">${proPrice} / month</p>
            <ul className="text-sm text-gray-500 mb-6 space-y-2">
              <li>100 credits / month</li>
              <li>Priority rewriting</li>
              <li>Premium support</li>
            </ul>

            <Link
              href={`/checkout?price=${encodeURIComponent(proPrice)}`}
              className="inline-block px-5 py-3 rounded-lg bg-yellow-500 text-white font-medium shadow hover:bg-yellow-600 transition"
            >
              Select Pro
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}