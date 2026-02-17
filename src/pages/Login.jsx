import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    
    password: Yup.string()
      .required('Password is required')
  });

  // Initial Values
  const initialValues = {
    email: '',
    password: ''
  };

  // Submit Handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('🔐 Login: Submitting...', { email: values.email });
      
      const result = await login(values.email, values.password);
      
      console.log('📥 Login: Result:', result);
      
      if (result.success) {
        toast.success('Login successful! Welcome back.');
        
        // ✅ FIXED: Navigate immediately without setTimeout
        navigate('/dashboard/overview');
      } else {
        toast.error(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Login: Error:', error);
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        {/* Animated Background Triangles */}
        <div className="background-triangles">
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="triangle triangle-3"></div>
          <div className="triangle triangle-4"></div>
          <div className="triangle triangle-5"></div>
        </div>

        <div className="login-container">
          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Login to continue your investment journey</p>
            </div>

            {/* Login Form with Formik */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Form className="login-form" autoComplete="off">
                  {/* Email Input */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                        placeholder="Enter your email"
                        autoComplete="email"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  {/* Password Input */}
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label="Toggle password visibility"
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  {/* Forgot Password Link */}
                  <div className="forgot-password-wrapper">
                    <Link to="/forgot-password" className="forgot-password-link">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="login-submit-btn"
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Signup Link */}
            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="signup-link">
                  Click here to sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;