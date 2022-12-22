import { Dialog, DialogContent, DialogTitle, Button, DialogActions, TextField } from '@mui/material';
import React from 'react';

import { TTheme } from '../ForumPage.types';
import { useStyles } from '../useStyles';

type TFormData = Pick<TTheme, 'title' | 'content'>;

type TProps = {
  isOpen: boolean;
  onCreate: (data: TFormData) => void;
  onCancel: () => void;
};

export const CreateTopicModal = ({ isOpen, onCreate, onCancel }: TProps) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<TFormData>({
    title: '',
    content: '',
  });

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>CREATE A TOPIC</DialogTitle>
      <DialogContent>
        <div className={classes.modalWrapper}>
          <TextField
            name="title"
            value={formData.title}
            onChange={changeInputDataHandler}
            color={'secondary'}
            label={'Title'}
            required
            fullWidth
            className={classes.input}
          />
          <TextField
            name="content"
            value={formData.content}
            onChange={changeInputDataHandler}
            color={'secondary'}
            label={'Content'}
            required
            fullWidth
            multiline
            rows={10}
            className={classes.input}
            inputProps={{
              maxLength: 1000,
            }}
          />
        </div>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            CANCEL
          </Button>
          <Button
            onClick={() => {
              onCreate(formData);
              setFormData({
                content: '',
                title: '',
              });
            }}
            color="secondary"
            variant="contained">
            CREATE
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
