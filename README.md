# 🎬 Movie Website (TMDB API)

A responsive movie web application built with **React** that fetches real-time movie data from the **TMDB API**. The application allows users to explore popular movies, view detailed information, and watch trailers directly from YouTube.

---

## 🚀 Features

- 🎥 Display popular movies from TMDB API  
- 📄 Movie details page with full information  
- ▶️ Watch trailers via YouTube integration  
- ⚡ Fast and responsive UI  
- 🔄 Dynamic data fetching using Axios  

---

## 🛠️ Tech Stack

- React.js  
- JavaScript (ES6+)  
- Axios  
- TMDB API  
- CSS / Tailwind CSS  

---

## 📁 Project Structure

movie-app/
├── public/
└── src/
    ├── assets/
    ├── components/
    │   ├── Button.jsx
    │   ├── Footer.jsx
    │   ├── Heading.jsx
    │   ├── Navbar.jsx
    │   ├── Paragraph.jsx
    │   └── TrailerModal.jsx
    ├── pages/
    │   ├── HeroSection/
    │   │   ├── Hero.jsx
    │   │   ├── LeftSide.jsx
    │   │   ├── ThumbCard.jsx
    │   │   └── ThumbnailStrip.jsx
    │   ├── Movies/
    │   │   ├── Categories.jsx
    │   │   ├── MovieCard.jsx
    │   │   ├── MoviesSection.jsx
    │   │   └── StarRating.jsx
    │   ├── ViewMovies/
    │   └── LandingPage.jsx
    ├── service/
    │   └── Api.js
    ├── App.jsx
    └── main.jsx

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/AbroRizwan1/movie-website.git

# Navigate to project folder
cd movie-app

# Install dependencies
npm install

# Start development server
npm run dev

---
## 🔑 API Setup

This project uses TMDB API.

Create account on TMDB
Get your API key
Add it in your project (e.g. .env file)
VITE_TMDB_API_KEY=your_api_key_here

Upcoming Features
🔍 Search functionality
⏳ Loading states and skeleton UI
❤️ Favorite movies feature
🎨 UI improvements

📌 Notes

This project is currently under development. More features and improvements will be added soon.

👨‍💻 Author
Rizwan Abro
Frontend Developer (React)
📄 License

This project is open source and available for learning purposes.


