import { Button } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

function CustomButton(props) {
  let { colorVariant, ...rest } = props;
  if (!colorVariant) colorVariant = "default";

  const customStyles = makeStyles({
    root: {
      font: "inherit",
      textDecoration: "none"
    },
    default: {},
    primary: {
      background: "#3f51b5",
      color: "white",
      "&:hover": {
        backgroundColor: "#303f9f"
      },
      "&:active": {
        backgroundColor: "#303f9f"
      },
      "&:focus": {
        backgroundColor: "#303f9f"
      }
    },
    secondary: {
      background: blueGrey[300],
      "&:hover": {
        backgroundColor: blueGrey[500]
      },
      "&:active": {
        backgroundColor: blueGrey[500]
      },
      "&:focus": {
        backgroundColor: blueGrey[500]
      }
    }
  });

  const classes = customStyles();

  let colorStyles;
  switch (colorVariant) {
    case "primary":
      colorStyles = classes.primary;
      break;
    case "secondary":
      colorStyles = classes.secondary;
      break;
    default:
      colorStyles = classes.default;
      break;
  }

  return (
    <Button
      {...rest}
      classes={{
        root: classes.root,
        contained: colorStyles,
        text: colorStyles,
        outlined: colorStyles
      }}
    >
      {rest.children}
    </Button>
  );
}

export default CustomButton;
