import { Paper, TableBody, TableCell, TableRow } from "@mui/material";
// import TableHeader from "./TableHeader";
import { makeStyles } from "@mui/styles";
import useTable from "../utils/useTable";
import { useState } from "react";

const Table = ({ headCells, data, filterFn }) => {
  const { TblContainer, TblHead, TblPagination, dataAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);

  return (
    <Paper>
      <TblContainer>
        <TblHead />
        <TableBody>
          {dataAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
  );
};

export default Table;
