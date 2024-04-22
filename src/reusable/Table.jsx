import { TableBody, TableCell, TableRow } from "@mui/material";
import useTable from "../utils/useTable";

const Table = ({ headCells, data, filterFn, onDelete }) => {
  const { TblContainer, TblHead, TblPagination, dataAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
          {dataAfterPagingAndSorting().map((item) => (
            <TableRow key={item.actorID}>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(item.actorID)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
};

export default Table;
