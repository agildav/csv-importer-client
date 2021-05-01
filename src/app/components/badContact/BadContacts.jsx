import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import React from "react";
import { toast } from "react-toastify";
import FetchService from "../../../shared/components/fetch/FetchService";
import CustomButton from "../../../shared/components/inputs/CustomButton";
import { CircularProgress } from "@material-ui/core";

class BadContacts extends React.Component {
  initialState = {
    loading: false,
    rows: [],
    perPage: 5,
    page: 1,
    totalResources: 0
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  fetchBadContacts = () => {
    return this.setState(
      state => {
        return {
          loading: true
        };
      },
      () => {
        const url =
          process.env.REACT_APP_API_BASE_URL +
          `/bad_contacts/?page=${this.state.page}&per_page=${this.state.perPage}`;

        const headers = {
          Authorization: "Bearer " + this.props.auth.currentUser.token
        };

        const method = "GET";
        FetchService.sendRequest(url, headers, {}, method)
          .then(r => {
            const contacts = r.data || [];
            const meta = r.meta || {};

            setTimeout(() => {
              this.setState(state => {
                return {
                  rows: contacts,
                  page: meta.pageNumber,
                  totalResources: meta.totalResources,
                  loading: false
                };
              });
            }, 250);
          })
          .catch(e => {
            toast.error("Ha ocurrido un error");
            setTimeout(() => {
              this.setState(state => {
                return {
                  loading: false
                };
              });
            }, 250);
          });
      }
    );
  };

  componentDidMount() {
    this.fetchBadContacts();
  }

  handleChangeRowsPerPage = event => {
    return this.setState(
      state => {
        return {
          page: 1,
          perPage: parseInt(event.target.value, 10)
        };
      },
      () => this.fetchBadContacts()
    );
  };

  handleChangePage = (event, newPage) => {
    return this.setState(
      state => {
        return {
          page: newPage + 1
        };
      },
      () => this.fetchBadContacts()
    );
  };

  handleClick = () => {
    this.fetchBadContacts();
  };

  includesError(field = "") {
    return field && field.includes("error:");
  }

  render() {
    const { perPage, totalResources, loading } = this.state;
    const page = this.state.page - 1;

    if (loading) {
      return (
        <div id="bad-contacts">
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div id="bad-contacts">
          <CustomButton
            onClick={this.handleClick}
            disabled={loading}
            size="medium"
            type="submit"
            variant="contained"
            colorVariant="primary"
          >
            Actualizar
          </CustomButton>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Fecha de nacimiento</TableCell>
                    <TableCell align="center">Tarjeta de crédito</TableCell>
                    <TableCell align="center">Franquicia</TableCell>
                    <TableCell align="center">Teléfono</TableCell>
                    <TableCell align="center">Nombre de archivo</TableCell>
                    <TableCell align="center">ID de archivo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows.map((row, idx) => (
                    <TableRow key={`${row.name}-${idx}`}>
                      <TableCell
                        className={
                          this.includesError(row.name) ? "error" : null
                        }
                        component="th"
                        scope="row"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        className={
                          this.includesError(row.email) ? "error" : null
                        }
                        align="center"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        className={
                          this.includesError(row.address) ? "error" : null
                        }
                        align="center"
                      >
                        {row.address}
                      </TableCell>
                      <TableCell
                        className={
                          this.includesError(row.birthDate) ? "error" : null
                        }
                        align="center"
                      >
                        {row.birthDate}
                      </TableCell>
                      <TableCell
                        className={
                          this.includesError(row.creditCard) ? "error" : null
                        }
                        align="center"
                      >
                        {row.creditCard}
                      </TableCell>
                      <TableCell
                        className={
                          this.includesError(row.franchise) ? "error" : null
                        }
                        align="center"
                      >
                        {row.franchise || "-"}
                      </TableCell>
                      <TableCell
                        className={
                          this.includesError(row.phone) ? "error" : null
                        }
                        align="center"
                      >
                        {row.phone}
                      </TableCell>
                      <TableCell align="center">{row.file.filename}</TableCell>
                      <TableCell align="center">{row.file.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalResources}
              rowsPerPage={perPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      );
    }
  }
}

export default BadContacts;
