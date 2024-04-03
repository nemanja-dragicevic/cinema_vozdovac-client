import { TextField } from "@mui/material";

const Input = ({password, name, label, value, reduce, onChange}) => {
    const handleChange = (event) => {
        onChange(name, event.target.value);
      }

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
      // !password ?
      //   <TextField id="filled-basic" name={name} onChange={handleChange}
      //   value={value}  label={label} variant="filled" error={false} size="small"
      //   />
      //   : 
      //   <TextField
      //   id="outlined-password-input"
      //   label="Password"
      //   type="password"
      //   autoComplete="current-password"
      //   variant="filled"
      //   name="password"
      //   onChange={handleChange}
      //   value={value}
      //   size="small"
      // />

     );
}
 
export default Input;
// style={reduce ? {width: '50px'} : {}}