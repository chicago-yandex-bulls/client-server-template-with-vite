import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { useStyles } from './useStyles';

import { TLeaderProps } from '../types';

type TleaderRow = FC<TLeaderProps>;

const LeaderRow: TleaderRow = ({ points, username, position }) => {
  const styles = useStyles();

  return (
    <div className={styles.leaderRow}>
      <div className={styles.nickNameWrapper}>
        <Typography variant={'h2'} className={styles.position}>
          {position}
        </Typography>
        <Typography variant={'h2'} className={styles.nickName}>
          {username}
        </Typography>
      </div>
      <Typography variant={'h2'} className={styles.score}>
        {points}
        <Typography variant={'h2'} className={styles.points}>
          points
        </Typography>
      </Typography>
    </div>
  );
};

export default React.memo(LeaderRow);
