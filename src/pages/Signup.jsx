import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../components/Navbar';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .required('Full name is required'),
    
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    
    countryCode: Yup.string()
      .required('Country code is required'),
    
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
      .required('Phone number is required'),
    
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('Password is required'),
    
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  // Initial Values
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    countryCode: '+1'
  };

  // Submit Handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', values);
      alert('Account created successfully!');
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <>
    <Navbar/>
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
            <p className="signup-subtitle">Join Wallstreet and start your trading journey</p>
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

                {/* Phone Input with Country Code */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <div className="phone-input-wrapper">
                    <div className="country-code-wrapper">
                      <FontAwesomeIcon icon={faPhone} className="input-icon" />
                      <Field
                        as="select"
                        name="countryCode"
                        className={`country-code-select ${errors.countryCode && touched.countryCode ? 'error' : ''}`}
                      >
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+234">+234</option>
                        <option value="+91">+91</option>
                        <option value="+86">+86</option>
                        <option value="+81">+81</option>
                        <option value="+49">+49</option>
                        <option value="+33">+33</option>
                        <option value="+39">+39</option>
                        <option value="+61">+61</option>
                        <option value="+7">+7</option>
                        <option value="+55">+55</option>
                        <option value="+52">+52</option>
                        <option value="+34">+34</option>
                        <option value="+27">+27</option>
                      </Field>
                    </div>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-input phone-input ${errors.phone && touched.phone ? 'error' : ''}`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <ErrorMessage name="phone" component="div" className="error-message" />
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

                              {/* Confirm Password Input */}
                              <div className="form-group">
                                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                  <div className="input-wrapper">
                                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                                      <Field
                                          type={showConfirmPassword ? "text" : "password"}
                                          id="confirmPassword"
                                          name="confirmPassword"
                                          className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                                          placeholder="Confirm your password"
                                          autoComplete="new-password"
                                          autoCorrect="off"
                                          autoCapitalize="off"
                                          spellCheck="false"
                                      />
                                      <button
                                          type="button"
                                          className="password-toggle"
                                          onClick={toggleConfirmPasswordVisibility}
                                      >
                                          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                      </button>
                                  </div>
                                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                              </div>
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="signup-submit-btn"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
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