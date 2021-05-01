import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

function CustomSelect(props) {
  return (
    <FormControl>
      <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
      <Select
        {...props}
        native
        onChange={props.onChange}
        inputProps={{
          name: props.name,
          id: props.id
        }}
      >
        {props.children}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
