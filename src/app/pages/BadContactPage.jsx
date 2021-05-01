import React from "react";
import CustomFade from "../../shared/components/animations/CustomFade";
import BadContacts from "../components/badContact/BadContacts";

class BadContact extends React.Component {
  render() {
    return (
      <CustomFade in={true}>
        <div id="bad-contacts-page">
          <h1>Contactos fallidos</h1>
          <div className="wrapper">
            <BadContacts {...this.props} />
          </div>
        </div>
      </CustomFade>
    );
  }
}

export default BadContact;
