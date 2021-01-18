/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default function MyModal(props: any): JSX.Element {
  const [open, setOpen] = useState(true);
  const { title, body } = props;
  const handleClose = (): void => {
    setOpen(false);
  };
  const modalStyle = {
    top: `${50}%`,
    left: `${50}%`,
    backgroundColor: '#212121',
    color: '#FFF',
    transform: `translate(-${50}%, -${50}%)`,
  };
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 className="text-center" id="simple-modal-title">
          {title}
        </h2>
        <p className="text-center" id="simple-modal-description">
          {body}
        </p>
        <Button onClick={handleClose} variant="contained" className="btn-block">
          OK!
        </Button>
      </div>
    </Modal>
  );
}