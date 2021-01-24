/* eslint-disable prettier/prettier */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

export interface ValuesProps {
  title: string;
}

export default function ConsecutiveSnackbars(props: ValuesProps): JSX.Element {
  const [snackPack, setSnackPack] = React.useState<SnackbarMessage[]>([]);
  const [open, setOpen] = React.useState(true);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message: string) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose: any = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = (): void => {
    setMessageInfo(undefined);
  };
  const { title } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={title}
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <Button color="primary" size="small" onClick={handleClose}>
              OK
            </Button>
          </>
        }
      />
    </div>
  );
}
