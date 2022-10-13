import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ForumPage } from './components/ForumPage/ForumPage';
import { GamePage } from './components/GamePage/GamePage';
import NoAuthPage from './components/NoAuthPage/NoAuthPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { StartPage } from './components/StartPage/StartPage';
import { IS_AUTHORIZED_KEY } from './utils/constants';

export function App(): JSX.Element {
  const isAuthorized = !!sessionStorage.getItem(IS_AUTHORIZED_KEY);
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={'/'} element={<StartPage />} />
          <Route path={'/game'} element={isAuthorized ? <GamePage /> : <NoAuthPage />} />
          <Route path={'/profile'} element={isAuthorized ? <ProfilePage /> : <NoAuthPage />} />
          <Route path={'/forum'} element={isAuthorized ? <ForumPage /> : <NoAuthPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}
