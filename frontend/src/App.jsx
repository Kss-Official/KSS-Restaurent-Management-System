import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './store/store';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
