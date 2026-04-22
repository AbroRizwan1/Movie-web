import React from "react";

const Card = ({ activeTab, movie }) => {
  return (
    <div className="px-1">
      <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
        More Like This
      </h2>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
        {movie.similar.map((m) => (
          <div key={m.title} className="group cursor-pointer">
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden aspect-[2/3] bg-zinc-900">
              <img
                src={m.img}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                <p className="text-white text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
                  {m.title}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-amber-400 text-[10px] sm:text-xs font-bold">
                    {m.score}
                  </span>
                  <span className="text-zinc-400 text-[10px] sm:text-xs ml-0.5 truncate">
                    {m.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
