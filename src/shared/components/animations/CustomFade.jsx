import React from "react";
import { Fade } from "@material-ui/core";

const CustomFade = props => {
  const animationTimeout = props.timeout || 1500;

  return (
    <Fade {...props} timeout={animationTimeout} in={props.in}>
      {props.children}
    </Fade>
  );
};

export default CustomFade;
