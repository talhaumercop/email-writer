'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserId() {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (response.ok && data.id) {
          setUserId(data.id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }

    fetchUserId();
  }, []);

  return (
    <section className="relative z-10 pt-20 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border-2"
              style={{
                backgroundColor: "rgba(217, 125, 85, 0.1)",
                borderColor: "#D97D55",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#D97D55" }} />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: "#D97D55" }}
              >
                AI-POWERED COMMUNICATION
              </span>
            </div>

            <h1
              className="text-6xl md:text-5xl leading-tight"
              style={{
                color: "#6FA4AF",
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontWeight: "600",
              }}
            >
              Transform Your Emails
              <span className="block mt-2" style={{ color: "#D97D55" }}>
                With Intelligence
              </span>
            </h1>

            <p
              className="text-lg md:text-lg leading-relaxed max-w-xl"
              style={{ color: "#948979" ,fontFamily:'monospace'}}
            >
              Elevate your professional communication with AI-powered email
              rewriting. Choose your tone, maintain your message, and make every
              word count.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={userId ? `/home/${userId}` : '/auth/signin'}
                className="group px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                style={{
                  backgroundColor: "#D97D55",
                  color: "#F4E9D7",
                  boxShadow: "0 10px 40px rgba(217, 125, 85, 0.4)",
                }}
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 border-2"
                style={{
                  backgroundColor: "rgba(184, 196, 169, 0.2)",
                  borderColor: "#B8C4A9",
                  color: "#6FA4AF",
                }}
              >
                View Pricing
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#D97D55" }}
                >
                  10K+
                </div>
                <div className="text-sm" style={{ color: "#948979" }}>
                  Active Users
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#D97D55" }}
                >
                  50K+
                </div>
                <div className="text-sm" style={{ color: "#948979" }}>
                  Emails Rewritten
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#D97D55" }}
                >
                  4.9/5
                </div>
                <div className="text-sm" style={{ color: "#948979" }}>
                  User Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in">
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
              style={{ backgroundColor: "#D97D55" }}
            />
            <div
              className="relative rounded-3xl overflow-hidden border-2 shadow-2xl"
              style={{
                borderColor: "#D97D55",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <Image
                src="/hero.jpg"
                alt="Email Rewriter Dashboard"
                width={600}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
}