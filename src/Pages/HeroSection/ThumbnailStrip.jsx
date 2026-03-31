import { useState } from "react";
import ThumbCard from "./ThumbCard";
const ThumbnailStrip = ({ stripRef, timerRef, trendMovies, thumbRefs,handleThumb, goTo, current,  }) => {
  
  return (
    <div>
      <div
        ref={stripRef}
        className="absolute bottom-0 left-0 right-0 z-[7] px-6 sm:px-10 lg:px-16 pb-4 pt-2"
      >
        {/* Slide counter + arrows */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/40 text-xs tracking-widest">
            <span className="text-white font-semibold">
              {String(current + 1).padStart(2, "0")}
            </span>
            &nbsp;/ {String(trendMovies.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                clearInterval(timerRef.current);
                goTo(current - 1);
              }}
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => {
                clearInterval(timerRef.current);
                goTo(current + 1);
              }}
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trendMovies.map((movie, i) => (
            <div key={i} className="flex-shrink-0 w-24 sm:w-28 md:w-32">
              <ThumbCard
                movie={movie}
                index={i}
                isActive={i === current}
                onClick={() => handleThumb(i)}
                thumbRef={(el) => (thumbRefs.current[i] = el)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailStrip;
