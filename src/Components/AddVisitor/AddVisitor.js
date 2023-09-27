import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";

export default function AddVisitor({refresh, setRefresh}) {
  const [isChecked, setIsChecked] = useState(false);
  const [disable, setDisable] = useState(true);
  const [data, setData] = useState({
    id: Date.now(),
    name: "",
    email: "",
    dep: "",
  });

  useEffect(() => {
    const isValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const { name, email, dep } = data;
    if (!name || !isValid.test(email) || !dep) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [data.name, data.email, data.dep]);

  const submit = () => {
    if(disable){
      alert("fill the fields")
    }else{
      const visitor = JSON.parse(localStorage.getItem("data")) || []
      data.checked = false
      visitor?.push(data)
      localStorage.setItem("data", JSON.stringify(visitor));
      setIsChecked(false)
      setData({
        id: Date.now(),
        name: "",
        email: "",
        dep: "",
      });
      setRefresh(!refresh)
    }
  };
  return (
    <div id="main">
      <p className="title">Add new visitor</p>
      <TextField
        className="input"
        onBlur={() => {
          !data.name && alert("error");
        }}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        id="outlined-basic"
        label="Full name"
        variant="outlined"
        value={data.name}
        color="warning"
      />
      <TextField
        className="input"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        id="outlined-basic"
        label="Email address"
        variant="outlined"
        value={data.email}
        color="warning"
      />
      <FormControl>
        <InputLabel className="input" color="warning">
          Department
        </InputLabel>
        <Select
          label="Department"
          color="warning"
          className="input"
          value={data.dep}
          onChange={(e) => setData({ ...data, dep: e.target.value })}
        >
          <MenuItem value={"Marketing"}>Marketing</MenuItem>
          <MenuItem value={"IT"}>IT</MenuItem>
          <MenuItem value={"Sales"}>Sales</MenuItem>
          <MenuItem value={"Management"}>Management</MenuItem>
        </Select>
      </FormControl>
      <div className="checkbox">
        <FormControlLabel
          control={
            <Checkbox
              color="warning"
              onChange={() => setIsChecked(!isChecked)}
              checked={isChecked}
            />
          }
          label="I agree to be added to the table"
        />
      </div>
      <div className="buttons">
        <Button
          sx={{ borderColor: "#EF5742", color: "#EF5742", width: "70%" }}
          variant="outlined"
          color="warning"
          onClick={() =>
            setData({
              id: Date.now(),
              name: "",
              email: "",
              dep: "",
            })
          }
        >
          RESET FORM
        </Button>
        <Button
          sx={{
            borderColor: "#EF5742",
            color: "white",
            backgroundColor: "#EF5742",
            width: "100%",
          }}
          disabled={!isChecked}
          variant="contained"
          color="warning"
          onClick={() => submit()}
        >
          ADD NEW VISITOR
        </Button>
      </div>
    </div>
  );
}
