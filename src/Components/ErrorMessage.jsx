// ─────────────────────────────────────────────────────────────
//  ErrorMessage — Reusable error display component
//
//  Props:
//    message   string       — error text to display
//    onRetry   function     — optional retry callback (shows button)
//    variant   "inline" | "card" | "fullscreen"
//
//  Usage:
//    <ErrorMessage message={error} />
//    <ErrorMessage message={error} onRetry={fetchMovies} />
//    <ErrorMessage message={error} variant="card" onRetry={fetchMovies} />
//    <ErrorMessage message={error} variant="fullscreen" onRetry={fetchMovies} />
// ─────────────────────────────────────────────────────────────

export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
  variant = "inline",
}) {
  const Icon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-400 flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );

  const RetryButton = () =>
    onRetry ? (
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                   bg-red-500/10 text-red-400 border border-red-500/20
                   hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Try again
      </button>
    ) : null;

  // ── Inline (default) ────────────────────────────────────────
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                      bg-red-500/[0.08] border border-red-500/20 w-fit">
        <Icon />
        <p className="text-red-400 text-xs font-medium">{message}</p>
        {onRetry && <RetryButton />}
      </div>
    );
  }

  // ── Card ────────────────────────────────────────────────────
  if (variant === "card") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 px-6
                      rounded-2xl bg-red-500/[0.05] border border-red-500/15 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20
                        flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-white/70 text-sm font-medium">Oops! Something went wrong</p>
          <p className="text-red-400/80 text-xs">{message}</p>
        </div>
        {onRetry && <RetryButton />}
      </div>
    );
  }

  // ── Fullscreen ──────────────────────────────────────────────
  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5
                      bg-[#0a0a0f]/95 backdrop-blur-sm">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20
                        flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="text-center space-y-1.5">
          <p className="text-white/80 text-base font-semibold">Oops! Something went wrong</p>
          <p className="text-red-400/70 text-sm max-w-xs">{message}</p>
        </div>
        {onRetry && <RetryButton />}
      </div>
    );
  }
}