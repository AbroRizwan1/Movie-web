import Overview from "./Overview";
import CastTab from "./CastTab";

const Main = ({ activeTab, movieData, StarRating, setActiveTab }) => {
 
  
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 space-y-10">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-zinc-800  ">
          {["overview", "cast"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-amber-400 text-amber-400" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        <Overview
          activeTab={activeTab}
          movieData={movieData}
          StarRating={StarRating}
        />

        {/* Cast Tab */}
        <CastTab activeTab={activeTab} movieData={movieData} />
      </div>
    </div>
  );
};

export default Main;
