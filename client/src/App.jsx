import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Schemes from './pages/Schemes';
import SchemeDetail from './pages/SchemeDetail';
import Assistant from './pages/Assistant';
import Calculator from './pages/Calculator';
import DocumentReadiness from './pages/DocumentReadiness';
import NotFound from './pages/NotFound';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-950 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/schemes/:id" element={<SchemeDetail />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/readiness" element={<DocumentReadiness />} />
              <Route path="/assistant" element={<Assistant />} />
              {/* Fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
