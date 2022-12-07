import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CreateOrJoinGamePage } from './components/CreateOrJoinGamePage/CreateOrJoinGamePage';
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundaries';
import { ForumPage } from './components/ForumPage/ForumPage';
import { GamePage } from './components/GamePage/GamePage';
import Layout from './components/Layout/Layout';
import { MultiGamePage } from './components/MultiGamePage/MultiGamePage';
import NoAuthPage from './components/NoAuthPage/NoAuthPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { StartPage } from './components/StartPage/StartPage';
import { WaitingRoomPage } from './components/WaitingRoomPage/WaitingRoomPage';
import { useSnackbarError } from './hooks/useSnackbarError';
import { useGetUserQuery } from './services/redux/queries/user.api';
import { getUserIdSelector } from './services/redux/selectors/getUserSelector';
import { useAppSelector } from './services/redux/store';

import { version } from '../package.json';

const versionStrStyle: React.CSSProperties = {
  position: 'fixed',
  margin: 'auto 0 10px 10px',
  bottom: 0,
  left: 0,
  color: 'black',
  opacity: 0.5,
  fontSize: '12px',
};

export function App(): JSX.Element {
  useGetUserQuery();

  const isUserAuthorized = !!useAppSelector(getUserIdSelector);

  const { SnackbarErrorComp } = useSnackbarError();

  return (
    <ErrorBoundary>
      <div className="App">
        <Layout>
          <Routes>
            <Route path={'/'} element={<StartPage />} />
            <Route path={'/game'} element={<GamePage />} />
            <Route
              path={'/create-or-join-game'}
              element={isUserAuthorized ? <CreateOrJoinGamePage /> : <NoAuthPage />}
            />
            <Route path={'/waiting-room'} element={isUserAuthorized ? <WaitingRoomPage /> : <NoAuthPage />} />
            <Route path={'/multi-game'} element={isUserAuthorized ? <MultiGamePage /> : <NoAuthPage />} />
            <Route path={'/profile'} element={isUserAuthorized ? <ProfilePage /> : <NoAuthPage />} />
            <Route path={'/forum'} element={<ForumPage />} />
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </Layout>
        <SnackbarErrorComp />
      </div>
      <div style={versionStrStyle}>Version: {version}</div>
    </ErrorBoundary>
  );
}
