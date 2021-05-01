import React from "react";
import { TextField } from "@material-ui/core";

function CustomInputTextField(props) {
  const shouldAutoComplete = props.autoComplete || "off";

  return (
    <TextField
      {...props}
      inputProps={{
        maxLength: props.maxLength,
        minLength: props.minLength
      }}
      autoComplete={shouldAutoComplete}
    />
  );
}

export default CustomInputTextField;
