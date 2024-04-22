import { TextField } from "@mui/material";

const SearchInput = ({ label, name, onChange, ...other }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      onChange={onChange}
      color="secondary"
      {...other}
      sx={{
        width: "50%",
        "& .MuiOutlinedInput-root": {
          color: "#000",
          fontFamily: "Arial",
          fontWeight: "bold",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
            borderWidth: "2px",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#333996",
              borderWidth: "3px",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "primary.main",
            fontWeight: "bold",
            "&.Mui-focused": {
              color: "#333996",
              fontWeight: "bold",
            },
          },
        },
      }}
    />
  );
};

export default SearchInput;
