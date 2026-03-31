import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  TrailerModal — Reusable YouTube Trailer Modal
// ─────────────────────────────────────────────
//
//  PROPS:
//    trailerKey  {string}   YouTube video ID  e.g. "dQw4w9WgXcQ"
//    isOpen      {boolean}  Show or hide the modal
//    onClose     {function} Called when user closes the modal
//
//  USAGE:
//    1. Import the component
//       import TrailerModal from "./TrailerModal";
//
//    2. Add state in your parent component
//       const [showTrailer, setShowTrailer] = useState(false);
//
//    3. Add a button to open it
//       <button onClick={() => setShowTrailer(true)}>Watch Trailer</button>
//
//    4. Drop the component anywhere in your JSX
//       <TrailerModal
//         trailerKey="dQw4w9WgXcQ"
//         isOpen={showTrailer}
//         onClose={() => setShowTrailer(false)}
//       />
// ─────────────────────────────────────────────

export default function TrailerModal({ trailerKey, isOpen, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Close on ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Reset loader & lock background scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsLoaded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Don't render anything if closed or no video key provided
  if (!isOpen || !trailerKey) return null;

  return (
    /* ── BACKDROP ── click outside video to close */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* ── MODAL CONTAINER ── */}
      <div className="relative w-full max-w-4xl">
        {/* ── CLOSE BUTTON ── */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center
                     rounded-full bg-white/10 border border-white/20 text-white
                     hover:bg-white/20 transition-colors text-sm"
          aria-label="Close trailer"
        >
          ✕
        </button>

        {/* ── VIDEO WRAPPER (keeps 16:9 ratio on all screen sizes) ── */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
          {/* ── LOADING SPINNER (shown until iframe loads) ── */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="w-9 h-9 border-[3px] border-white/20 border-t-amber-400 rounded-full animate-spin" />
            </div>
          )}

          {/* ── YOUTUBE IFRAME ── */}
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title="Movie Trailer"
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* ── HINT TEXT ── */}
        <p className="text-center text-white/30 text-xs mt-3">
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
}
