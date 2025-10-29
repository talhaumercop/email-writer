"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import UserCredits from "@/modules/credits/UserCredit";
import ClaimCredits from "./ClaimCredits";
import CreditsButton from "./CreditsButton";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/billing", label: "Pricing" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl border-b-2"
      style={{
        backgroundColor: "rgba(244, 233, 215, 0.8)",
        borderColor: "#D97D55",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <h2
              className="text-2xl transition-all duration-300 group-hover:scale-105"
              style={{
                color: "#6FA4AF",
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontWeight: "600",
              }}
            >
              Email Rewriter
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* <CreditsButton/> */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  color: isActive(link.href) ? "#D97D55" : "#948979",
                  backgroundColor: isActive(link.href)
                    ? "rgba(217, 125, 85, 0.15)"
                    : "transparent",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: isActive(link.href) ? "#D97D55" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Profile Button */}
            <Link
              href="/profile"
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                color: isActive("/profile") ? "#D97D55" : "#948979",
                backgroundColor: isActive("/profile")
                  ? "rgba(217, 125, 85, 0.15)"
                  : "rgba(184, 196, 169, 0.1)",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: isActive("/profile") ? "#D97D55" : "#B8C4A9",
              }}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
 <UserCredits />
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
              style={{
                backgroundColor: "#D97D55",
                color: "#F4E9D7",
                boxShadow: "0 4px 12px rgba(217, 125, 85, 0.3)",
              }}
            >
             
              <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              backgroundColor: "rgba(217, 125, 85, 0.1)",
              color: "#D97D55",
            }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                style={{
                  color: isActive(link.href) ? "#D97D55" : "#948979",
                  backgroundColor: isActive(link.href)
                    ? "rgba(217, 125, 85, 0.15)"
                    : "rgba(255, 255, 255, 0.3)",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: isActive(link.href) ? "#D97D55" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2"
              style={{
                color: isActive("/profile") ? "#D97D55" : "#948979",
                backgroundColor: isActive("/profile")
                  ? "rgba(217, 125, 85, 0.15)"
                  : "rgba(184, 196, 169, 0.1)",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: isActive("/profile") ? "#D97D55" : "#B8C4A9",
              }}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 justify-center"
              style={{
                backgroundColor: "#D97D55",
                color: "#F4E9D7",
                boxShadow: "0 4px 12px rgba(217, 125, 85, 0.3)",
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}