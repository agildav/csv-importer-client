import React from "react";
import CustomButton from "../../../shared/components/inputs/CustomButton";
import CustomInputTextField from "../../../shared/components/inputs/CustomTextField";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import UserValidation from "../../../shared/components/validations/UserValidation";
import FetchService from "../../../shared/components/fetch/FetchService";
import CustomFileInput from "../../../shared/components/inputs/CustomFileInput";

class ImportForm extends React.Component {
  fileInputId = "file-csv-input";
  columnsToMatch = {
    name: "",
    birthDate: "",
    phone: "",
    address: "",
    creditCard: "",
    email: "",
    file: null
  };

  initialState = { isUploading: false, ...this.columnsToMatch };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  texts = {
    fillFields: "Complete los datos",
    importTitle:
      "Indique los nombres de las columnas correspondientes de su archivo que coincidan con las que se muestran abajo",
    import: "Importar archivo",
    columnName: "Nombre de contacto",
    columnBirthDate: "Fecha de nacimiento",
    columnPhone: "Teléfono",
    columnAddress: "Dirección",
    columnCreditCard: "Tarjeta de crédito",
    columnEmail: "Email",
    invalidFile: "Archivo inválido",
    successImport: "Archivo importado",
    errorImport: "No se ha podido importar el archivo"
  };

  isEmptyAnyField = fields => {
    let isAnyEmpty = false;
    const includeFields = Object.keys(this.columnsToMatch);

    for (const key in fields) {
      if (fields.hasOwnProperty(key) && includeFields.includes(key)) {
        if (!fields[key]) {
          isAnyEmpty = true;
          break;
        }
      }
    }

    return isAnyEmpty;
  };

  handleNameChange = event => {
    event.persist();

    this.setState(state => {
      return {
        name: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleBirthDateChange = event => {
    event.persist();

    this.setState(state => {
      return {
        birthDate: event.target.value.trim().toLowerCase()
      };
    });
  };

  handlePhoneChange = event => {
    event.persist();

    this.setState(state => {
      return {
        phone: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleAddressChange = event => {
    event.persist();

    this.setState(state => {
      return {
        address: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleCreditCardChange = event => {
    event.persist();

    this.setState(state => {
      return {
        creditCard: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleEmailChange = event => {
    event.persist();

    this.setState(state => {
      return {
        email: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleFileChange = event => {
    event.persist();

    const file = event.target.files[0] || undefined;
    if (!file) return;

    if (!UserValidation.isValidFileCSV(file)) {
      toast.error(this.texts.invalidFile);
      document.getElementById(this.fileInputId).value = null;
      this.setState(state => {
        return {
          file: null
        };
      });

      return;
    }

    this.setState(state => {
      return {
        file
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const fields = this.state;

    if (!this.isEmptyAnyField(fields)) {
      this.setState(
        state => {
          return {
            isUploading: true
          };
        },
        () => {
          const url = process.env.REACT_APP_API_BASE_URL + "/contacts/import";

          const headers = {
            Authorization: "Bearer " + this.props.auth.currentUser.token
          };

          const { file } = this.state;
          const reqBody = { ...this.state };
          delete reqBody.file;
          delete reqBody.isUploading;

          const method = "POST";
          FetchService.sendMultiFormRequest(
            url,
            headers,
            method,
            reqBody,
            { csv: file },
            "contact"
          )
            .then(r => {
              toast.success(this.texts.successImport);
              this.setState(
                state => {
                  return {
                    isUploading: false
                  };
                },
                () => this.props.history.push("/")
              );
            })
            .catch(e => {
              toast.error(this.texts.errorImport);
              this.setState(state => {
                return {
                  isUploading: false
                };
              });
            });
        }
      );
    } else {
      toast.error(this.texts.fillFields);
    }
  };

  render() {
    const { isUploading } = this.state;

    return (
      <form id="import-form" onSubmit={this.handleSubmit}>
        <h5>{this.texts.importTitle}</h5>
        <div className="row">
          <div className="col">
            <div className="form-control">
              <label htmlFor={"column-name"}>
                {" "}
                {this.texts.columnName}: <span className="required">*</span>
              </label>
              <div className="spacer"></div>
              <CustomInputTextField
                required
                onChange={this.handleNameChange}
                type="text"
                name="columnName"
                variant="outlined"
                id="import-columnName"
                margin="dense"
              />
            </div>

            <div className="form-control">
              <label htmlFor={"column-birthDate"}>
                {" "}
                {this.texts.columnBirthDate}:{" "}
                <span className="required">*</span>
              </label>
              <div className="spacer"></div>
              <CustomInputTextField
                required
                onChange={this.handleBirthDateChange}
                type="text"
                name="columnBirthDate"
                variant="outlined"
                id="import-columnBirthDate"
                margin="dense"
              />
            </div>

            <div className="form-control">
              <label htmlFor={"column-phone"}>
                {" "}
                {this.texts.columnPhone}: <span className="required">*</span>
              </label>
              <div className="spacer"></div>
              <CustomInputTextField
                required
                onChange={this.handlePhoneChange}
                type="text"
                name="columnPhone"
                variant="outlined"
                id="import-columnPhone"
                margin="dense"
              />
            </div>
          </div>
          <div className="spacer"></div>
          <div className="col">
            <div className="form-control">
              <label htmlFor={"column-address"}>
                {" "}
                {this.texts.columnAddress}: <span className="required">*</span>
              </label>
              <div className="spacer"></div>
              <CustomInputTextField
                required
                onChange={this.handleAddressChange}
                type="text"
                name="columnAddress"
                variant="outlined"
                id="import-columnAddress"
                margin="dense"
              />
            </div>

            <div className="form-control">
              <label htmlFor={"column-creditCard"}>
                {" "}
                {this.texts.columnCreditCard}:{" "}
                <span className="required">*</span>
              </label>
              <div className="spacer"></div>
              <CustomInputTextField
                required
                onChange={this.handleCreditCardChange}
                type="text"
                name="columnCreditCard"
                variant="outlined"
                id="import-columnCreditCard"
                margin="dense"
              />
            </div>

            <div className="form-control">
              <label htmlFor={"column-email"}>
                {" "}
                {this.texts.columnEmail}: <span className="required">*</span>
              </label>
              <div className="spacer"></div>
              <CustomInputTextField
                required
                onChange={this.handleEmailChange}
                type="text"
                name="columnEmail"
                variant="outlined"
                id="import-columnEmail"
                margin="dense"
              />
            </div>
          </div>
        </div>

        <CustomFileInput
          id={this.fileInputId}
          name="file-csv"
          onChange={this.handleFileChange}
          accept={UserValidation.getValidFileType()}
          disabled={isUploading}
        ></CustomFileInput>

        <div className="form-action">
          {isUploading && <CircularProgress thickness={1} />}
          <CustomButton
            disabled={isUploading || this.isEmptyAnyField(this.state)}
            size="medium"
            type="submit"
            variant="contained"
            colorVariant="primary"
          >
            {this.texts.import}
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default ImportForm;
