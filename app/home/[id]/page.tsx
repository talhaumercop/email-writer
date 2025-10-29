'use client'
import React, { useState, useEffect, useRef } from "react";
import { Wand2, Copy, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useParams } from 'next/navigation';
import CreditsButton from "@/components/CreditsButton";

// can you please write an email , i want to take a leave for vacation from manager
export default function Page() {
    const params = useParams();
    const pageUserId = params.id as string;
    
    const [text, setText] = useState("");
    const [tone, setTone] = useState("professional");
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
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

        for (let i = 0; i < 80; i++) {
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setResult(null);
        setError(null);

        if (!text.trim()) {
            setError("Please enter some text.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/rewrite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    text, 
                    tone,
                    userId: pageUserId
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                setResult(data.rewritten);
            }
        } catch (err: any) {
            setError(err?.message || "Network error");
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F4E9D7' }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0.6 }}
            />

            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-1000"
                style={{
                    background: 'radial-gradient(circle, #D97D55 0%, transparent 70%)',
                    top: '5%',
                    left: '5%',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15 transition-all duration-1000"
                style={{
                    background: 'radial-gradient(circle, #6FA4AF 0%, transparent 70%)',
                    bottom: '10%',
                    right: '10%',
                    animation: 'float 10s ease-in-out infinite 2s',
                }}
            />

            <div
                className="pointer-events-none fixed w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-500"
                style={{
                    background: 'radial-gradient(circle, #D97D55 0%, transparent 70%)',
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            />
            <Navbar/>
             {/* <CreditsButton/>  */}
            <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                
                <div className="text-center mb-16 opacity-0 animate-fade-in">
                    <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full backdrop-blur-sm border-2" style={{ 
                        backgroundColor: 'rgba(217, 125, 85, 0.1)',
                        borderColor: '#D97D55'
                    }}>
                         
                        <Wand2 className="w-3 h-3" style={{ color: '#D97D55' }} />
                        <span className="text-xs font-semibold tracking-wide" style={{ color: '#D97D55' }}>
                            AI-POWERED WRITING ASSISTANT
                        </span>
                    </div>
                    
                    <h1 className="text-6xl mb-4 tracking-tight" style={{ 
                        color: '#6FA4AF',
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: '600'
                    }}>
                        Email Rewriter
                    </h1>
                    
                    <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#948979' }}>
                        Elevate your professional communication with intelligent tone adaptation
                    </p>
                </div>

                <div className="backdrop-blur-xl rounded-2xl border-2 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(217,125,85,0.2)] opacity-0 animate-slide-up" style={{
                    backgroundColor: 'rgba(244, 233, 215, 0.7)',
                    borderColor: '#D97D55'
                }}>
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold mb-3 tracking-wide flex items-center gap-2" style={{ color: '#6FA4AF' }}>
                                <Wand2 className="w-4 h-4" />
                                ORIGINAL TEXT
                            </label>
                            <div className="relative">
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={8}
                                    placeholder="Enter your email content here..."
                                    className="w-full px-5 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none leading-relaxed"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        borderColor: '#B8C4A9',
                                        color: '#222831',
                                        fontSize: '15px'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#D97D55'}
                                    onBlur={(e) => e.target.style.borderColor = '#B8C4A9'}
                                />
                                <div 
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(217, 125, 85, 0.05) 0%, rgba(111, 164, 175, 0.05) 100%)'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold mb-3 tracking-wide" style={{ color: '#6FA4AF' }}>
                                SELECT TONE
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { value: "professional", label: "Professional" },
                                    { value: "friendly", label: "Friendly" },
                                    { value: "formal", label: "Formal" },
                                    { value: "casual", label: "Casual" },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setTone(option.value)}
                                        className="p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 font-semibold text-sm"
                                        style={{
                                            borderColor: tone === option.value ? '#D97D55' : '#B8C4A9',
                                            backgroundColor: tone === option.value ? 'rgba(217, 125, 85, 0.15)' : 'rgba(184, 196, 169, 0.1)',
                                            color: tone === option.value ? '#D97D55' : '#948979',
                                            boxShadow: tone === option.value ? '0 8px 24px rgba(217, 125, 85, 0.3)' : 'none'
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-4 px-8 rounded-lg font-bold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
                            style={{
                                backgroundColor: '#D97D55',
                                color: '#F4E9D7',
                                boxShadow: '0 10px 40px rgba(217, 125, 85, 0.4)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    <span>PROCESSING...</span>
                                </>
                            ) : (
                                <>
                                    <span>REWRITE EMAIL</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 border-2 rounded-lg backdrop-blur-sm animate-shake" style={{
                            backgroundColor: 'rgba(142, 22, 22, 0.1)',
                            borderColor: 'rgb(216, 64, 64)'
                        }}>
                            <p className="text-center font-semibold text-sm" style={{ color: 'rgb(142, 22, 22)' }}>
                                {error}
                            </p>
                        </div>
                    )}

                    {result && (
                        <div className="mt-8 p-6 border-2 rounded-xl backdrop-blur-sm animate-slide-up" style={{
                            backgroundColor: 'rgba(184, 196, 169, 0.2)',
                            borderColor: '#6FA4AF'
                        }}>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold tracking-tight" style={{ color: '#6FA4AF' }}>
                                    REWRITTEN EMAIL
                                </h2>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group font-semibold text-sm"
                                    style={{
                                        backgroundColor: copied ? 'rgba(184, 196, 169, 0.3)' : 'rgba(217, 125, 85, 0.2)',
                                        color: copied ? '#6FA4AF' : '#D97D55'
                                    }}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>COPIED</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span>COPY</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="rounded-lg p-5 border" style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                borderColor: '#B8C4A9'
                            }}>
                                <p className="whitespace-pre-wrap leading-relaxed" style={{ 
                                    color: '#222831',
                                    fontSize: '15px'
                                }}>
                                    {result}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mt-12 text-xs tracking-wide font-medium" style={{ color: '#948979' }}>
                    POWERED BY ADVANCED AI TECHNOLOGY
                </div>
            </main>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -30px) scale(1.1); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards 0.3s;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}