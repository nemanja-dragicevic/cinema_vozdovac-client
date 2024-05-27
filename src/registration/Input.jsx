import { TextField } from "@mui/material";

const Input = ({ password, name, label, value, onChange, error, ...rest }) => {
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };

  return (
    <TextField
      id="filled-basic"
      name={name}
      onChange={handleChange}
      value={value}
      label={label}
      variant="filled"
      error={error.error}
      helperText={error.message ? error.message : ""}
      size="small"
      sx={{ width: 200 }}
      type={password ? "password" : "text"}
      {...rest}
    />
  );
};

export default Input;
