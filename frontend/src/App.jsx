import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './store/store';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';

export function App() {
  // Global modal background scroll lock across all sections and portals
  useEffect(() => {
    const updateScrollLock = () => {
      // Look for any active modal overlay or dialog across all portals and sections
      const activeModal = document.querySelector(
        '.fixed.inset-0.z-50, .fixed.inset-0.z-\\[9999\\], [role="dialog"], [aria-modal="true"]'
      );

      if (activeModal) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };

    // Run check on initial load
    updateScrollLock();

    // Observe DOM mutations to immediately detect opening or closing of modals
    const observer = new MutationObserver(updateScrollLock);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
