import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      // Replace this with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        alert('Login successful!');
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Navbar/>
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
            <p className="login-subtitle">Login to continue your trading journey</p>
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
                      autoComplete="off"
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
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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
                  {isSubmitting ? 'Logging in...' : 'Login'}
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
    <Footer/>
    </>
  );
};

export default Login;