import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from './pages/Landingpage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ScrollManager from './components/ScrollManager'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/Adminprotectedroute'
import { UserProvider } from './context/UserContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/Adminlogin';
import { useEffect } from 'react';
import Aboutpage from './pages/Aboutpage';

function App() {

  useEffect(() => {
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69972064ea86291c3442488b/1jhr5d36m';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ScrollManager>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landingpage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<Aboutpage />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={<Navigate to="/dashboard/overview" replace />}
              />
              <Route
                path="/dashboard/:section"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              {/* /admin → redirect to admin login */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

              {/* Catch all - redirect to landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ScrollManager>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App