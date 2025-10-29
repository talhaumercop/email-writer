// components/home/Features.tsx
"use client";

import { Wand2, Zap, Shield, Target } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Rewriting",
    description:
      "Advanced language models understand context and intent to transform your emails while preserving your message.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get professional rewrites in seconds. No more struggling with the right words or perfect tone.",
  },
  {
    icon: Target,
    title: "Multiple Tones",
    description:
      "Choose from professional, friendly, formal, or casual tones to match any situation perfectly.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your emails are processed securely and never stored. Complete privacy and data protection guaranteed.",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border-2 mb-6"
            style={{
              backgroundColor: "rgba(111, 164, 175, 0.1)",
              borderColor: "#6FA4AF",
            }}
          >
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: "#6FA4AF" }}
            >
              POWERFUL FEATURES
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
            Everything You Need
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#948979" }}
          >
            Powerful features designed to make your email communication
            effortless and effective
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(217, 125, 85, 0.1)"
                    : "rgba(244, 233, 215, 0.6)",
                  borderColor: isHovered ? "#D97D55" : "#B8C4A9",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 12px 32px rgba(217, 125, 85, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    backgroundColor: isHovered
                      ? "#D97D55"
                      : "rgba(217, 125, 85, 0.2)",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: isHovered ? "#F4E9D7" : "#D97D55" }}
                  />
                </div>

                <h3
                  className="text-lg font-bold mb-2 transition-colors duration-300"
                  style={{ color: isHovered ? "#D97D55" : "#6FA4AF" }}
                >
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "#948979" }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}