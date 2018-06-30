import React from 'react';
import Routes from './routes';
import { Header, Footer } from './Layout';
import './Styles/App.css';

const App = () => (
  <div>
    <Header />
      <Routes />
    <Footer />
  </div>
);

export default App;
