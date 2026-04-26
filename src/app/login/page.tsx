"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [stage, setStage] = useState(0);

  const stages = [
    "Verifying credentials...",
    "Consulting the crickets...",
    "Warming up the generators...",
    "Loading pyrotechnics...",
    "Checking Sprinter van GPS...",
    "Confirming Italian heritage...",
    "Access granted! 🎆",
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setStage(0);

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage >= stages.length) {
        clearInterval(interval);
        setTimeout(() => router.push("/dashboard"), 400);
      } else {
        setStage(currentStage);
      }
    }, 600);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-900 to-blue-950 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          >
            {["🦗", "⚡", "🎆", "🔥", "🚐"][i % 5]}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">🦗 Cricket Hill</h1>
          <p className="text-white/60">Client Portal — Authorized Personnel Only*</p>
          <p className="text-white/30 text-xs mt-1">*Anyone, really</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {!loggingIn ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-bold mb-2">
                  Email / Username / Nickname / Whatever
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="literally anything works"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-bold mb-2">
                  Password (We Don&rsquo;t Check)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="type whatever you want"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-extrabold text-lg py-3 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
              >
                🔐 Log In (Trust Us)
              </button>
              <p className="text-center text-white/30 text-xs">
                By logging in you agree to receive firework shows at random hours.
                <br />
                Forgot password? It doesn&rsquo;t matter. Just type something.
              </p>
            </form>
          ) : (
            <div className="py-8 space-y-4">
              {stages.map((text, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    i <= stage ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                >
                  <span
                    className={`text-xl ${
                      i < stage
                        ? "text-green-400"
                        : i === stage
                          ? "animate-spin text-yellow-400"
                          : "text-white/20"
                    }`}
                  >
                    {i < stage ? "✅" : i === stage ? "⏳" : "⬜"}
                  </span>
                  <span
                    className={`text-white ${
                      i <= stage ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-white/40 text-sm hover:text-white/70 transition-colors">
            ← Back to Cricket Hill
          </a>
        </div>
      </div>
    </main>
  );
}
