import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_POSITION_KEY = 'scroll-positions';

const getScrollPositions = () => {
  try {
    const saved = sessionStorage.getItem(SCROLL_POSITION_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error reading scroll positions:', error);
    return {};
  }
};

const saveScrollPositions = (positions) => {
  try {
    sessionStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(positions));
  } catch (error) {
    console.error('Error saving scroll positions:', error);
  }
};

const ScrollManager = ({ children }) => {
  const location = useLocation();

  // Routes that should always scroll to top
  const scrollToTopRoutes = ['/login', '/signup', '/forgot-password'];

  useEffect(() => {
    const shouldScrollToTop = scrollToTopRoutes.includes(location.pathname);

    if (shouldScrollToTop) {
      window.scrollTo(0, 0);
      return;
    }

    // Restore scroll position for other routes
    const scrollPositions = getScrollPositions();
    const savedPosition = scrollPositions[location.pathname];
    
    if (savedPosition) {
      requestAnimationFrame(() => {
        window.scrollTo(savedPosition.x, savedPosition.y);
      });
    } else {
      window.scrollTo(0, 0);
    }

    // Save scroll position
    const handleScroll = () => {
      const positions = getScrollPositions();
      positions[location.pathname] = {
        x: window.scrollX,
        y: window.scrollY
      };
      saveScrollPositions(positions);
    };

    let scrollTimeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout);
      if (!shouldScrollToTop) {
        handleScroll();
      }
    };
  }, [location.pathname]);

  return children;
};

export default ScrollManager;