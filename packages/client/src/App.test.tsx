import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import 'jest-canvas-mock';

import { App } from './App';
import { store } from './services/redux/store';
import { useCustomTheme } from './useCustomTheme';

jest.mock('./utils/getEnv.ts');

const LOGO_CONTENT = 'Yandex Practicum Web Gaming';

test('Logo is rendered', async () => {
  render(
    <Router>
      <ThemeProvider theme={useCustomTheme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  );
  expect(screen.getByText(LOGO_CONTENT)).toBeDefined();
});
