"use client";

import { useState, useEffect } from "react";

/* ── tiny helpers ── */
const emojis = ["🎆", "🎇", "✨", "💥", "⚡", "🔥", "🦗", "🏔️", "🎵", "🎶"];

function RandomEmoji({ className = "" }: { className?: string }) {
  const [emoji, setEmoji] = useState("✨");
  useEffect(() => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  }, []);
  return <span className={className}>{emoji}</span>;
}

/* ── Firework burst SVG ── */
function FireworkBurst({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 100 + Math.cos(angle) * 80;
        const y2 = 100 + Math.sin(angle) * 80;
        const colors = [
          "#FF6B6B",
          "#FECA57",
          "#48DBFB",
          "#FF9FF3",
          "#54A0FF",
          "#5F27CD",
          "#01A3A4",
          "#F368E0",
          "#FF6348",
          "#2ED573",
          "#FFA502",
          "#70A1FF",
        ];
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke={colors[i]}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="100" cy="100" r="8" fill="#FECA57" />
    </svg>
  );
}

/* ── Service Card ── */
function ServiceCard({
  icon,
  title,
  description,
  color,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay: string;
}) {
  return (
    <div
      className={`relative rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 hover:rotate-1 ${color}`}
      style={{ animationDelay: delay }}
    >
      <div className="text-6xl mb-4 animate-float">{icon}</div>
      <h3 className="text-2xl font-extrabold mb-3">{title}</h3>
      <p className="text-lg opacity-90 leading-relaxed">{description}</p>
      <div className="absolute -top-3 -right-3 text-3xl animate-sparkle">
        <RandomEmoji />
      </div>
    </div>
  );
}

/* ── Testimonial ── */
function Testimonial({
  quote,
  name,
  detail,
}: {
  quote: string;
  name: string;
  detail: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <p className="text-xl italic text-white/90 mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-2">
        <span className="text-2xl">
          <RandomEmoji />
        </span>
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm text-white/60">{detail}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
/* ── Steve Quote of the Day ── */
const STEVE_QUOTES = [
  "I'm in the business of people, places, and things.",
  "I'm just gonna run to Home Depot real quick.",
  "That's not a generator problem, that's a mindset problem.",
  "In the SEALs we had a saying... actually I can't tell you.",
  "I'll be there in 10 minutes. (45 minutes ago)",
  "Fireworks aren't dangerous if you believe in yourself.",
  "The van knows the way. I just drive.",
  "My nonna would've loved this generator.",
  "That's Italian craftsmanship right there. (Points at Chinese-made generator)",
  "The customer is always right, but Steve is never wrong.",
  "Every explosion tells a story.",
  "I don't do estimates. I do promises. Loosely.",
  "Two vans is a fleet. Look it up.",
  "SEAL training prepared me for everything except HOA meetings.",
];

function SteveQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(STEVE_QUOTES[Math.floor(Math.random() * STEVE_QUOTES.length)]);
  }, []);

  if (!quote) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-xs bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/20">
      <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">
        💬 Steve Quote of the Day
      </div>
      <div className="text-white text-sm italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </div>
      <div className="text-white/30 text-xs mt-2 text-right">— Steve</div>
    </div>
  );
}

