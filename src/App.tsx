/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { MasterPortalPage } from './pages/MasterPortalPage';
import { AdminPortalPage } from './pages/AdminPortalPage';

function RouterContent() {
  const { currentPath } = useApp();

  if (currentPath === '/fathersenaf21' || currentPath.startsWith('/fathersenaf21/')) {
    return <MasterPortalPage />;
  }

  if (
    currentPath === '/admin' || 
    currentPath.startsWith('/admin/') || 
    currentPath === '/adminvillage21' || 
    currentPath.startsWith('/adminvillage21/')
  ) {
    return <AdminPortalPage />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <AppProvider>
      <RouterContent />
    </AppProvider>
  );
}
