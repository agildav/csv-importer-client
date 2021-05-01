import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Divider
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import CustomFade from "../../../shared/components/animations/CustomFade";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(4),
    flexGrow: 1,
    userSelect: "none"
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const { auth } = props;
  const { isAuth } = auth;

  const menuSections = [
    {
      text: "Dashboard",
      route: "/dashboard"
    },
    {
      text: "Importar CSV",
      route: "/import"
    },
    {
      text: "Ver contactos",
      route: "/contacts"
    },
    {
      text: "Ver contactos fallidos",
      route: "/bad-contacts"
    },
    {
      text: "Ver archivos importados",
      route: "/uploaded-files"
    }
  ];

  const profileSections = [];

  const texts = {
    csvImporterTitle: "Csv Importer",
    logout: "Cerrar sesión"
  };

  const divideAfter = "Dashboard";

  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);
  const openProfile = Boolean(anchorProfileEl);

  const handleProfileMenu = event => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    props.auth.logout();
  };

  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
  const openMenu = Boolean(anchorMenuEl);

  const handleMenu = event => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  return (
    <div id="navbar" color="primary">
      <AppBar position="fixed">
        <Toolbar>
          {isAuth && (
            <CustomFade in={true}>
              <div>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorMenuEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  {menuSections.map((section, idx) => {
                    return (
                      <NavLink
                        tabIndex={-1}
                        onClick={handleMenuClose}
                        key={idx}
                        to={section.route}
                      >
                        <MenuItem>{section.text}</MenuItem>
                        {section.text === divideAfter && <Divider />}
                      </NavLink>
                    );
                  })}
                </Menu>
              </div>
            </CustomFade>
          )}
          <Typography variant="h6" className={classes.title}>
            {texts.csvImporterTitle}
          </Typography>
          {isAuth && (
            <CustomFade in={true}>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="profile-appbar"
                  aria-haspopup="true"
                  onClick={handleProfileMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                  id="profile-appbar"
                  anchorEl={anchorProfileEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={openProfile}
                  onClose={handleProfileClose}
                >
                  {profileSections.map((section, idx) => {
                    return (
                      <NavLink
                        tabIndex={-1}
                        onClick={handleProfileClose}
                        key={idx}
                        to={section.route}
                      >
                        <MenuItem>{section.text}</MenuItem>
                      </NavLink>
                    );
                  })}
                  <div tabIndex={-1} onClick={handleLogout}>
                    <MenuItem>{texts.logout}</MenuItem>
                  </div>
                </Menu>
              </div>
            </CustomFade>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
