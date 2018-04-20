/**
 * Npm import
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Local import
 */

/**
 * Code
 */

const Header = () => (
  <header id="header">

    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <Link id="title-home" className="navbar-item" to="/home">
        Deserter
        </Link>
        <Link className="navbar-item" to="/home">
          <span className="icon is-large">
            <i className="fas fa-home" aria-hidden="true" />
          </span>
          <span>Accueil</span>
        </Link>
        <Link className="navbar-item" to="/login">
          <span className="icon is-large">
            <i className="fas fa-sign-out-alt" aria-hidden="true" />
          </span>
          <span>Se connecter</span>
        </Link>
        <Link className="navbar-item" to="/Game">
          <span className="icon is-large">
            <i className="fas fa-play-circle" aria-hidden="true" />
          </span>
          <span>Jouer</span>
        </Link>
      </div>
    </nav>
  </header>
);

/**
 * Export
 */

export default Header;
