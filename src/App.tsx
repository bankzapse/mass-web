import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { DownloadBand } from './components/DownloadBand'
import { ScrollToTop } from './components/ScrollToTop'
import Home from './pages/Home'
import ServiceArticle from './pages/ServiceArticle'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Partner from './pages/Partner'
import Business from './pages/Business'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-[76px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<ServiceArticle slug="food" />} />
          <Route path="/ride" element={<ServiceArticle slug="ride" />} />
          <Route path="/messenger" element={<ServiceArticle slug="messenger" />} />
          <Route path="/mart" element={<ServiceArticle slug="mart" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/business" element={<Business />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <DownloadBand />
      <Footer />
    </div>
  )
}
