import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import { router } from '@/app/router';
import '@/index.css';

function ThemeInit() {
  useEffect(() => {
    const resolved = store.getState().theme.resolved;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
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
          style: { background: 'var(--color-card)', color: 'var(--color-foreground)', border: '1px solid var(--color-border)' },
        }}
      />
    </Provider>
  </StrictMode>,
);
