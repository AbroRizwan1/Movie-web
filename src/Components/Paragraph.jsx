// ── Paragraph Component ───────────────────────────────────────────────────────
const Paragraph = ({
  children,
  size = "base",
  color = "default",
  weight = "normal",
  align = "left",
  leading = "relaxed",
  maxWidth = false,
  dropcap = false,
  className = "",
}) => {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colors = {
    default: "text-white/65",
    muted: "text-stone-400",
    strong: "text-stone-900",
    accent: "text-amber-400",
    white: "text-white/80",
  };

  const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  };

  const aligns = {
    left: "text-left pb-2",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const leadings = {
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  return (
    <p
      className={[
        sizes[size],
        colors[color],
        weights[weight],
        aligns[align],
        leadings[leading],
        maxWidth ? "max-w-prose" : "",
        dropcap
          ? "first-letter:float-left first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:mt-1 first-letter:text-amber-500 first-letter:leading-none"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "'Lora', Georgia, serif" }}
    >
      {children}
    </p>
  );
};

export default Paragraph;
