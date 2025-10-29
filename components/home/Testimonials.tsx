// components/home/Testimonials.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "Tech Innovations Inc.",
    content:
      "This tool has completely transformed how our team communicates. The AI understands context perfectly and saves us hours every week.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Sales Manager",
    company: "Global Solutions",
    content:
      "I used to spend so much time crafting the perfect email. Now I can focus on what matters while maintaining professional communication.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emily Watson",
    role: "CEO",
    company: "Creative Studios",
    content:
      "The different tone options are brilliant. Whether it's a formal proposal or friendly check-in, this tool gets it right every time.",
    rating: 5,
    avatar: "EW",
  },
];

export default function Testimonials() {
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
              TESTIMONIALS
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
            Loved by Professionals
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#948979" }}
          >
            See what our users are saying about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="p-8 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300"
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
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: "#D97D55" }}
                    />
                  ))}
                </div>

                {/* Content */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#222831" }}
                >
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t-2" style={{ borderColor: "rgba(217, 125, 85, 0.2)" }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{
                      backgroundColor: "#D97D55",
                      color: "#F4E9D7",
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "#6FA4AF" }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "#948979" }}
                    >
                      {testimonial.role}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "#948979" }}
                    >
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}