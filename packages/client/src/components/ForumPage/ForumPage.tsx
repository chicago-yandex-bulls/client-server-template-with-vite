import { Comment as CommentIcon, ArrowBack as ArrowBackIcon, Add as PlusIcon } from '@mui/icons-material';
import { Avatar, Button, List, ListItemButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { TTheme } from './ForumPage.types';
import { MemoizedComment } from './parts/Comment';
import { CreateTopicModal } from './parts/CreateTopicModal';
import { useStyles } from './useStyles';

import { RESOURCES_URL } from '../../../../shared/consts/common';
import {
  useCreateCommentMutation,
  useCreateTopicMutation,
  useGetTopicsQuery,
} from '../../services/redux/queries/forum.api';
import { getUserIdSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../services/redux/store';
import { useNavigatorOnLine } from '../../services/sw/useNavigatorOnLine';
import { getAuthorInitials } from '../../utils/getAuthorInitials';
import { getCreatedAtValue } from '../../utils/getCreatedAtValue';

export const ForumPage = () => {
  const classes = useStyles();

  const userId = useAppSelector(getUserIdSelector);
  const isUserAuthorized = !!userId;

  const [createTopic] = useCreateTopicMutation();
  const [addComment] = useCreateCommentMutation();
  const { data } = useGetTopicsQuery();

  const isOnline = useNavigatorOnLine();

  const canUserWrite = isUserAuthorized && isOnline;

  const [selectedTheme, setSelectedTheme] = useState<TTheme | null>(null);
  const [commentValue, setCommentValue] = useState<string>('');
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState<boolean>(false);

  const createdAtValue = selectedTheme?.createdAt ? getCreatedAtValue(selectedTheme.createdAt) : '';
  const authorInitials = selectedTheme?.author ? getAuthorInitials(selectedTheme.author) : '';

  useEffect(() => {
    if (selectedTheme?.id && Array.isArray(data)) {
      setSelectedTheme(data.find(data => data.id === selectedTheme.id) || null);
    }
  }, [data]);

  return (
    <div>
      <div className={classes.wrapper}>
        <List className={classes.themeList}>
          <Button
            variant={'text'}
            color={'primary'}
            size={'small'}
            disabled={!canUserWrite}
            className={classes.createTopicBtn}
            onClick={() => setIsCreateTopicModalOpen(true)}>
            <PlusIcon fontSize="inherit" color="primary" /> Create a topic
          </Button>
          {data?.map(item => (
            <ListItemButton
              selected={selectedTheme?.title === item.title}
              key={item.id}
              onClick={() => {
                setSelectedTheme(item);
                setCommentValue('');
              }}>
              <div className={classes.themeItem}>
                <div> {item.title}</div>
                <div className={classes.commentCount}>
                  <CommentIcon fontSize="small" color="secondary" /> {item.comments?.length || 0}
                </div>
              </div>
            </ListItemButton>
          ))}

          <CreateTopicModal
            isOpen={isCreateTopicModalOpen}
            onCreate={data => {
              createTopic({ ...data, authorId: userId || null });
              setIsCreateTopicModalOpen(false);
            }}
            onCancel={() => setIsCreateTopicModalOpen(false)}
          />
        </List>

        {!selectedTheme ? (
          <div className={classes.emptyBlock}>
            <ArrowBackIcon fontSize="large" fontVariant={'outlined'} />
            <Typography variant="h4">Choose a topic</Typography>
          </div>
        ) : (
          <>
            <div className={classes.themeContainer}>
              <Typography component={'div'} color={'textSecondary'} variant="body2" align={'right'}>
                Created at:{' '}
                <Typography component={'span'} variant="inherit">
                  {createdAtValue}
                </Typography>
              </Typography>
              <div className={classes.themeTitle}>
                <div className={classes.themeAuthor}>
                  <Avatar src={RESOURCES_URL + selectedTheme.author.avatar} sx={{ width: 100, height: 100 }}>
                    {authorInitials}
                  </Avatar>
                  <Typography variant="body1">{selectedTheme.author.second_name}</Typography>
                  <Typography variant="body1">{selectedTheme.author.first_name}</Typography>
                </div>
                <Typography variant="h3">{selectedTheme.title}</Typography>
              </div>
              <Typography className={classes.themeContent} variant={'body1'}>
                {selectedTheme.content}
              </Typography>
              <div className={classes.comments}>
                {canUserWrite && (
                  <TextField
                    color="secondary"
                    label="Write a comment"
                    multiline
                    rows={3}
                    size={'small'}
                    value={commentValue}
                    onChange={e => {
                      setCommentValue(e.target.value);
                    }}
                  />
                )}
                {canUserWrite && (
                  <Button
                    variant={'text'}
                    color={'info'}
                    size={'small'}
                    disabled={!commentValue}
                    onClick={() => {
                      addComment({
                        authorId: userId || null,
                        topicId: selectedTheme.id,
                        content: commentValue,
                      });
                      setCommentValue('');
                    }}
                    className={classes.btn}>
                    Send
                  </Button>
                )}
                <Typography variant={'h6'}>Comments: {selectedTheme.comments?.length || 0}</Typography>
                {selectedTheme.comments?.map(comment => (
                  <MemoizedComment key={comment.id} data={comment} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
