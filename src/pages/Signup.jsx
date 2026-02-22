import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useUser();

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .required('Full name is required'),
    
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number, and special character'
      )
      .required('Password is required'),
    
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    
    referralCode: Yup.string()
      .optional()
  });

  // Initial Values
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    referralCode: ''
  };

  // Submit Handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    console.log('📝 Signup: Submitting...', { email: values.email });
    
    const result = await register(values);
    
    console.log('📥 Signup: Result:', result);
    
    if (result.success) {
      toast.success('Account created! Please check your email to verify your account.');
      resetForm();
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('❌ Signup: Error:', error);
    toast.error(error.message || 'An unexpected error occurred.');
  } finally {
    setSubmitting(false);
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignup = () => {
    toast.info('Google signup coming soon!');
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        {/* Animated Background Circles */}
        <div className="background-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        <div className="signup-container">
          <div className="signup-card">
            {/* Header */}
            <div className="signup-header">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Join Wallstreet and start your investment journey</p>
            </div>

            {/* Google Signup Button */}
            <button className="google-signup-btn" type="button" onClick={handleGoogleSignup}>
              <FontAwesomeIcon icon={faGoogle} />
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="divider">
              <span>or sign up with email</span>
            </div>

            {/* Signup Form with Formik */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Form className="signup-form">
                  {/* Name Input */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faUser} className="input-icon" />
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="error-message" />
                  </div>

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
                        placeholder="Create a password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="form-group">
                    <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        id="passwordConfirm"
                        name="passwordConfirm"
                        className={`form-input ${errors.passwordConfirm && touched.passwordConfirm ? 'error' : ''}`}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                      </button>
                    </div>
                    <ErrorMessage name="passwordConfirm" component="div" className="error-message" />
                  </div>

                  {/* Referral Code Input (Optional) */}
                  <div className="form-group">
                    <label htmlFor="referralCode" className="form-label">
                      Referral Code <span className="optional-text">(Optional)</span>
                    </label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faUser} className="input-icon" />
                      <Field
                        type="text"
                        id="referralCode"
                        name="referralCode"
                        className="form-input"
                        placeholder="Enter referral code (if any)"
                      />
                    </div>
                    <ErrorMessage name="referralCode" component="div" className="error-message" />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="signup-submit-btn"
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Login Link */}
            <div className="signup-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Click here to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;