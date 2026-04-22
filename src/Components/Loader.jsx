// ─────────────────────────────────────────────────────────────
//  Loader — Reusable loading component
//
//  Props:
//    variant   "spinner" | "pulse" | "dots" | "bar" | "reel" | "skeleton"
//    size      "sm" | "md" | "lg"
//    text      string — optional label below loader
//    fullscreen boolean — centers loader on full screen overlay
//
//  Usage:
//    <Loader />
//    <Loader variant="dots" />
//    <Loader variant="reel" text="Loading movies..." />
//    <Loader variant="skeleton" />
//    <Loader variant="spinner" size="lg" fullscreen />
// ─────────────────────────────────────────────────────────────

const sizeMap = {
  sm: { ring: "w-6 h-6 border-2", dot: "w-1.5 h-1.5", bar: "w-16 h-0.5", text: "text-[10px]" },
  md: { ring: "w-10 h-10 border-[3px]", dot: "w-2 h-2", bar: "w-24 h-[3px]", text: "text-xs" },
  lg: { ring: "w-14 h-14 border-4", dot: "w-3 h-3", bar: "w-32 h-1", text: "text-sm" },
};

// ── Spinner ───────────────────────────────────────────────────
function Spinner({ size = "md" }) {
  const s = sizeMap[size];
  return (
    <div
      className={`${s.ring} rounded-full border-yellow-400/20 border-t-yellow-400 animate-spin`}
    />
  );
}

// ── Pulse ─────────────────────────────────────────────────────
function Pulse({ size = "md" }) {
  const s = sizeMap[size];
  return (
    <div className="relative flex items-center justify-center">
      {[0, 1].map((i) => (
        <span
          key={i}
          className={`absolute ${s.ring.split(" ")[0]} ${s.ring.split(" ")[1]} rounded-full border-2 border-yellow-400 opacity-0`}
          style={{ animation: `pulse-ring 1.4s ease-out ${i * 0.5}s infinite` }}
        />
      ))}
      <span
        className={`relative z-10 ${size === "sm" ? "w-2.5 h-2.5" : size === "lg" ? "w-4 h-4" : "w-3 h-3"} bg-yellow-400 rounded-full`}
      />
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(2);   opacity: 0;   }
        }
      `}</style>
    </div>
  );
}

// ── Dots ──────────────────────────────────────────────────────
function Dots({ size = "md" }) {
  const s = sizeMap[size];
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${s.dot} rounded-full bg-yellow-400`}
          style={{
            animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes dot-bounce {
          0%,80%,100% { transform: scale(0.6); opacity: 0.3; }
          40%          { transform: scale(1.2); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

// ── Bar ───────────────────────────────────────────────────────
function Bar({ size = "md" }) {
  const s = sizeMap[size];
  return (
    <div className={`${s.bar} rounded-full bg-white/[0.08] overflow-hidden`}>
      <div
        className="h-full w-2/5 rounded-full bg-yellow-400"
        style={{ animation: "bar-slide 1.2s ease-in-out infinite" }}
      />
      <style>{`
        @keyframes bar-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%);  }
        }
      `}</style>
    </div>
  );
}

// ── Film Reel (movie themed) ──────────────────────────────────
function Reel({ size = "md" }) {
  const dim = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const inner = size === "sm" ? "w-2.5 h-2.5" : size === "lg" ? "w-5 h-5" : "w-3 h-3";
  const hole = size === "sm" ? "w-1 h-1" : size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5";

  const holePositions = [
    "top-1 left-1/2 -translate-x-1/2",
    "bottom-1 left-1/2 -translate-x-1/2",
    "left-1 top-1/2 -translate-y-1/2",
    "right-1 top-1/2 -translate-y-1/2",
  ];

  return (
    <div
      className={`relative ${dim} rounded-full border-2 border-yellow-400/30 flex items-center justify-center animate-spin`}
      style={{ animationDuration: "2s" }}
    >
      <div className={`${inner} rounded-full bg-yellow-400/40`} />
      {holePositions.map((pos, i) => (
        <div key={i} className={`absolute ${hole} ${pos} rounded-full bg-yellow-400`} />
      ))}
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────
function Skeleton({ rows = 3 }) {
  const widths = ["w-full", "w-3/4", "w-1/2", "w-2/3", "w-5/6"];
  return (
    <div className="w-full space-y-2.5">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.10) 50%,
            rgba(255,255,255,0.04) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`h-2.5 rounded-full shimmer ${widths[i % widths.length]}`}
        />
      ))}
    </div>
  );
}

// ── Card Skeleton (for movie cards) ───────────────────────────
export function CardSkeleton({ count = 4 }) {
  return (
    <div className="flex gap-4 overflow-hidden px-5">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.10) 50%,
            rgba(255,255,255,0.04) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] rounded-2xl overflow-hidden
                     bg-white/[0.03] border border-white/[0.06]"
        >
          <div className="aspect-[2/3] shimmer" />
          <div className="p-4 space-y-2">
            <div className="h-3 rounded-full shimmer w-3/4" />
            <div className="h-2 rounded-full shimmer w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Full Screen Overlay ───────────────────────────────────────
function FullscreenLoader({ variant, size, text }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#0a0a0f]/90 backdrop-blur-sm">
      <LoaderInner variant={variant} size={size} />
      {text && (
        <p className="text-white/40 text-xs tracking-widest uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// ── Inner renderer ────────────────────────────────────────────
function LoaderInner({ variant, size }) {
  switch (variant) {
    case "pulse": return <Pulse size={size} />;
    case "dots": return <Dots size={size} />;
    case "bar": return <Bar size={size} />;
    case "reel": return <Reel size={size} />;
    case "skeleton": return <Skeleton />;
    default: return <Spinner size={size} />;
  }
}

// ── Main Export ───────────────────────────────────────────────
export default function Loader({
  variant = "spinner",
  size = "md",
  text = "",
  fullscreen = false,
}) {
  if (fullscreen) {
    return <FullscreenLoader variant={variant} size={size} text={text} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <LoaderInner variant={variant} size={size} />
      {text && (
        <p className="text-white/40 text-xs tracking-widest uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}