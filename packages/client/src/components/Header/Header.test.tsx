import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import '@testing-library/jest-dom';

import Header from './Header';

import { store } from '../../services/redux/store';
import { useCustomTheme } from '../../useCustomTheme';

jest.mock('../../utils/getEnv.ts');

test('asdasd', async () => {
  render(
    <Router>
      <ThemeProvider theme={useCustomTheme}>
        <Provider store={store}>
          <Header />
        </Provider>
      </ThemeProvider>
    </Router>
  );
  const root = await screen.findByText(/chicago/i);
  expect(root).toBeInTheDocument();
});
