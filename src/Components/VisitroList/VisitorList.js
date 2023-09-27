import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function VisitorList({ refresh}) {
  const [data, setData] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
    setDeleteAll(false);
  }, [refresh]);

  const toggleAll = () => {
    const updatedData = data.map((el) => ({ ...el, checked: !deleteAll }));
    setData(updatedData);
    setDeleteAll(!deleteAll);
  };

  const toggleItem = (index) => {
    const updatedData = [...data];
    updatedData[index].checked = !updatedData[index].checked;
    setData(updatedData);
    setDeleteAll(updatedData.every((a) => a.checked));
  };

  const removeVisitor = () => {
        const newData = data.filter((el)=> !el.checked)
        setData(newData)
        localStorage.setItem('data', JSON.stringify(newData))
    setDeleteAll(false);
  }

  return (
    <div>
      <p className="title">Visitor management</p>
      <div>
        <Checkbox
          checked={deleteAll}
          onChange={toggleAll}
          color="warning"
        />{" "}
        <Button
          sx={{
            borderColor: "#EF5742",
            color: "white",
            backgroundColor: "#EF5742",
          }}
          variant="contained"
          color="warning"
          onClick={()=>removeVisitor()}
        >
          REMOVE
        </Button>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Visitor</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ padding: 0 }} component="th" scope="row">
                    <Checkbox
                      checked={row.checked}
                      color="warning"
                      onChange={() => toggleItem(index)}
                    />{" "}
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">{row.dep}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}