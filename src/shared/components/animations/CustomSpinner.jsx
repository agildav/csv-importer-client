import React from "react";
import CustomFade from "./CustomFade";
import { CircularProgress } from "@material-ui/core";

class CustomSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.enableSpinner = this.enableSpinner.bind(this);

    this.state = {
      showSpinner: false
    };

    const delayToAppear = 250;
    this.timer = setTimeout(this.enableSpinner, delayToAppear);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableSpinner() {
    this.setState({ showSpinner: true });
  }

  render() {
    const { showSpinner } = this.state;

    if (!showSpinner) {
      return null;
    }

    return (
      <CustomFade in={true}>
        <div
          id="spinner"
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <CircularProgress thickness={1} size={"4.5rem"} {...this.props} />
        </div>
      </CustomFade>
    );
  }
}

export default CustomSpinner;
