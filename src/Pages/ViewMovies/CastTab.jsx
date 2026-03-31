import React from "react";

const CastTab = ({ activeTab, movieData }) => {
  return (
    <div>
      {activeTab === "cast" && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">
            Starring
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {movieData?.starring?.map((name, i) => {
              const colors = [
                "from-violet-600/30",
                "from-cyan-600/30",
                "from-rose-600/30",
                "from-emerald-600/30",
              ];
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);
              return (
                <div
                  key={name}
                  className={`rounded-2xl bg-gradient-to-b ${colors[i]} to-zinc-900 border border-zinc-800 p-5 flex flex-col items-center gap-3 hover:border-zinc-600 transition-colors cursor-pointer`}
                >
                  <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center text-xl font-black text-white">
                    {initials}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Actor</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">
              Crew
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["Director", movieData?.director],
                ["Writer", "Jon Spaihts"],
                ["Producer", "Mary Parent"],
                ["Cinematography", "Greig Fraser"],
              ].map(([role, name]) => (
                <div
                  key={role}
                  className="flex items-center justify-between bg-zinc-900 rounded-xl px-4 py-3 border border-zinc-800"
                >
                  <span className="text-zinc-500 text-sm">{role}</span>
                  <span className="text-zinc-200 text-sm font-medium">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastTab;
