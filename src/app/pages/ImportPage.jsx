import React from "react";
import CustomFade from "../../shared/components/animations/CustomFade";
import ImportForm from "../components/import/ImportForm";

class Import extends React.Component {
  render() {
    return (
      <CustomFade in={true}>
        <div id="import-page">
          <h1>Importar archivo CSV</h1>
          <div className="wrapper">
            <ImportForm {...this.props} />
          </div>
        </div>
      </CustomFade>
    );
  }
}

export default Import;
