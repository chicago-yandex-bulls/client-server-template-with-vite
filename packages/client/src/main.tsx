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
import { getEnv } from './utils/getEnv';

if (getEnv('MODE') === 'production') {
  addServiceWorker();
}

const versionStrStyle: React.CSSProperties = {
  position: 'fixed',
  margin: 'auto 0 10px 10px',
  bottom: 0,
  left: 0,
  color: 'black',
  opacity: 0.5,
  fontSize: '12px',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider theme={useCustomTheme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
            <div style={versionStrStyle}>Version: {getEnv('VITE_CLIENT_VERSION')}</div>
          </ErrorBoundary>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </Router>
);
