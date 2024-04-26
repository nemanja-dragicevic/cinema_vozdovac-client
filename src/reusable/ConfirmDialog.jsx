import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import NotListedLocationSharpIcon from "@mui/icons-material/NotListedLocationSharp";

const ConfirmDialog = ({ confirmDialog, setConfirm }) => {
  return (
    <Dialog open={confirmDialog.isOpen} style={{ textAlign: "center" }}>
      <DialogTitle
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "6rem",
          },
        }}
      >
        <NotListedLocationSharpIcon color="error" fontSize="large" />
      </DialogTitle>
      <DialogContent color="secondary.light">
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={() => setConfirm({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
