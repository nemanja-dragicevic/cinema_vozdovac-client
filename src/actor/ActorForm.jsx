import { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Input from "../registration/Input";

const ActorForm = ({ onSave, errors }) => {
  const initialFValues = {
    actorID: 0,
    firstName: "",
    lastName: "",
    gender: "MALE",
  };
  const [data, setData] = useState(initialFValues);

  const handleChange = (name, value) => {
    if (name !== "firstName" && name !== "lastName") {
      setData((prevData) => ({
        ...prevData,
        ["gender"]: value,
      }));
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setData(initialFValues);
  };

  return (
    <div style={{ display: "flex", marginTop: 20, marginBottom: 30, gap: 20 }}>
      <Input
        name="firstName"
        value={data.firstName}
        label="First name"
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        name="lastName"
        value={data.lastName}
        label="Last name"
        onChange={handleChange}
        error={errors.lastName}
      />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="gender"
          value={data.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
          <FormControlLabel value="MALE" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        sx={{ height: 50 }}
        onClick={() => onSave(data)}
      >
        Save actor
      </Button>
      <Button onClick={handleReset} variant="outlined" sx={{ height: 50 }}>
        Reset
      </Button>
    </div>
  );
};

export default ActorForm;
