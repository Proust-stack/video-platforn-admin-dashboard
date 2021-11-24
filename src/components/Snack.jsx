import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Snack = ({isOpen, handleClose, message}) => {
    return (
        <Snackbar 
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={4000}
        >
            <Alert 
            severity="success" 
            onClose={handleClose}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Snack;