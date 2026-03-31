const Heading = ({
  children,
  level = 1,
  size,
  weight = "bold",
  align = "left",
  color = "default",
  gradient = false,
  className = "",
}) => {
  const Tag = `h${level}`;

  const defaultSizes = {
    1: "5xl",
    2: "4xl",
    3: "3xl",
    4: "2xl",
    5: "xl",
    6: "lg",
  };
  const resolvedSize = size || defaultSizes[level];

  // Each size has a mobile → desktop responsive scale
  const sizes = {
    "6xl": "text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.04em]",
    "5xl": "text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-[-0.035em]",
    "4xl": "text-2xl sm:text-3xl md:text-4xl leading-[1.1]  tracking-[-0.03em]",
    "3xl": "text-xl  sm:text-2xl md:text-3xl leading-[1.15] tracking-[-0.02em]",
    "2xl": "text-lg  sm:text-xl  md:text-2xl leading-[1.2]  tracking-[-0.015em]",
    xl:   "text-base sm:text-lg  md:text-xl  leading-[1.3]  tracking-[-0.01em]",
    lg:   "text-sm   sm:text-base md:text-lg leading-[1.4]  tracking-[-0.005em]",
  };

  const weights = {
    light:     "font-light",
    normal:    "font-normal",
    medium:    "font-medium",
    semibold:  "font-semibold",
    bold:      "font-bold",
    extrabold: "font-extrabold",
    black:     "font-black",
  };

  const aligns = {
    left:   "text-left pb-2",
    center: "text-center",
    right:  "text-right",
  };

  const colors = {
    default: "text-white/80",
    muted:   "text-stone-500",
    accent:  "text-amber-600",
    white:   "text-white",
  };

  const gradientClass = gradient
    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent"
    : "";

  return (
    <Tag
      className={[
        sizes[resolvedSize],
        weights[weight],
        aligns[align],
        gradient ? "" : colors[color],
        gradientClass,
        "font-display",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {children}
    </Tag>
  );
};

export default Heading;