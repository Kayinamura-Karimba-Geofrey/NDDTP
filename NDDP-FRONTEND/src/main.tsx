import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import { router } from '@/app/router';
import '@/index.css';
import '@/modules/cloud/api/cloud.api';
import '@/modules/authentication/api/auth.api';
import '@/modules/authentication/api/security.api';
import '@/modules/authorization/api/authorization.api';
import '@/modules/users/api/users.api';
import '@/modules/personnel/api/personnel.api';
import '@/modules/recruitment/api/recruitment.api';
import '@/modules/leave/api/leave.api';
import '@/modules/welfare/api/welfare.api';
import '@/modules/medical/api/medical.api';
import '@/modules/training/api/training.api';
import '@/modules/assets/api/asset.api';
import '@/modules/inventory/api/inventory.api';
import '@/modules/procurement/api/procurement.api';
import '@/modules/finance/api/finance.api';
import '@/modules/performance/api/performance.api';
import '@/modules/fleet/api/fleet.api';
import '@/modules/dms/api/dms.api';

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
