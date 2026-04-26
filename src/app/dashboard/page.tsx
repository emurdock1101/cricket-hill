"use client";

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════
   NONSENSICAL DATA GENERATORS
   ═══════════════════════════════════════════ */

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const CRICKET_NAMES = [
  "Jiminy", "Cricket McFace", "Sir Chirps-a-Lot", "Buzz Lighthop",
  "The Hopper", "Chirpy McGee", "Antennae Johnson", "Legs Benedict",
];

const GENERATOR_BRANDS = [
  "ThunderVolt 9000", "MegaWatt Deluxe", "The Quiet Storm™",
  "GenZilla Pro", "PowerChungus XL", "ElectroVibes 3000",
  "Watt's Up Doc", "Current Affairs™",
];

const FIREWORK_TYPES = [
  "Sparkle Cascade", "The Big Kahuna", "Glitter Bomb Supreme",
  "Chromatic Chaos", "Golden Shower of Stars", "Purple Reign",
  "Neon Nightmare (Deluxe)", "Steve's Signature Boom™",
];

const DELIVERY_STATUSES = [
  "In Transit (Van #1)", "In Transit (Van #2)",
  "Steve is eating lunch", "Stuck in traffic (vibing)",
  "GPS says 10 min (it's been 2 hours)", "Delivered (maybe)",
  "Van broke down (generator ironically dead)", "Rerouted through Italy",
];

const COMPLAINTS = [
  "Fireworks scared my cat into the neighbor's yard",
  "Generator is louder than promised but I kind of like it",
  "Steve showed up in a tuxedo???",
  "The 'musical firework show' was just Free Bird on repeat",
  "My HOA is asking questions I can't answer",
  "Delivered to wrong address but they loved it",
  "Generator started playing music on its own at 3am",
  "Steve ate all my leftovers during the install",
];

const MUSIC_CHOICES = [
  "Free Bird — Lynyrd Skynyrd",
  "Thunderstruck — AC/DC",
  "Firework — Katy Perry (obviously)",
  "Bohemian Rhapsody — Queen",
  "Eye of the Tiger — Survivor",
  "Baby Shark (client's kid chose)",
  "Never Gonna Give You Up — Rick Astley",
  "Flight of the Bumblebee — Rimsky-Korsakov",
];

/* ═══════════════════════════════════════════
   ANIMATED STAT CARD
   ═══════════════════════════════════════════ */

