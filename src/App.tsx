import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

const Admin = lazy(() => import('./pages/Admin'))

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'

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
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="container-mass py-24 text-center text-ink-400">กำลังโหลด…</div>}>
                <Admin />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <DownloadBand />}
      {!isAdmin && <Footer />}
    </div>
  )
}
