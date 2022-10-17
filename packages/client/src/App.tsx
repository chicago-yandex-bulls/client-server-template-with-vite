import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ForumPage } from './components/ForumPage/ForumPage';
import { GamePage } from './components/GamePage/GamePage';
import LeaderboardPage from './components/LeaderboardPage/LeaderboardPage';
import Loader from './components/Loader/Loader';
import NoAuthPage from './components/NoAuthPage/NoAuthPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { StartPage } from './components/StartPage/StartPage';
import useAuthController from './services/controllers/useAuthController';
import { useAppSelector } from './store/hooks';

export function App(): JSX.Element {
  const { checkUserAuth } = useAuthController();
  const { isLoading, currentUser } = useAppSelector(state => state.common);
  const { id } = currentUser;

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <div className="App">
      {isLoading && <Loader />}
      <Routes>
        <Route path={'/'} element={<StartPage />} />
        <Route path={'/game'} element={id ? <GamePage /> : <NoAuthPage />} />
        <Route path={'/profile'} element={id ? <ProfilePage /> : <NoAuthPage />} />
        <Route path={'/forum'} element={id ? <ForumPage /> : <NoAuthPage />} />
        <Route path={'/leaderboard'} element={id ? <LeaderboardPage /> : <NoAuthPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
