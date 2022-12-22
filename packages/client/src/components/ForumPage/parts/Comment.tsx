import { Avatar, Typography } from '@mui/material';
import React, { memo } from 'react';

import { getAuthorInitials } from '../../../utils/getAuthorInitials';
import { getCreatedAtValue } from '../../../utils/getCreatedAtValue';
import { TComment } from '../ForumPage.types';
import { useStyles } from '../useStyles';

type TProps = { data: TComment };

const Comment = ({ data }: TProps) => {
  const { author, content, createdAt } = data;

  const classes = useStyles();

  const createdAtValue = getCreatedAtValue(createdAt);
  const authorInitials = getAuthorInitials(author);

  return (
    <div className={classes.comment}>
      <div className={classes.commentAuthor}>
        <Avatar src={author.avatar} sx={{ width: 50, height: 50 }}>
          {authorInitials}
        </Avatar>
        <div className={classes.commentAuthorName}>
          <Typography variant="h6">{[author.second_name, author.first_name].join(' ')}</Typography>
        </div>
        <Typography className={classes.commentCreatedAt} variant="caption" color={'textSecondary'}>
          {createdAtValue}
        </Typography>
      </div>
      <Typography variant={'body1'} className={classes.commentContent}>
        {content}
      </Typography>
    </div>
  );
};

function isEqual(prev: TProps, next: TProps) {
  return prev.data.id === next.data.id;
}

export const MemoizedComment = memo(Comment, isEqual);
