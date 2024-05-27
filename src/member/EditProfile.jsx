import { Button, MenuItem, Paper, Select } from "@mui/material";
import Input from "../registration/Input";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EditProfile = ({
  data,
  errors,
  handleChange,
  onCancel,
  onSave,
  onDateChange,
  onGenderChange,
}) => {
  const maxDate = dayjs().subtract(14, "year");

  return (
    <div style={{ display: "flex", marginBottom: 30, gap: 20 }}>
      <Paper sx={{ padding: 3 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 20,
            alignItems: "center",
          }}
        >
          <Input
            name="firstName"
            label="First Name"
            error={errors.firstName}
            value={data.firstName}
            onChange={handleChange}
          />
          <Input
            name="lastName"
            label="Last Name"
            error={errors.lastName}
            onChange={handleChange}
            value={data.lastName}
          />
          <Input
            name="email"
            label="Email"
            error={errors.email}
            value={data.email}
            onChange={handleChange}
          />
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={data.gender}
            label="Gender"
            onChange={onGenderChange}
            size="small"
            name="gender"
          >
            <MenuItem value={"MALE"}>Male</MenuItem>
            <MenuItem value={"FEMALE"}>Female</MenuItem>
          </Select>
          <DatePicker
            disableFuture
            maxDate={maxDate}
            onChange={onDateChange}
            format="D/MM/YYYY"
            label="Birth Date"
            value={new dayjs(data?.birthDate)}
          />
          <Input
            name="username"
            label="Username"
            error={errors.username}
            onChange={handleChange}
            value={data.username}
          />
          <div style={{ display: "flex", columnGap: 30 }}>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save Profile
            </Button>
            <Button variant="contained" color="primary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Paper>
      {/* <Popup>
          <ChangePassword />
        </Popup> */}
    </div>
  );
};

export default EditProfile;
