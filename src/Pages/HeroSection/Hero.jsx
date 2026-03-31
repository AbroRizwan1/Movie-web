import { useEffect, useRef, useState, useCallback } from "react";
import LeftSide from "./LeftSide";
import ThumbnailStrip from "./ThumbnailStrip";
import { getTrendingMovies } from "../../Service/Api";

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [progress, setProgress] = useState(0);
  const [bgVisible, setBgVisible] = useState(true);
  const [infoVisible, setInfoVisible] = useState(true);

  const timerRef = useRef(null);
  const progRef = useRef(null);
  const progStartRef = useRef(Date.now());
  const thumbRefs = useRef([]);
  const stripRef = useRef(null);

  const [trendMovies, setTrendMovies] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingMovies();
      setTrendMovies(data);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    let categories = trendMovies.filter((g) => {
      return g.genre_ids;
    });
  }, []);

  const goTo = useCallback(
    (idx) => {
      const len = trendMovies.length;
      if (!len) return;

      const next = (idx + len) % len;

      setPrevIdx((current) => current);

      setBgVisible(false);
      setInfoVisible(false);

      setTimeout(() => {
        setCurrent(next);

        setBgVisible(true);
        setTimeout(() => setInfoVisible(true), 80);
      }, 300);

      setProgress(0);
      progStartRef.current = Date.now();
    },
    [trendMovies.length],
  );

  useEffect(() => {
    clearInterval(progRef.current);
    progStartRef.current = Date.now();
    setProgress(0);
    progRef.current = setInterval(() => {
      const pct = Math.min(
        ((Date.now() - progStartRef.current) / INTERVAL) * 100,
        100,
      );
      setProgress(pct);
    }, 60);
    return () => clearInterval(progRef.current);
  }, [current]);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(current + 1), INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [current, goTo]);

  const handleThumb = (idx) => {
    clearInterval(timerRef.current);
    goTo(idx);
  };

  const m = trendMovies[current] || trendMovies[0];

  return (
    <div className="relative w-full h-screen min-h-[500px] max-h-[900px] overflow-hidden bg-black  ">
      {/* ── Full-bleed Backdrop ── */}
      {prevIdx !== null && (
        <img
          src={
            m?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
              : "/fallback.jpg"
          }
          alt={m?.title}
          className="absolute inset-0 w-full h-full  object-cover z-[1]"
        />
      )}
      <img
        key={current}
        src={
          m?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
            : "/fallback.jpg"
        }
        alt={m?.title}
        className={`absolute inset-0 w-full h-full object-cover z-[2] transition-opacity duration-700 ${
          bgVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── Gradient Overlays ── */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/90 md:from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/90 md:from-black/80 via-transparent to-black/30" />

      {/* ── Hero Info ── */}
      <LeftSide m={m || {}} infoVisible={infoVisible} />

      {/* ── Thumbnail Strip (bottom) ── */}
      <ThumbnailStrip
        stripRef={stripRef}
        current={current}
        goTo={goTo}
        thumbRefs={thumbRefs}
        timerRef={timerRef}
        handleThumb={handleThumb}
        trendMovies={trendMovies}
      />

      {/* ── Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[8] h-[2px] bg-white/10">
        <div
          className="h-full bg-yellow-400 transition-none"
          style={{ width: `${progress.toFixed(1)}%` }}
        />
      </div>
    </div>
  );
}
