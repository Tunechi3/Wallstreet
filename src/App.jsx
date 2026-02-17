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

function App() {
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