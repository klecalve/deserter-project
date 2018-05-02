/* Npm import */
import React from 'react';
import PropTypes from 'prop-types';

/* Local import */
import Header from 'src/containers/Header';
import Footer from 'src/components/Footer';
import Home from 'src/components/Home';
import Error404 from 'src/components/Error404';
import Connect from 'src/containers/Connect';
import Profil from 'src/containers/Profil';
import Interface from 'src/components/Interface';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Code */
const App = ({ user }) => (
  <Router>
    <div id="app">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/game" component={Interface} />
        <Route path="/connect" component={Connect} />
        <Route path="/profil" component={Profil} />
        {/* <Route path="/cgu" component={cgu} /> */}
        {/* <Route path="/contact" component={Contact} /> */}
        <Route component={Error404} />
      </Switch>
      <Footer />
    </div>
  </Router>
);
App.propTypes = {
  user: PropTypes.bool.isRequired,
};

/* Export default */
export default App;