/* ── Waddle Dees walking along the bottom ── */
function WaddleDees() {
  const [dees, setDees] = useState<
    { id: number; speed: number; delay: number; flip: boolean; y: number }[]
  >([]);

  useEffect(() => {
    const group = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      speed: 18 + Math.random() * 14, // 18-32s to cross
      delay: Math.random() * -30, // staggered starts
      flip: Math.random() > 0.3, // most go left-to-right
      y: Math.random() * 16, // slight vertical variance
    }));
    setDees(group);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-16 pointer-events-none overflow-hidden">
      {dees.map((dee) => (
        <div
          key={dee.id}
          className="absolute bottom-0"
          style={{
            animation: `${dee.flip ? "waddleWalkRight" : "waddleWalkLeft"} ${dee.speed}s linear infinite`,
            animationDelay: `${dee.delay}s`,
            bottom: `${dee.y}px`,
          }}
        >
          <svg
            width="28"
            height="32"
            viewBox="0 0 28 32"
            className="animate-waddleBob"
            style={{
              animationDelay: `${dee.delay}s`,
              transform: dee.flip ? "scaleX(1)" : "scaleX(-1)",
            }}
          >
            {/* Body (orange/tan) */}
            <ellipse cx="14" cy="20" rx="10" ry="11" fill="#E87830" />
            {/* Face (cream) */}
            <ellipse cx="14" cy="17" rx="8" ry="8" fill="#FFF0D0" />
            {/* Eyes */}
            <ellipse cx="11" cy="15" rx="1.5" ry="2" fill="#301800" />
            <ellipse cx="17" cy="15" rx="1.5" ry="2" fill="#301800" />
            {/* Blush */}
            <ellipse cx="8" cy="18" rx="2.5" ry="1.5" fill="#F09080" opacity="0.6" />
            <ellipse cx="20" cy="18" rx="2.5" ry="1.5" fill="#F09080" opacity="0.6" />
            {/* Mouth */}
            <ellipse cx="14" cy="20" rx="1" ry="0.5" fill="#301800" />
            {/* Feet */}
            <ellipse cx="10" cy="30" rx="3.5" ry="2" fill="#E04020" />
            <ellipse cx="18" cy="30" rx="3.5" ry="2" fill="#E04020" />
            {/* Head bandana/top */}
            <ellipse cx="14" cy="9" rx="6" ry="4" fill="#E87830" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function VisitorCounter() {
  const [visitorNum, setVisitorNum] = useState(0);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    const num = Math.floor(Math.random() * 14000) + 1;
    setVisitorNum(num);
    if (num === 10000) setIsWinner(true);
  }, []);

  if (visitorNum === 0) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 rounded-2xl px-5 py-3 shadow-2xl border text-sm max-w-xs ${
      isWinner
        ? "bg-yellow-400 border-yellow-300 text-purple-900 animate-bounce"
        : "bg-white/10 backdrop-blur-xl border-white/20 text-white/70"
    }`}>
      {isWinner ? (
        <div>
          <div className="font-black text-lg">🎉 CONGRATULATIONS! 🎉</div>
          <div className="font-bold">
            You are visitor #10,000!
          </div>
          <div className="mt-1 text-purple-800">
            You&rsquo;ve won a FREE* Mercedes Sprinter Van!
          </div>
          <div className="text-xs mt-2 text-purple-700/70">
            *$0.50/mile usage fee applies. Pickup required. Van may or may not
            exist. Steve will be late to the handoff. No refunds on a free van.
          </div>
        </div>
      ) : (
        <div>
          You are visitor <span className="font-black text-yellow-400">#{visitorNum.toLocaleString()}</span>
          {visitorNum > 9900 && visitorNum < 10000 && (
            <div className="text-xs text-white/50 mt-1">
              🚐 Visitor #10,000 wins a FREE Sprinter Van! You&rsquo;re so close!
            </div>
          )}
          {visitorNum > 10000 && (
            <div className="text-xs text-white/50 mt-1">
              🚐 Visitor #10,000 already won the free Sprinter Van. Sorry!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [showBoom, setShowBoom] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <VisitorCounter />
      <SteveQuote />
      <WaddleDees />
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-purple-900 via-pink-700 to-orange-500 animate-gradient">
        {/* floating decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-4xl md:text-6xl opacity-30"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              {emojis[i % emojis.length]}
            </div>
          ))}
        </div>

        <FireworkBurst className="w-32 h-32 md:w-48 md:h-48 animate-boom mb-6" />

        <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-lg mb-4 tracking-tight">
          🦗 Cricket Hill
        </h1>
        <p className="text-xl md:text-3xl text-yellow-200 font-bold mb-2">
          Generators &bull; Fireworks &bull; Vibes
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
          We install home generators. We choreograph firework shows to music.
          We deliver the goods. Don&rsquo;t ask too many questions.
        </p>

        <button
          className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-extrabold text-xl px-10 py-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cursor-pointer"
          onClick={() => setShowBoom(true)}
        >
          {showBoom ? "💥 BOOM! We'll Be In Touch 💥" : "🎆 Get a Free Quote"}
        </button>

        <a
          href="/login"
          className="mt-4 text-white/50 hover:text-white/80 text-sm underline underline-offset-4 transition-colors"
        >
          🔐 Client Portal Login
        </a>

        <div className="absolute bottom-8 animate-bounce text-white text-3xl">
          ↓
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-900 to-purple-900">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-4">
          What We <span className="text-yellow-400">Do</span>{" "}
          <span className="text-sm font-normal text-white/50">
            (roughly speaking)
          </span>
        </h2>
        <p className="text-center text-white/60 mb-16 text-lg max-w-xl mx-auto">
          Our services are best described as &ldquo;you&rsquo;ll know it when you see
          it.&rdquo; But here&rsquo;s our best attempt at an explanation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard
            icon="⚡"
            title="Home Generators"
            description="Power goes out? Not your problem anymore. We'll install a generator so beefy your neighbors will think you're running a small power plant. Consultation, installation, the whole nine yards."
            color="bg-gradient-to-br from-emerald-500 to-teal-700"
            delay="0s"
          />
          <ServiceCard
            icon="🎆"
            title="Musical Firework Shows"
            description="Imagine your favorite song. Now imagine it EXPLODING across the sky in synchronized color. That's what we do. Weddings, birthdays, gender reveals that won't start a wildfire (hopefully)."
            color="bg-gradient-to-br from-pink-500 to-red-700"
            delay="0.2s"
          />
          <ServiceCard
            icon="🚚"
            title="Shipping & Delivery"
            description="We bring the things to the places. Generators, pyrotechnics, and whatever else falls under our mysterious umbrella of services. If it's heavy and/or explosive, we'll move it."
            color="bg-gradient-to-br from-orange-500 to-amber-700"
            delay="0.4s"
          />
          <ServiceCard
            icon="🔧"
            title="Generator Repair"
            description="Your generator sounds like a dying robot? We'll fix it. We speak fluent generator. Weird noises, error codes, that funky smell — bring it all to us."
            color="bg-gradient-to-br from-blue-500 to-indigo-700"
            delay="0.6s"
          />
          <ServiceCard
            icon="🎵"
            title="Show Choreography"
            description="We don't just light fuses and hope for the best. Every burst, crackle, and boom is timed to the beat. It's basically a concert, except the instruments are on fire."
            color="bg-gradient-to-br from-violet-500 to-purple-700"
            delay="0.8s"
          />
          <ServiceCard
            icon="🤷"
            title="Other... Stuff?"
            description="Honestly, even we're not 100% sure of everything we do. But if it involves electricity, explosions, or logistics — there's a decent chance we can help. Just ask."
            color="bg-gradient-to-br from-rose-500 to-pink-700"
            delay="1s"
          />
        </div>
      </section>

      {/* ── MEET STEVE ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-900 via-blue-800 to-purple-900">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-16">
          Meet <span className="text-green-300">Steve</span> 🤌
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative flex-shrink-0">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400 transform rotate-2 hover:rotate-0 transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/steve.png"
                alt="Steve — Founder of Cricket Hill"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white font-extrabold text-lg px-4 py-2 rounded-full shadow-lg transform rotate-6">
              🇮🇹 Italian™
            </div>
            <div className="absolute -top-4 -left-4 text-5xl animate-float">
              🤌
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-white mb-4">
              Steve, Founder & Chief Everything Officer
            </h3>
            <p className="text-xl text-white/80 mb-4 leading-relaxed">
              Steve is the heart, soul, and mysterious driving force behind
              Cricket Hill. He claims to be Italian — we have not verified
              this, but he says it with great confidence, so who are we to
              argue?
            </p>
            <p className="text-xl text-white/80 mb-4 leading-relaxed">
              When he&rsquo;s not wiring generators or choreographing
              explosions, Steve is drawing on his background as a{" "}
              <span className="text-red-300 font-bold">Navy SEAL</span>.
              Yes, really. The man who delivers fireworks in a Sprinter van
              is also trained in advanced military operations. He&rsquo;s
              extremely into SEAL culture — the gear, the mindset, the
              discipline. He also loves actual seals. The animals. He
              thinks they&rsquo;re neat.
            </p>
            <p className="text-xl text-white/80 mb-4 leading-relaxed">
              Steve operates on what he calls{" "}
              <span className="text-cyan-300 font-bold italic">
                &ldquo;Strategic Arrival Timing&rdquo;
              </span>
              — arriving fashionably (and consistently) late to every job.
              This isn&rsquo;t a flaw. It&rsquo;s a feature. It builds
              anticipation. It creates buzz. By the time Steve pulls up in
              one of his{" "}
              <span className="text-yellow-300 font-bold">
                two Mercedes Sprinter vans
              </span>
              , you&rsquo;re so relieved he showed up at all that the
              experience feels transcendent. Genius, really.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white font-bold">
                🚐 2x Sprinter Vans
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white font-bold">
                🇮🇹 &ldquo;Italian&rdquo;
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white font-bold">
                🎖️ Navy SEAL
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white font-bold">
                🦭 Seal Enthusiast
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white font-bold">
                ⚡ Generator Whisperer
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white font-bold">
                🎆 Pyro Artist
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CRICKET HILL ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900 via-fuchsia-800 to-rose-700">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-16">
          Why <span className="text-lime-300">Cricket Hill</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-7xl mb-4 animate-float">🦗</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              The Name?
            </h3>
            <p className="text-white/70 text-lg">
              Don&rsquo;t worry about it. It&rsquo;s a vibe, not a mission
              statement.
            </p>
          </div>
          <div className="text-center">
            <div className="text-7xl mb-4 animate-float" style={{ animationDelay: "1s" }}>
              💪
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Reliable
            </h3>
            <p className="text-white/70 text-lg">
              Our generators keep the lights on. Our fireworks keep the party
              going. Our deliveries show up. Usually.
            </p>
          </div>
          <div className="text-center">
            <div className="text-7xl mb-4 animate-float" style={{ animationDelay: "2s" }}>
              🎨
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Creative
            </h3>
            <p className="text-white/70 text-lg">
              Every firework show is a custom masterpiece. Every generator
              install is... well, it&rsquo;s an install. But we do it with
              flair.
            </p>
          </div>
          <div className="text-center">
            <div className="text-7xl mb-4 animate-float" style={{ animationDelay: "3s" }}>
              🤝
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Trustworthy
            </h3>
            <p className="text-white/70 text-lg">
              We may be vague about what we do, but we&rsquo;re very specific
              about doing it well.
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-rose-700 to-amber-600">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-4">
          Happy <span className="text-purple-200">Customers</span>
        </h2>
        <p className="text-center text-white/60 mb-16 text-lg">
          Real quotes from real people. Probably.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Testimonial
            quote="They installed my generator and then blew up my son's birthday party. In a good way. The fireworks were incredible."
            name="Debra M."
            detail="Generator + Fireworks Combo Client"
          />
          <Testimonial
            quote="I still don't fully understand what they delivered to my house but it works great and my power hasn't gone out since."
            name="Tom R."
            detail="Generator Client (Confused But Satisfied)"
          />
          <Testimonial
            quote="The firework show at our wedding was synchronized to 'Free Bird' and it was the most beautiful 9 minutes of my life."
            name="Jake & Amy S."
            detail="Wedding Pyrotechnics Client"
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-600 to-yellow-500 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-purple-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-purple-800/80 max-w-xl mx-auto mb-8">
          Whether you need backup power, a sky full of synchronized explosions,
          or something delivered somewhere — Cricket Hill is your people.
        </p>
        <a
          href="mailto:hello@crickethill.com"
          className="inline-block bg-purple-900 hover:bg-purple-800 text-yellow-300 font-extrabold text-xl px-12 py-5 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-200"
        >
          📧 Contact Us (If You Dare)
        </a>
        <p className="mt-4 text-purple-900/50 text-sm">
          Disclaimer: Cricket Hill is not responsible for excessive
          neighborhood envy, spontaneous dance parties during firework shows,
          or the existential question of &ldquo;what exactly do they do?&rdquo;
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-purple-950 text-white/50 py-8 px-4 text-center">
        <div className="text-3xl mb-4">
          🦗🏔️⚡🎆🎵
        </div>
        <p className="font-bold text-white/80 text-lg">
          Cricket Hill
        </p>
        <p className="text-sm mt-1">
          Generators &bull; Fireworks &bull; Delivery &bull; Miscellaneous
        </p>
        <a
          href="/login"
          className="inline-block mt-4 text-white/40 hover:text-white/70 text-sm transition-colors underline underline-offset-4"
        >
          🔐 Client Portal
        </a>
        <p className="text-xs mt-4 text-white/30">
          © {new Date().getFullYear()} Cricket Hill. All rights reserved. Services subject to
          interpretation.
        </p>
      </footer>
    </main>
  );
}
