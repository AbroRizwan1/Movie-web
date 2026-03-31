
export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating / 2 >= star;
        const half = !filled && rating / 2 >= star - 0.5;
        return (
          <svg
            key={star}
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill={filled ? "#facc15" : half ? "url(#half)" : "none"}
            stroke="#facc15"
            strokeWidth="1.5"
          >
            {half && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}
