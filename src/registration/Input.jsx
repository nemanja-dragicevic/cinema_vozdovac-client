import { TextField } from "@mui/material";

const Input = ({ password, name, label, value, reduce, onChange }) => {
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
      error={false}
      size="small"
      type={password ? "password" : "text"}
    />
  );
};

export default Input;
