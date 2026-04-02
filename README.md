# 🎬 CineMax — Movie Discovery App

A responsive movie discovery app built with React and powered by the TMDB API. Explore trending movies, view detailed info, and watch trailers — all in a cinematic dark UI.

🔗 [Live Demo](https://abrorizwan1.github.io/Movie-web/) · [GitHub](https://github.com/AbroRizwan1/Movie-web)

---

## ✨ Features

- 🎥 Browse popular & trending movies from TMDB
- 📄 Detailed movie pages with ratings, genres & overview
- ▶️ Watch official trailers via YouTube integration
- ❤️ Favourites system with LocalStorage persistence
- ⚡ Fast, fully responsive dark UI

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | UI & component architecture |
| React Router DOM | Page navigation |
| Tailwind CSS | Styling & responsive design |
| Axios | API data fetching |
| TMDB API | Movie data & trailers |

---

## 🚀 Getting Started

### 1 — Clone the repo
```bash
git clone https://github.com/AbroRizwan1/Movie-web.git
cd Movie-web
```

### 2 — Install dependencies
```bash
npm install
```

### 3 — Setup environment variables

Create a `.env` file in the root:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

Get your free API key at [themoviedb.org](https://www.themoviedb.org/)

### 4 — Run locally
```bash
npm run dev
```

---

## 📁 Project Structure
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── TrailerModal.jsx
├── pages/
│   ├── HeroSection/
│   ├── Movies/
│   └── ViewMovies/
├── service/
│   └── Api.js
├── App.jsx
└── main.jsx
```

---

## 👨‍💻 Author

**Rizwan Abro** — Frontend Developer (React)

---

## 📄 License

Open source — available for learning purposes.