import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import { Event } from "./pages/event.js";
import { CreateEvent } from "./pages/createEvent";
import { CreateEventMedia } from "./pages/createEventMedia";
import { Private } from "./pages/private";
import { Profile } from "./pages/profile";
import { BandPage } from "./pages/bandPage";

import { Categorias } from "./pages/categorias/categorias.js";
import { CategoryEvents } from "./pages/categorias/categoryEvents.js";
import { Eventos } from "./pages/categorias/eventos.js";
import { Grupos } from "./pages/categorias/grupos.js";
import { Lugares } from "./pages/categorias/lugares.js";
import { PaginaFalsa } from "./pages/paginaFalsa.js";
import { LandingPage } from "./pages/landingPage.js";


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AppNavbar } from "./component/navbar";



import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ToastContainer />
        <ScrollToTop>
          <AppNavbar />

          <Routes>
            <Route element={<LandingPage />} path="/" />
            <Route element={<Home />} path="/home" />
            <Route element={<Event />} path="/events/:id" />
            <Route element={<CreateEvent />} path="/event/registre" />
            <Route element={<CreateEventMedia />} path="/event/registre/media/:id" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Private />} path="/private" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<BandPage />} path="/banda/:id" />
            <Route element={<Categorias />} path="/categorias" />
            <Route element={<CategoryEvents />} path="/categoria/:id/eventos/" />
            <Route element={<Eventos />} path="/eventos" />
            <Route element={<Grupos />} path="/grupos" />
            <Route element={<Lugares />} path="/lugares" />
            <Route element={<PaginaFalsa />} path="/paginafalsa" />

          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
