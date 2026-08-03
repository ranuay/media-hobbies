import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import MangaPage from './components/manga/MangaPage'
import FilmPage from './components/film/FilmPage'
import BookPage from './components/book/BookPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-netflix-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga" element={<MangaPage />} />
          <Route path="/films" element={<FilmPage />} />
          <Route path="/books" element={<BookPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
