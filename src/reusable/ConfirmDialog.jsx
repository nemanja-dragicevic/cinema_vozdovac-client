import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import NotListedLocationSharpIcon from "@mui/icons-material/NotListedLocationSharp";

const ConfirmDialog = ({ confirmDialog, setConfirm, onDelete }) => {
  return (
    <Dialog open={confirmDialog}>
      <DialogTitle>
        <NotListedLocationSharpIcon color="secondary" fontSize="large" />
      </DialogTitle>
      <DialogActions>
        <Button variant="outlined" onClick={() => setConfirm(false)}>
          No
        </Button>
        <Button
          variant="outlined"
          color="primary"
          //onClick={() => setConfirm(false)}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
