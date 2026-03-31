import { useState } from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  onClick,
  className = "",
}) => {
  const base =
    "relative inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none overflow-hidden group";

  const variants = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-700 active:scale-[0.97] shadow-md hover:shadow-lg focus-visible:ring-zinc-900",
    outline:
      "bg-white/10 backdrop-blur-sm text-white !border border-white/20 rounded-xl hover:bg-white/20 active:scale-95 active:scale-[0.97] shadow-sm hover:shadow-md focus-visible:ring-white/10",
    yellow:
      "bg-yellow-400 text-black !font-bold hover:bg-yellow-300  shadow-lg shadow-yellow-400/30 active:scale-[0.97] shadow-md hover:shadow-lg focus-visible:ring-yellow-500",

    ghost:
      "bg-transparent text-zinc-700 hover:bg-zinc-100 active:scale-[0.97] focus-visible:ring-zinc-400",
    gradient:
      "bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:from-violet-500 hover:to-indigo-400 active:scale-[0.97] shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 focus-visible:ring-indigo-500",
  };

  const sizes = {
    sm: "gap-1.5 px-3.5 py-1.5 text-xs rounded-lg",
    md: "gap-2 px-5 py-2.5 text-sm rounded-xl",
    lg: "gap-2.5 px-7 py-3.5 text-base rounded-2xl",
  };

  const disabledStyles = "opacity-40 cursor-not-allowed pointer-events-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        base,
        variants[variant],
        sizes[size],
        disabled || loading ? disabledStyles : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Shimmer layer for gradient variant */}
      {variant === "gradient" && (
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit" />
      )}

      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Loading…</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;

// ── Demo ──────────────────────────────────────────────────────────────────────
// const ArrowRight = () => (
//   <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
//     <path
//       d="M8.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 8.5H2a1 1 0 010-2h8.586L8.293 3.707a1 1 0 010-1.414z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const Plus = () => (
//   <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//     <path
//       d="M7 1v12M1 7h12"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </svg>
// );

// const Trash = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export default function App() {
//   const [loading, setLoading] = useState(false);

//   const handleLoadingDemo = () => {
//     setLoading(true);
//     setTimeout(() => setLoading(false), 2500);
//   };

//   const Section = ({ label, children }) => (
//     <div className="space-y-3">
//       <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
//         {label}
//       </p>
//       <div className="flex flex-wrap items-center gap-3">{children}</div>
//     </div>
//   );

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-10"
//       style={{ background: "#f7f6f3", fontFamily: "'DM Sans', sans-serif" }}
//     >
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
//         rel="stylesheet"
//       />

//       <div className="w-full max-w-xl space-y-10">
//         {/* Header */}
//         <div className="space-y-1">
//           <h1
//             className="text-3xl font-bold text-zinc-900 tracking-tight"
//             style={{ letterSpacing: "-0.03em" }}
//           >
//             Button Component
//           </h1>
//           <p className="text-sm text-zinc-500">
//             Tailwind CSS · All variants, sizes & states
//           </p>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-zinc-200" />

//         {/* Variants */}
//         <Section label="Variants">
//           <Button variant="primary">Primary</Button>
//           <Button variant="secondary">Secondary</Button>
//           <Button variant="gradient">Gradient</Button>
//           <Button variant="danger">Danger</Button>
//           <Button variant="ghost">Ghost</Button>
//         </Section>

//         {/* Sizes */}
//         <Section label="Sizes">
//           <Button size="sm">Small</Button>
//           <Button size="md">Medium</Button>
//           <Button size="lg">Large</Button>
//         </Section>

//         {/* With Icons */}
//         <Section label="With Icons">
//           <Button icon={<Plus />} iconPosition="left">
//             New Item
//           </Button>
//           <Button variant="gradient" icon={<ArrowRight />} iconPosition="right">
//             Continue
//           </Button>
//           <Button variant="danger" icon={<Trash />} iconPosition="left">
//             Delete
//           </Button>
//         </Section>

//         {/* States */}
//         <Section label="States">
//           <Button loading={loading} onClick={handleLoadingDemo} variant="primary">
//             {loading ? "Loading" : "Trigger Loading"}
//           </Button>
//           <Button disabled>Disabled</Button>
//           <Button variant="gradient" disabled>
//             Disabled Gradient
//           </Button>
//         </Section>
//       </div>
//     </div>
//   );
// }
