// components/home/HowItWorks.tsx
import { Edit, Sliders, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Edit,
    step: "01",
    title: "Paste Your Email",
    description:
      "Simply paste or type your original email content into our editor. No formatting required.",
  },
  {
    icon: Sliders,
    step: "02",
    title: "Choose Your Tone",
    description:
      "Select from professional, friendly, formal, or casual tones to match your communication needs.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get Perfect Results",
    description:
      "Receive your polished, AI-enhanced email instantly. Copy and send with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border-2 mb-6"
            style={{
              backgroundColor: "rgba(217, 125, 85, 0.1)",
              borderColor: "#D97D55",
            }}
          >
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: "#D97D55" }}
            >
              SIMPLE PROCESS
            </span>
          </div>

          <h2
            className="text-5xl mb-4"
            style={{
              color: "#6FA4AF",
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic",
              fontWeight: "600",
            }}
          >
            How It Works
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#948979" }}
          >
            Three simple steps to transform your email communication
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 -z-10">
            <div
              className="h-full mx-[15%]"
              style={{
                background:
                  "linear-gradient(90deg, #D97D55 0%, #6FA4AF 50%, #D97D55 100%)",
                opacity: 0.3,
              }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative group"
                style={{
                  animation: `fade-slide-up 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Step Card */}
                <div
                  className="p-8 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: "rgba(244, 233, 215, 0.6)",
                    borderColor: "#B8C4A9",
                  }}
                >
                  {/* Step Number */}
                  <div
                    className="text-6xl font-bold mb-4 opacity-20"
                    style={{
                      color: "#D97D55",
                      fontFamily: "Playfair Display, Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: "#D97D55",
                      boxShadow: "0 8px 24px rgba(217, 125, 85, 0.3)",
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "#F4E9D7" }} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#6FA4AF" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#948979" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}