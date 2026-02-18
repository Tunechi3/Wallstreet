import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

const UserContext = createContext();

// API Base URL - Update this to match your backend
// const API_BASE_URL = 'http://localhost:5000/api';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Set token to localStorage
  const setToken = (token) => localStorage.setItem('token', token);

  // Remove token from localStorage
  const removeToken = () => localStorage.removeItem('token');

  // API call helper with authentication
  const apiCall = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
      });

      // FIX: safely parse JSON — don't crash on empty/non-JSON error responses
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server error (${response.status}): ${text}`);
      }

      // Handle unauthorized errors
      if (response.status === 401) {
        removeToken();
        setUser(null);
        navigate('/login');
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      // FIX: removed duplicate API_URL prefix (apiCall already prepends it)
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (data.status === 'success' && data.token) {
        setToken(data.token);
        setUser(data.data.user);
        return { success: true, user: data.data.user };
      }

      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      console.log('🔐 UserContext: Attempting login...', { email });

      // FIX: removed duplicate API_URL prefix (apiCall already prepends it)
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      console.log('📥 UserContext: Login response:', data);

      if (data.status === 'success' && data.token) {
        setToken(data.token);
        setUser(data.data.user);
        console.log('✅ UserContext: Login successful, user set:', data.data.user);
        return { success: true, user: data.data.user };
      }

      console.log('❌ UserContext: Login failed:', data.message);
      return { success: false, message: data.message };
    } catch (error) {
      console.error('❌ UserContext: Login error:', error);
      return { success: false, message: error.message };
    }
  };

  // Logout user
  const logout = async () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const data = await apiCall('/dashboard');

      if (data.status === 'success') {
        setUser(prevUser => ({
          ...prevUser,
          ...data.data.user,
        }));

        return {
          success: true,
          data: {
            user: data.data.user,
            activeInvestments: data.data.activeInvestments || [],
            recentTransactions: data.data.recentTransactions || [],
            notifications: data.data.notifications || [],
          },
        };
      }

      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Fetch user statistics
  const fetchUserStats = async () => {
    try {
      const data = await apiCall('/dashboard/stats');
      return data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return { success: false, message: error.message };
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const result = await fetchDashboardData();
      return result;
    } catch (error) {
      console.error('Error refreshing user:', error);
      return { success: false };
    }
  };

  // Get investment plans
  const getInvestmentPlans = async () => {
    try {
      const data = await apiCall('/investment-plans');
      return data;
    } catch (error) {
      console.error('Error fetching investment plans:', error);
      return { success: false, message: error.message };
    }
  };

  // Create investment
  const createInvestment = async (planId, amount) => {
    try {
      const data = await apiCall('/investments', {
        method: 'POST',
        body: JSON.stringify({ planId, amount }),
      });

      if (data.status === 'success') {
        await refreshUser();
      }

      return data;
    } catch (error) {
      console.error('Error creating investment:', error);
      return { success: false, message: error.message };
    }
  };

  // Get active investments
  const getActiveInvestments = async () => {
    try {
      const data = await apiCall('/investments/active');
      return data;
    } catch (error) {
      console.error('Error fetching active investments:', error);
      return { success: false, message: error.message };
    }
  };

  // ✅ FIX: createDeposit now correctly checks data.success (backend returns { success: true })
  // and also normalises the return so Dashboard always gets a consistent shape.
  const createDeposit = async (amount, method, walletAddress) => {
    try {
      const data = await apiCall('/transactions/deposit', {
        method: 'POST',
        body: JSON.stringify({ amount, method, walletAddress }),
      });

      // Backend returns { success: true, message, data: {...} }
      if (data.success) {
        await refreshUser();
      }

      return data; // always return the full response so Dashboard can read data.message
    } catch (error) {
      console.error('Error creating deposit:', error);
      return { success: false, message: error.message };
    }
  };

  // ✅ FIX: same normalisation for createWithdrawal
  const createWithdrawal = async (amount, method, walletAddress) => {
    try {
      const data = await apiCall('/transactions/withdraw', {
        method: 'POST',
        body: JSON.stringify({ amount, method, walletAddress }),
      });

      // Backend returns { success: true, message, data: {...} }
      if (data.success) {
        await refreshUser();
      }

      return data; // always return the full response so Dashboard can read data.message
    } catch (error) {
      console.error('Error creating withdrawal:', error);
      return { success: false, message: error.message };
    }
  };

  // Get transactions
  const getTransactions = async (type = null, status = null) => {
    try {
      let endpoint = '/transactions';
      const params = new URLSearchParams();
      
      if (type) params.append('type', type);
      if (status) params.append('status', status);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const data = await apiCall(endpoint);
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { success: false, message: error.message };
    }
  };

  // Get notifications
  const getNotifications = async () => {
    try {
      const data = await apiCall('/notifications');
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { success: false, message: error.message };
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const data = await apiCall(`/notifications/${notificationId}/read`, {
        method: 'PATCH',
      });
      return data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, message: error.message };
    }
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    try {
      const data = await apiCall('/notifications/mark-all-read', {
        method: 'PATCH',
      });
      return data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return { success: false, message: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const data = await apiCall('/users/profile', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });

      if (data.status === 'success') {
        setUser(prevUser => ({
          ...prevUser,
          ...data.data.user,
        }));
      }

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, message: error.message };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword, passwordConfirm) => {
    try {
      const data = await apiCall('/auth/change-password', {
        method: 'PATCH',
        body: JSON.stringify({ currentPassword, newPassword, passwordConfirm }),
      });

      return data;
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: error.message };
    }
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      
      if (token) {
        try {
          const data = await apiCall('/dashboard');
          
          if (data.status === 'success') {
            setUser(data.data.user);
          } else {
            removeToken();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          removeToken();
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user && !!getToken(),
    login,
    register,
    logout,
    fetchDashboardData,
    fetchUserStats,
    refreshUser,
    getInvestmentPlans,
    createInvestment,
    getActiveInvestments,
    createDeposit,
    createWithdrawal,
    getTransactions,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    updateProfile,
    changePassword,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;