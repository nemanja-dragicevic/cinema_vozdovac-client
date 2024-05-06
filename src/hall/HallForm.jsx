import { Button } from "@mui/material";
import Input from "../registration/Input";

const HallForm = ({ data, onChange, errors, onReset, onSave }) => {
  return (
    <div style={{ display: "flex", marginTop: 20, marginBottom: 30, gap: 20 }}>
      <Input
        name="hallName"
        value={data.hallName}
        label="Hall name"
        onChange={onChange}
        error={errors.hallName}
      />
      <Input
        name="rowsCount"
        value={data.rowsCount}
        label="Rows count"
        onChange={onChange}
        error={errors.rowsCount}
      />
      <Input
        name="seatsPerRow"
        value={data.seatsPerRow}
        label="Seats per row"
        onChange={onChange}
        error={errors.seatsPerRow}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ height: 50 }}
        onClick={() => onSave(data)}
      >
        Save hall
      </Button>
      <Button onClick={onReset} variant="outlined" sx={{ height: 50 }}>
        Reset
      </Button>
    </div>
  );
};

export default HallForm;
