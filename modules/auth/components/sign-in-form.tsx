"use client";

import { useState, useEffect, useRef } from "react";
import { Chrome, Github, Wand2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 125, 85, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(217, 125, 85, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  async function handleGoogleSignIn() {
    // Server action - you'll need to import signIn from @/auth
    // 'use server'
    await signIn("google")
    console.log("Google sign in");
  }

  async function handleGithubSignIn() {
    // Server action - you'll need to import signIn from @/auth
    // 'use server'
    await signIn("github")
    console.log("Github sign in");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundColor: "#F4E9D7" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, #D97D55 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15 transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, #6FA4AF 0%, transparent 70%)",
          bottom: "10%",
          right: "10%",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />

      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-500"
        style={{
          background: "radial-gradient(circle, #D97D55 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div
        className="relative z-10 w-full max-w-md backdrop-blur-xl rounded-2xl border-2 shadow-2xl opacity-0 animate-fade-in-up"
        style={{
          backgroundColor: "rgba(244, 233, 215, 0.8)",
          borderColor: "#D97D55",
          boxShadow: "0 20px 60px rgba(217, 125, 85, 0.25)",
        }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b-2" style={{ borderColor: "rgba(217, 125, 85, 0.2)" }}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full backdrop-blur-sm border-2" style={{
            backgroundColor: "rgba(217, 125, 85, 0.1)",
            borderColor: "#D97D55"
          }}>
            <Wand2 className="w-4 h-4" style={{ color: "#D97D55" }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: "#D97D55" }}>
              WELCOME BACK
            </span>
          </div>

          <h1
            className="text-4xl mb-3 tracking-tight"
            style={{
              color: "#6FA4AF",
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic",
              fontWeight: "600",
            }}
          >
            Sign In
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#948979" }}>
            Choose your preferred authentication method to continue
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-4">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            onMouseEnter={() => setHoveredButton("google")}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-full px-6 py-4 rounded-xl border-2 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 group"
            style={{
              backgroundColor:
                hoveredButton === "google"
                  ? "rgba(217, 125, 85, 0.15)"
                  : "rgba(255, 255, 255, 0.6)",
              borderColor: hoveredButton === "google" ? "#D97D55" : "#B8C4A9",
              color: hoveredButton === "google" ? "#D97D55" : "#948979",
              boxShadow:
                hoveredButton === "google"
                  ? "0 8px 24px rgba(217, 125, 85, 0.3)"
                  : "0 2px 8px rgba(0, 0, 0, 0.05)",
              transform: hoveredButton === "google" ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* GitHub Sign In */}
          <button
            onClick={handleGithubSignIn}
            onMouseEnter={() => setHoveredButton("github")}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-full px-6 py-4 rounded-xl border-2 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 group"
            style={{
              backgroundColor:
                hoveredButton === "github"
                  ? "rgba(217, 125, 85, 0.15)"
                  : "rgba(255, 255, 255, 0.6)",
              borderColor: hoveredButton === "github" ? "#D97D55" : "#B8C4A9",
              color: hoveredButton === "github" ? "#D97D55" : "#948979",
              boxShadow:
                hoveredButton === "github"
                  ? "0 8px 24px rgba(217, 125, 85, 0.3)"
                  : "0 2px 8px rgba(0, 0, 0, 0.05)",
              transform: hoveredButton === "github" ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div
              className="absolute inset-0 flex items-center"
              style={{ top: "50%" }}
            >
              <div
                className="w-full border-t"
                style={{ borderColor: "rgba(217, 125, 85, 0.2)" }}
              />
            </div>
            <div className="relative flex justify-center text-xs">
              <span
                className="px-4 font-semibold tracking-wide"
                style={{
                  backgroundColor: "rgba(244, 233, 215, 0.9)",
                  color: "#948979",
                }}
              >
                SECURE AUTHENTICATION
              </span>
            </div>
          </div>

          {/* Security Badge */}
          <div
            className="p-4 rounded-lg border text-center"
            style={{
              backgroundColor: "rgba(111, 164, 175, 0.1)",
              borderColor: "rgba(111, 164, 175, 0.3)",
            }}
          >
            <p className="text-xs font-semibold" style={{ color: "#6FA4AF" }}>
              🔒 Your data is encrypted and secure
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-6 border-t-2"
          style={{ borderColor: "rgba(217, 125, 85, 0.2)" }}
        >
          <p
            className="text-xs text-center leading-relaxed"
            style={{ color: "#948979" }}
          >
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="font-semibold transition-colors duration-300"
              style={{ color: "#D97D55" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-semibold transition-colors duration-300"
              style={{ color: "#D97D55" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}