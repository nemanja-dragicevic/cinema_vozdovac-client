import { Button } from "@mui/material";
import Input from "../registration/Input";

const GenreForm = ({data, error, onChange, onSave}) => {
    return ( 
        <div style={{ display: "flex", marginTop: 20, marginBottom: 30, gap: 20 }}>
            <Input name="name" value={data.name} label="Genre name" error={error.name} onChange={onChange}/>
            <Button variant="contained" color="primary" sx={{ height: 50 }} onClick={onSave}>Save genre</Button>
        </div>
     );
}
 
export default GenreForm;