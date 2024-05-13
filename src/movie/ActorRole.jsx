import { Button } from "@mui/material";
import Input from "../registration/Input";

const ActorRole = ({ value, errors, onChange, addRole }) => {
  return (
    <>
      <Input
        name="roleName"
        value={value}
        label="Actor role"
        error={errors}
        onChange={onChange}
        multiline
      />
      <Button variant="contained" color="secondary" onClick={addRole}>
        Add
      </Button>
    </>
  );
};

export default ActorRole;
