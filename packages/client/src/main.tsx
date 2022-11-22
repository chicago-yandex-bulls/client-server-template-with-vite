import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import 'normalize.css';
import './index.css';
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundaries';
import { store } from './services/redux/store';
import { addServiceWorker } from './services/sw/addServiceWorker';
import { useCustomTheme } from './useCustomTheme';

if (import.meta.env.MODE === 'production') {
  addServiceWorker();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider theme={useCustomTheme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </Router>
);
