import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const Popup = ({ title, children, openPopup, setOpen }) => {
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle id="responsive-dialog-title">
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {/* <div>Content here</div> */}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
