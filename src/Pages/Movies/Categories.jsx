import axios from "axios";
import Button from "../../Components/Button";

const Categories = ({
  activeCategory,
  popularMovies,
  setActiveCategory,
  categories,
}) => {
  const defaultStyle = "text-gray-300 bg-gray-500/10 border-gray-500/30";

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 sm:mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Button
        onClick={() => setActiveCategory("All")}
        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250 border
    ${
      activeCategory === "All"
        ? "!bg-yellow-400 !text-black border-yellow-400 shadow-lg shadow-yellow-400/20 scale-[1.02]"
        : "bg-white/[0.04] text-white/50 border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80 hover:border-white/15"
    }`}
      >
        All
        <span
          className={`ml-1.5 text-[10px] font-semibold ${
            activeCategory === null ? "!text-white/25 " : " !text-black/60"
          }`}
        >
          {popularMovies.length}
        </span>
      </Button>

      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        const count = popularMovies.filter((m) =>
          m.genre_ids.includes(cat.id),
        ).length;

        return (
          <Button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250 border      
        ${
          isActive
            ? "!bg-yellow-400 !text-black border-yellow-400 shadow-lg shadow-yellow-400/20 scale-[1.02]"
            : "bg-white/[0.04] text-white/50 border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80 hover:border-white/15"
        }`}
          >
            {cat.name}

            {cat.name !== "All" && (
              <span
                className={`ml-1.5 text-[10px] font-semibold ${
                  isActive ? "text-black/60" : "text-white/25"
                }`}
              >
                {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default Categories;