function StatCard({
  icon,
  label,
  value,
  unit,
  color,
  wiggle,
}: {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
  wiggle?: boolean;
}) {
  return (
    <div
      className={`${color} rounded-2xl p-5 shadow-xl transform transition-all duration-300 hover:scale-110 hover:-rotate-2 ${
        wiggle ? "animate-wiggle" : ""
      }`}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-white/60 text-sm font-bold">{label}</div>
      <div className="text-white text-2xl font-black">
        {value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FAKE CHART (pure CSS bars)
   ═══════════════════════════════════════════ */

function FakeBarChart({ title, bars }: { title: string; bars: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {bars.map((bar, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm text-white/60 mb-1">
              <span>{bar.label}</span>
              <span>{bar.value}</span>
            </div>
            <div className="h-6 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${bar.color} rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: `${(bar.value / max) * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LIVE TICKER
   ═══════════════════════════════════════════ */

function LiveTicker() {
  const [events, setEvents] = useState<string[]>([]);

  const generateEvent = useCallback(() => {
    const templates = [
      `🦗 Cricket #${rand(1, 9999)} reported for duty`,
      `⚡ ${pickRandom(GENERATOR_BRANDS)} installed at ${rand(100, 999)} ${pickRandom(["Oak", "Elm", "Maple", "Firework", "Generator"])} St`,
      `🎆 ${pickRandom(FIREWORK_TYPES)} launched successfully`,
      `🚐 Sprinter Van #${rand(1, 2)} is ${pickRandom(["refueling", "lost", "vibing", "en route", "parked at Olive Garden"])}`,
      `📦 Delivery ${pickRandom(DELIVERY_STATUSES)}`,
      `🎵 Show choreographed to "${pickRandom(MUSIC_CHOICES)}"`,
      `🤌 Steve just said "mamma mia" (${rand(1, 47)}th time today)`,
      `📊 Revenue increased by ${rand(-200, 500)}% (do not verify)`,
      `🔧 Generator ${pickRandom(["whispering", "humming", "screaming", "singing opera", "making coffee sounds"])}`,
      `🇮🇹 Italian-ness quotient: ${rand(60, 200)}%`,
    ];
    return pickRandom(templates);
  }, []);

  useEffect(() => {
    setEvents([generateEvent(), generateEvent(), generateEvent()]);
    const interval = setInterval(() => {
      setEvents((prev) => [generateEvent(), ...prev.slice(0, 7)]);
    }, 2500);
    return () => clearInterval(interval);
  }, [generateEvent]);

  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        Live Activity Feed
      </h3>
      <div className="space-y-2 max-h-64 overflow-hidden">
        {events.map((event, i) => (
          <div
            key={`${event}-${i}`}
            className={`text-sm text-white/70 py-2 px-3 rounded-lg bg-white/5 transition-all duration-500 ${
              i === 0 ? "animate-slideIn border-l-2 border-yellow-400" : ""
            }`}
          >
            <span className="text-white/30 text-xs mr-2">
              {new Date().toLocaleTimeString()}
            </span>
            {event}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CRICKET COUNTER (the important one)
   ═══════════════════════════════════════════ */

function CricketCounter() {
  const [count, setCount] = useState(rand(10000, 99999));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + rand(-3, 7));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-8 text-center shadow-2xl border-2 border-green-400/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute text-4xl animate-float opacity-20"
            style={{
              top: `${rand(10, 80)}%`,
              left: `${rand(5, 90)}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            🦗
          </span>
        ))}
      </div>
      <div className="relative z-10">
        <div className="text-white/60 text-sm font-bold uppercase tracking-widest">
          Active Crickets on The Hill
        </div>
        <div className="text-6xl font-black text-white my-4 tabular-nums animate-pulse">
          {count.toLocaleString()}
        </div>
        <div className="text-white/40 text-xs">
          Updated every second • May not reflect actual crickets • Definitely not real
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SPINNING STEVE APPROVAL WIDGET
   ═══════════════════════════════════════════ */

function SteveApproval() {
  const [rotation, setRotation] = useState(0);
  const [approved, setApproved] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
      <h3 className="text-lg font-bold text-white mb-4">
        Steve&rsquo;s Approval Rating
      </h3>
      <div
        className="inline-block cursor-pointer transition-transform duration-300"
        style={{ transform: `rotate(${rotation}deg) scale(${approved ? 1.3 : 1})` }}
        onClick={() => {
          setRotation((r) => r + 360);
          setApproved(true);
          setTimeout(() => setApproved(false), 2000);
        }}
      >
        <div className="text-8xl mb-2">{approved ? "🤌" : "👨‍🔧"}</div>
      </div>
      <div className="text-3xl font-black text-yellow-400 mt-2">
        {approved ? "APPROVED! 🎆" : `${rand(97, 100)}%`}
      </div>
      <p className="text-white/40 text-xs mt-2">
        Click Steve to request approval • Results are final • No appeals
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BOUNCING EMOJI RAIN
   ═══════════════════════════════════════════ */

function EmojiRain() {
  const [emojis, setEmojis] = useState<{ id: number; emoji: string; left: number; delay: number }[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: pickRandom(["🎆", "🎇", "⚡", "🦗", "🔥", "✨", "💥", "🚐", "🤌", "🇮🇹"]),
      left: rand(0, 95),
      delay: rand(0, 50) / 10,
    }));
    setEmojis(initial);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {emojis.map((e) => (
        <div
          key={e.id}
          className="absolute text-2xl animate-rain"
          style={{
            left: `${e.left}%`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${4 + rand(0, 40) / 10}s`,
          }}
        >
          {e.emoji}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   RECENT ORDERS TABLE
   ═══════════════════════════════════════════ */

function RecentOrders() {
  const orders = Array.from({ length: 6 }, (_, i) => ({
    id: `CH-${rand(1000, 9999)}`,
    customer: pickRandom(CRICKET_NAMES),
    item: pickRandom([...GENERATOR_BRANDS, ...FIREWORK_TYPES]),
    status: pickRandom(DELIVERY_STATUSES),
    amount: `$${rand(50, 50000).toLocaleString()}.${rand(0, 99).toString().padStart(2, "0")}`,
  }));

  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 overflow-x-auto">
      <h3 className="text-lg font-bold text-white mb-4">📋 Recent Orders</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-white/40 border-b border-white/10">
            <th className="text-left py-2 px-2">Order</th>
            <th className="text-left py-2 px-2">Customer</th>
            <th className="text-left py-2 px-2">Item</th>
            <th className="text-left py-2 px-2">Status</th>
            <th className="text-right py-2 px-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={i}
              className="border-b border-white/5 text-white/70 hover:bg-white/5 transition-colors"
            >
              <td className="py-3 px-2 font-mono text-yellow-400">{order.id}</td>
              <td className="py-3 px-2">{order.customer}</td>
              <td className="py-3 px-2">{order.item}</td>
              <td className="py-3 px-2">
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs">
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-2 text-right font-bold text-green-400">
                {order.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════
   COMPLAINT BOARD
   ═══════════════════════════════════════════ */

function ComplaintBoard() {
  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4">📢 Customer Feedback</h3>
      <div className="space-y-3">
        {COMPLAINTS.slice(0, 5).map((complaint, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-xl p-3 flex items-start gap-3 hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl flex-shrink-0">
              {pickRandom(["😤", "😂", "🤔", "😱", "🙃", "😅"])}
            </span>
            <div>
              <p className="text-white/80 text-sm">&ldquo;{complaint}&rdquo;</p>
              <p className="text-white/30 text-xs mt-1">
                — {pickRandom(CRICKET_NAMES)} • {rand(1, 30)} days ago •{" "}
                {pickRandom(["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐⭐⭐ (extra stars)"])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD PAGE
   ═══════════════════════════════════════════ */

export default function DashboardPage() {
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowRain(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-white">
      {showRain && <EmojiRain />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦗</span>
            <div>
              <h1 className="text-xl font-black">Cricket Hill HQ</h1>
              <p className="text-white/40 text-xs">Analytics & Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/40">
              Welcome back, <span className="text-yellow-400 font-bold">Valued Customer</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-purple-900">
              ?
            </div>
            <a
              href="/"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <StatCard
            icon="⚡"
            label="Generators Deployed"
            value={rand(100, 999)}
            color="bg-gradient-to-br from-emerald-600 to-teal-800"
          />
          <StatCard
            icon="🎆"
            label="Fireworks Launched"
            value={`${rand(10, 99)}K`}
            color="bg-gradient-to-br from-pink-600 to-red-800"
            wiggle
          />
          <StatCard
            icon="🚐"
            label="Sprinter Van Miles"
            value={rand(10000, 99999)}
            unit="mi"
            color="bg-gradient-to-br from-blue-600 to-indigo-800"
          />
          <StatCard
            icon="🤌"
            label="Italian Gestures"
            value={`${rand(1, 9)}.${rand(1, 9)}M`}
            color="bg-gradient-to-br from-orange-600 to-amber-800"
            wiggle
          />
          <StatCard
            icon="🎵"
            label="Songs Synced"
            value={rand(200, 800)}
            color="bg-gradient-to-br from-violet-600 to-purple-800"
          />
          <StatCard
            icon="😤"
            label="Complaints (Valid)"
            value={0}
            color="bg-gradient-to-br from-gray-600 to-gray-800"
          />
        </div>

        {/* Cricket Counter */}
        <CricketCounter />

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FakeBarChart
            title="📊 Revenue by Service (Don't Verify)"
            bars={[
              { label: "Generator Installs", value: rand(100, 300), color: "bg-emerald-500" },
              { label: "Firework Shows", value: rand(80, 250), color: "bg-pink-500" },
              { label: "Musical Choreography", value: rand(40, 180), color: "bg-violet-500" },
              { label: "Shipping/Delivery", value: rand(60, 200), color: "bg-orange-500" },
              { label: "Generator Repair", value: rand(30, 150), color: "bg-blue-500" },
              { label: "\"Other Stuff\"", value: rand(50, 300), color: "bg-yellow-500" },
            ]}
          />
          <FakeBarChart
            title="🎵 Top Show Soundtrack Requests"
            bars={MUSIC_CHOICES.slice(0, 6).map((song) => ({
              label: song.split(" — ")[0],
              value: rand(10, 100),
              color: pickRandom([
                "bg-pink-500", "bg-blue-500", "bg-green-500",
                "bg-yellow-500", "bg-purple-500", "bg-red-500",
              ]),
            }))}
          />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiveTicker />
          <SteveApproval />
        </div>

        {/* Orders */}
        <RecentOrders />

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComplaintBoard />
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">🗺️ Van Tracker</h3>
            <div className="bg-white/5 rounded-xl p-8 text-center">
              <div className="text-6xl animate-bounce mb-4">🚐</div>
              <p className="text-white/60 text-sm">
                Van #1 Location: <span className="text-yellow-400 font-bold">Unknown</span>
              </p>
              <p className="text-white/40 text-xs mt-1">
                Last seen: Olive Garden parking lot, 3 hours ago
              </p>
              <div className="mt-4 h-px bg-white/10" />
              <div className="text-6xl animate-bounce mt-4 mb-4" style={{ animationDelay: "0.5s" }}>
                🚐
              </div>
              <p className="text-white/60 text-sm">
                Van #2 Location: <span className="text-green-400 font-bold">En Route (Probably)</span>
              </p>
              <p className="text-white/40 text-xs mt-1">
                ETA: Between 20 minutes and 3 business days
              </p>
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="text-center py-8 text-white/20 text-xs">
          <p>
            All metrics are 100% fabricated. Cricket counts are not audited.
            Steve&rsquo;s approval rating is self-reported.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Cricket Hill Analytics Division (est. just now)
          </p>
        </div>
      </div>
    </main>
  );
}
