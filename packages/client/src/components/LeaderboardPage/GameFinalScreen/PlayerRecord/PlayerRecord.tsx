import React from 'react';

import { useStyles } from './useStyles';

import { TSnakeColor } from '../../../../../../shared/types';
import { PRETTY_SNAKE_COLORS } from '../../../../consts/prettySnakeColors';
import { SnakeIcon } from '../../../SnakeIcon';

type TPlayerRecordProps = {
  place: number;
  name: string;
  points: number;
  color: TSnakeColor;
  isCurrentPlayer: boolean;
};

export const PlayerRecord = (props: TPlayerRecordProps) => {
  const { place, name, points, color = 'red', isCurrentPlayer } = props;
  const classes = useStyles();

  return (
    <div className={`${classes.wrapper} ${isCurrentPlayer && classes.currentPlayer}`}>
      <p className={classes.place}>{place}</p>
      <SnakeIcon color={PRETTY_SNAKE_COLORS[color]} />
      <p className={classes.login}>
        {name} <span>{isCurrentPlayer && '(you)'}</span>
      </p>
      <p className={classes.points}>{points} points</p>
    </div>
  );
};
