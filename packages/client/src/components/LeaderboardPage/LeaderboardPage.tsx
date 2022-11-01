import { useEffect, useState } from 'react';

import GameFinalScreen from './GameFinalScreen/GameFinalScreen';
import LeaderRow from './LeaderRow/LeaderRow';
import { TLeaderData, TLeaders } from './types';
import { useStyles } from './useStyles';

import useLeaderboardController from '../../services/controllers/useLeaderboardController';
import { useAppSelector } from '../../store/hooks';
import Layout from '../Layout/Layout';

const LeaderboardPage = () => {
  const styles = useStyles();
  const { lastScore } = useAppSelector(state => state.common);
  const [leaders, setLeaders] = useState<TLeaders>([]);
  const { getAllLeaderboard } = useLeaderboardController();

  useEffect(() => {
    getAllLeaderboard(setLeaders);
  }, []);

  return (
    <Layout>
      {lastScore !== null && <GameFinalScreen />}
      <div className={styles.leaderBoard}>
        <div className={styles.header}>
          <div className={styles.top5}>
            top<span>10</span>
          </div>
          <div className={styles.title}>leader board</div>
        </div>
        {leaders &&
          leaders.map((gamer: TLeaderData, index: number) => {
            const { username, points } = gamer.data;

            if (!username) {
              return;
            }

            return <LeaderRow key={username} username={username} points={points} position={index + 1} />;
          })}
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
