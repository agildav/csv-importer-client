import React from "react";
import CustomFade from "../../shared/components/animations/CustomFade";
import UploadedFiles from "../components/uploadedFile/UploadedFiles";

class UploadedFile extends React.Component {
  render() {
    return (
      <CustomFade in={true}>
        <div id="uploaded-files-page">
          <h1>Archivos importados</h1>
          <div className="wrapper">
            <UploadedFiles {...this.props} />
          </div>
        </div>
      </CustomFade>
    );
  }
}

export default UploadedFile;
