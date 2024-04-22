import { TextField } from "@mui/material";

const Input = ({ password, name, label, value, onChange, error }) => {
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };

  return (
    <TextField
      id="filled-basic"
      name={name}
      onChange={handleChange}
      value={value}
      label={password ? "Password" : label}
      variant="filled"
      error={error.error}
      helperText={error.message ? error.message : ""}
      size="small"
      sx={{ width: 200 }}
      type={password ? "password" : "text"}
    />
  );
};

export default Input;
