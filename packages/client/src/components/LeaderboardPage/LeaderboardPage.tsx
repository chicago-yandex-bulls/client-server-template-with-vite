import { FC, useEffect, useState } from 'react';

import GameFinalScreen from './GameFinalScreen/GameFinalScreen';
import { leaderDataType, leadersType } from './types';
import { useStyles } from './useStyles';

import { leaderBoardsleaders } from '../../mocks';
import { useAppSelector } from '../../store/hooks';
import Layout from '../Layout/Layout';

type leaderRowType = FC<leaderDataType>;

const LeaderRow: leaderRowType = ({ scores, nickname, position }) => {
  const styles = useStyles();

  return (
    <div className={styles.leaderRow}>
      <div className={styles.nickNameWrapper}>
        <div className={styles.position}>{position}</div>
        <div className={styles.nickName}>{nickname}</div>
      </div>
      <div className={styles.score}>{scores}</div>
    </div>
  );
};

const LeaderboardPage = () => {
  const styles = useStyles();
  const { lastScore } = useAppSelector(state => state.common);
  const [leaders, setLeaders] = useState<leadersType>();
  useEffect(() => {
    //  Допустим тут будем обращаться к апи.
    setLeaders(leaderBoardsleaders);
  }, []);

  return (
    <Layout>
      {lastScore !== null && <GameFinalScreen score={lastScore} />}
      <div className={styles.leaderBoard}>
        <div className={styles.header}>
          <div className={styles.top5}>
            top<span>5</span>
          </div>
          <div className={styles.title}>leader board</div>
        </div>
        {leaders &&
          leaders.map(l => {
            return <LeaderRow key={l.id} id={l.id} nickname={l.nickname} scores={l.scores} position={l.position} />;
          })}
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
