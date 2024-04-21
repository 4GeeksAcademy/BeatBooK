import React from "react";
import { Link } from "react-router-dom";
import { Search } from "./navbar/search";
import { Login } from "./navbar/login";
import { useEffect, useState } from "react";
import "./navbar/buttonJoin.css";
import LogoHorizontal from "./navbar/beatBoxHorizontal.png";
import LogoHorizontalBlanco from "./navbar/beatBoxHorizontalBlanco.png";
import "./navbar/logo.css";
import { SecondaryNavbar } from "./navbar/navbarSecondary";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Menu, MenuItem, Button, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export const AppNavbar = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.checkUser();
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="hahahah"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        maxWidth: "100vw",
      }}
    >
      {" "}
      <div className="container-fluid m-0 p-0">
        <div className="" style={{ maxWidth: "100vw", }}>
          <nav
            className="navbar navbar-expand bg-black  d-flex justify-content-between align-items-center"
            style={{
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              marginBottom: "0",
              paddingBottom: "0",
              paddingRight: "0",
              marginRight: "0",
              maxWidth: "100vw",
            }}
          >
            {" "}
            <div className="d-flex justify-content-start ps-3">
              {/* Logo o nombre de la aplicación */}
              <Link to="/home" >
                <img
                  src={LogoHorizontalBlanco}
                  alt="My Image"
                  className="logoHorizontal"
                />
              </Link>
              <Hidden lgUp>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'white', backgroundColor: 'black' }}>

                  <MenuIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/categorias" className="text-black">Categorías</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} >
                    <Link to="/eventos" className="text-black">Eventos</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/grupos" className="text-black">Grupos</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/lugares" className="text-black">Lugares</Link>
                  </MenuItem>
                </Menu>
              </Hidden>

              <Hidden mdDown className="d-flex align-items-center justify-content-center">
                <Link to="/categorias" style={{ textDecoration: 'none' }} className="white-button text-center text-nowrap">
                  Categorías
                </Link>
                <span className="text-white mx-2 align-self-center">|</span>

                <Link to="/eventos" style={{ textDecoration: 'none' }} className="white-button text-center text-nowrap">
                  Eventos
                </Link>
                <span className="text-white mx-2 align-self-center">|</span>

                <Link to="/grupos" style={{ textDecoration: 'none' }} className="white-button text-center text-nowrap">
                  Grupos
                </Link>
                <span className="text-white mx-2 align-self-center">|</span>

                <Link to="/lugares" style={{ textDecoration: 'none' }} className="white-button text-center text-nowrap">
                  Lugares
                </Link>
              </Hidden>
            </div>
            {/* Barra de búsqueda */}
            <div className="d-flex justify-content-center"></div>
            {/* Botones de registro e inicio de sesión */}
            <div className="d-flex">
              <Search />
              <Login />
            </div>
          </nav>
        </div>
      </div>
      {/* <div className="row">
       <SecondaryNavbar />
       </div> */}
    </div>
  );
};
