import { Button, InputAdornment, Toolbar } from "@mui/material";
import SearchInput from "../reusable/SearchInput";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const TableSearch = ({ handleSearch, searching, label, onOpenPopup }) => {
  return (
    <Toolbar
      sx={{
        marginTop: 5,
        marginBottom: 3,
        display: "flex",
        flexDirection: "row",
        columnGap: 10,
      }}
    >
      <SearchInput
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
      />
      {searching ? null : (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onOpenPopup}
        >
          Add new
        </Button>
      )}
    </Toolbar>
  );
};

export default TableSearch;
