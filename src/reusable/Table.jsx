import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import useTable from "../utils/useTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import CheckBox from "@mui/material/Checkbox";
import Input from "../registration/Input";

const Table = ({
  headCells,
  data,
  filterFn,
  onDelete,
  setEditObj,
  objectKey,
  fields,
  selection,
  hideChecked,
  arrayField,
  deleteMoreData,
}) => {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#bbdefb",
        dark: "#e1f5fe",
        contrastText: "#0d47a1",
      },
    },
  });

  //const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, dataAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);

  const closeDialog = (id, ...params) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    onDelete(id, ...params);
  };

  const getNestedProperty = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {dataAfterPagingAndSorting().map((item) => (
              <TableRow key={item[objectKey]}>
                {fields.map((field) => (
                  <TableCell key={field}>
                    {Array.isArray(item[field])
                      ? item[field]
                          .map((arrayItem) => arrayItem[arrayField])
                          .join(", ")
                      : //: item[field]}
                        getNestedProperty(item, field)}
                  </TableCell>
                ))}
                <TableCell>
                  {selection ? (
                    <>
                      {item.checked && !hideChecked ? (
                        <Input
                          name="roleName"
                          value={item.roleName || item.display}
                          error={false}
                          disabled={true}
                        />
                      ) : null}
                      <CheckBox
                        checked={item.checked}
                        onClick={setEditObj}
                        value={item[objectKey]}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </>
                  ) : (
                    <>
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
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title:
                              "Are you sure you want to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              const id = item[objectKey];
                              const additionalData =
                                deleteMoreData.length > 0
                                  ? deleteMoreData.map((field) => item[field])
                                  : [];
                              closeDialog(id, additionalData);
                            },
                          });
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </ThemeProvider>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirm={setConfirmDialog}
      />
    </>
  );
};

Table.defaultProps = {
  arrayField: "name",
  deleteMoreData: [],
};

export default Table;
