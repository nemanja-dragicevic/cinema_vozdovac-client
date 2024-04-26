import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import useTable from "../utils/useTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({ headCells, data, filterFn, onDelete, setEditObj }) => {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#bbdefb",
        dark: "#e1f5fe",
        contrastText: "#0d47a1",
      },
    },
  });

  const { TblContainer, TblHead, TblPagination, dataAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {dataAfterPagingAndSorting().map((item) => (
              <TableRow key={item.actorID}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setEditObj(item);
                    }}
                  >
                    <EditOutlinedIcon />
                  </Button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => onDelete(item.actorID)}
                  >
                    <DeleteIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </ThemeProvider>
    </>
  );
};

export default Table;
