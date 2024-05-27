import { Button, Paper } from "@mui/material";
import Input from "../registration/Input";
import LockResetIcon from "@mui/icons-material/LockReset";

const ChangePassword = ({ errors, onChange, onChangePassword }) => {
  return (
    <div style={{ display: "flex", marginBottom: 30 }}>
      <Paper
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <Input
          name="oldPassword"
          label="Old Password"
          password={true}
          error={errors.oldPassword}
          onChange={onChange}
        />
        <Input
          name="newPassword"
          label="New Password"
          password={true}
          error={errors.newPassword}
          onChange={onChange}
        />
        <Input
          name="confirmNewPassword"
          label="Confirm New Password"
          password={true}
          error={errors.confirmNewPassword}
          onChange={onChange}
        />
        <Button variant="contained" color="primary" onClick={onChangePassword}>
          <LockResetIcon />
          Change Password
        </Button>
      </Paper>
    </div>
  );
};

export default ChangePassword;
