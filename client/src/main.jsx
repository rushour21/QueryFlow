import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Home from './pages/home.jsx';  
import Dashboard from './pages/dashboard.jsx';
import './index.css'

const Home1 = lazy(() => import('./component/home1.jsx'));
const ContactCenter = lazy(() => import('./component/contactCenter.jsx'));
const Analytics = lazy(() => import('./component/analytics.jsx'));
const Chatbot = lazy(() => import('./component/chatbot.jsx'));
const Team = lazy(() => import('./component/team.jsx'));
const Settings = lazy(() => import('./component/settings.jsx'));

const LoadingFallback = () => <div>Loading...</div>;

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Add any nested routes here if needed */}
          <Route path="home1" element={<Suspense fallback={<LoadingFallback />}><Home1 /></Suspense>} />
          <Route path="contact-center" element={<Suspense fallback={<LoadingFallback />}><ContactCenter /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<LoadingFallback />}><Analytics /></Suspense>} />
          <Route path="chatbot" element={<Suspense fallback={<LoadingFallback />}><Chatbot /></Suspense>} />
          <Route path="team" element={<Suspense fallback={<LoadingFallback />}><Team /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<LoadingFallback />}><Settings /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
