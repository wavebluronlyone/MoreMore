import React from "react";
import Routes from "./routes";
import { Header, Footer } from "./Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../src/Styles/Semantic-UI-CSS-master/semantic.min.css";

export default () => (
  <React.Fragment>
    <Header />
    <br />
    <br />
    <br />
    <Routes />
    <Footer />
  </React.Fragment>
);

// export default Rotes;
