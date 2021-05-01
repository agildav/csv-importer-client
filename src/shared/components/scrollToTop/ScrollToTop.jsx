import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const currentLocation = this.props.location ? this.props.location : "";
    const prevLocation = prevProps.location ? prevProps.location : "";

    if (currentLocation !== prevLocation) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const children = this.props.children ? this.props.children : null;
    return children;
  }
}

export default withRouter(ScrollToTop);
