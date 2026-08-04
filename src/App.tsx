import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import RoadmapPage from './pages/RoadmapPage'
import TopicDetailPage from './pages/TopicDetailPage'
import ResourcesPage from './pages/ResourcesPage'
import CredentialsPage from './pages/CredentialsPage'
import CredentialDetailPage from './pages/CredentialDetailPage'
import ProgressPage from './pages/ProgressPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pt-20 w-full flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/topics/:topicId" element={<TopicDetailPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/credentials" element={<CredentialsPage />} />
              <Route path="/credentials/:credentialId" element={<CredentialDetailPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProgressProvider>
  )
}

export default App