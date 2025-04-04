"use client";
import React from "react";
import { Box, InputBase, Paper } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

interface props {
  setSearch: any;
  defaultValue: any;
  inputSize: any
}
const CustomInputBase: React.FC<props> = ({ setSearch, defaultValue ,inputSize,}) => {

  const debounced = useDebouncedCallback(
    // function
    (search) => {
      setSearch(search);
    },
    1000
  );

  return (
    <Paper sx={{ borderRadius: "5px", width:inputSize}}  >
      <InputBase
        placeholder="search"
        sx={{ padding: "3px 10px", borderRadius: "10px" }}
        defaultValue={debounced(defaultValue)}
        onChange={(e) => debounced(e.target.value)}
      />
    </Paper>
  );
};
export default CustomInputBase;