// components/home/CTA.tsx
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative rounded-3xl border-2 p-12 md:p-16 text-center backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: "rgba(217, 125, 85, 0.1)",
            borderColor: "#D97D55",
            boxShadow: "0 20px 60px rgba(217, 125, 85, 0.3)",
          }}
        >
          {/* Background Gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #D97D55 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border-2 mb-6"
              style={{
                backgroundColor: "rgba(244, 233, 215, 0.8)",
                borderColor: "#D97D55",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#D97D55" }} />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: "#D97D55" }}
              >
                START TODAY
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{
                color: "#6FA4AF",
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontWeight: "600",
              }}
            >
              Ready to Transform Your Emails?
            </h2>

            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: "#948979" }}
            >
              Join thousands of professionals who have already elevated their
              communication. Start rewriting smarter, not harder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/home"
                className="group px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                style={{
                  backgroundColor: "#D97D55",
                  color: "#F4E9D7",
                  boxShadow: "0 10px 40px rgba(217, 125, 85, 0.4)",
                }}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 border-2"
                style={{
                  backgroundColor: "rgba(244, 233, 215, 0.8)",
                  borderColor: "#B8C4A9",
                  color: "#6FA4AF",
                }}
              >
                View Plans
              </Link>
            </div>

            <p
              className="text-xs mt-6"
              style={{ color: "#948979" }}
            >
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}