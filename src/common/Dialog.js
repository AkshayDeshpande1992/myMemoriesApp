import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { Typography,CardMedia } from "@material-ui/core/";



export default function DialogFn(props) {
  const { onClose,open,title,message,img } = props;

  const styles = {
    dialog: {
        backgroundImage: `url(${img})`,
        backgroundBlendMode: 'darken'
    }
  };

  const handleClose = () => {
    onClose();
  };

  const DialogWithBackgroundImage = withStyles(styles)(({ classes }) => (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      onClose={handleClose}
    >
        <DialogTitle id="customized-dialog-title"><Typography variant="h6">{title}</Typography></DialogTitle>
      {/* /*<DialogTitle id="customized-dialog-title"><Typography variant="h6">{title}</Typography></DialogTitle>
      <DialogContent style={{ height: 400, width: 450 }}>
        <div><image src={img}></image></div>
        { <Typography variant="h6">{message}</Typography> }
      </DialogContent> */}
        <img height="300" width="350" src={img} alt={title} />
    </Dialog>
  ));
  

  return (
    <div>
    <DialogWithBackgroundImage/>
    </div>
  );
}
