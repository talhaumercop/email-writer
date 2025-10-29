// components/home/Footer.tsx
import Link from "next/link";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:support@emailrewriter.com", label: "Email" },
  ];

  return (
    <footer
      className="relative z-10 border-t-2 backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(244, 233, 215, 0.9)",
        borderColor: "rgba(217, 125, 85, 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3
              className="text-3xl mb-4"
              style={{
                color: "#6FA4AF",
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontWeight: "600",
              }}
            >
              Email Rewriter
            </h3>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: "#948979" }}
            >
              Transform your professional communication with AI-powered email
              rewriting. Intelligent, fast, and secure.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: "rgba(217, 125, 85, 0.1)",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "#B8C4A9",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#D97D55";
                      e.currentTarget.style.borderColor = "#D97D55";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(217, 125, 85, 0.1)";
                      e.currentTarget.style.borderColor = "#B8C4A9";
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#6FA4AF" }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4
              className="text-sm font-bold mb-4 tracking-wide"
              style={{ color: "#6FA4AF" }}
            >
              PRODUCT
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "#948979" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#948979")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="text-sm font-bold mb-4 tracking-wide"
              style={{ color: "#6FA4AF" }}
            >
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "#948979" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#948979")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4
              className="text-sm font-bold mb-4 tracking-wide"
              style={{ color: "#6FA4AF" }}
            >
              LEGAL
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "#948979" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#948979")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t-2 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(217, 125, 85, 0.2)" }}
        >
          <p className="text-xs" style={{ color: "#948979" }}>
            © {currentYear} Email Rewriter. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#948979" }}>
            Made with intelligence and care
          </p>
        </div>
      </div>
    </footer>
  );
}