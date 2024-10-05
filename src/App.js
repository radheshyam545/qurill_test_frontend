import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import { USER_ROLE } from './app/enums';
import CompanyProfile from './pages/employerProtected/CompanyProfile';
import NewPassword from './pages/NewPassword';
const Layout = lazy(() => import('./containers/Layout'))
const EmployerLayout = lazy(() => import('./employerContainers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Email = lazy(() => import('./pages/EmialVerified'))
const LogOut = lazy(() => import('../src/pages/employerProtected/LogOut'))
const LandingPage = lazy(() => import('./pages/prepermotions/pages/LandingPage'))
const VerificationPage = lazy(() => import('./pages/prepermotions/pages/VerificationPage'))
initializeApp()
const { token, user, status } = checkAuth()

function App() {

  // Register the service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);

        // Send the token to the service worker when the page loads or the user logs in
        if (localStorage.getItem('authToken')) {
          registration.active.postMessage({ type: 'SET_TOKEN', token: localStorage.getItem('token') });
        }
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }


  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', 'bumblebee');
    themeChange(false)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/EmailVerification" element={<Email />} />
          <Route path="/employer/LogOut" element={<LogOut />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/emailverification-permotion" element={<VerificationPage/>} />


          {/* <Route path="/under-varification" element={<UnderVarification />} /> */}
          {/* <Route path="/legitimacy-checkpoint" element={<CompanyProfile />} /> */}

          {/* Place new routes over this */}
          {user === USER_ROLE.SEEKER && <Route path="seeker/*" element={<Layout />} />}
          {user === USER_ROLE.EMPLOYER && <Route path="employer/*" element={<EmployerLayout />} />}

          {/* <Route path="seeker/*" element={<Layout />} /> 
              <Route path="employer/*" element={<EmployerLayout />} /> */}

          <Route path="/" element={<Navigate to={token ? user === USER_ROLE.SEEKER ? "seeker/dashboard" : status == 'approved' ? "employer/dashboard" : "employer/legitimacy-checkpoint" : "/login"} replace />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
