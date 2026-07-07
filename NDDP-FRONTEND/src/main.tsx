import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import { router } from '@/app/router';
import '@/index.css';
import '@/modules/cloud/api/cloud.api';

function ThemeInit() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('nddtp_theme', 'light');
  }, []);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeInit />
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#ffffff', color: '#000000', border: '1px solid #e5e5e5' },
        }}
      />
    </Provider>
  </StrictMode>,
);
