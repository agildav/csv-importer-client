import React from "react";
import CustomFade from "../../shared/components/animations/CustomFade";

class Dashboard extends React.Component {
  render() {
    return (
      <CustomFade in={true}>
        <div id="dashboard-page">
          <h1>Dashboard</h1>
        </div>
      </CustomFade>
    );
  }
}

export default Dashboard;
