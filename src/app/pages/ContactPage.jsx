import React from "react";
import CustomFade from "../../shared/components/animations/CustomFade";
import Contacts from "../components/contact/Contacts";

class Contact extends React.Component {
  render() {
    return (
      <CustomFade in={true}>
        <div id="contacts-page">
          <h1>Contactos</h1>
          <div className="wrapper">
            <Contacts {...this.props} />
          </div>
        </div>
      </CustomFade>
    );
  }
}

export default Contact;
