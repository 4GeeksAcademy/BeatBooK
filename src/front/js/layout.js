import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Event } from "./pages/event";
import { Event2 } from "./pages/event";
import { CreateEvent } from "./pages/createEvent";
import { CreateEventMedia } from "./pages/createEventMedia";
import { Private } from "./pages/private";


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
            <Route element={<Home />} path="/" />
            {/* <Route element={<Event />} path="/event" /> */}
            {/* <Route element={<Event />} path="/event" /> */}
            <Route element={<Event2 />} path="/events/:id" />
            <Route element={<CreateEvent />} path="/event/registre" />
            <Route element={<CreateEventMedia />} path="/event/registre/media/:id" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Private />} path="/private" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
