import React from 'react';
import Routes from './routes';
import { Header, Footer } from './Layout';
import './Styles/App.css';

export default () => (
  <React.Fragment>
    <Header />
    <Routes />
    <Footer />
  </React.Fragment>
);

// export default Rotes;
