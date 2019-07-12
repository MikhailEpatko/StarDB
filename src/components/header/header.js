import React from 'react';
import {Link} from 'react-router-dom';

import './header.css'

const Header = ({onServiceChange}) => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#">
          StarDB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/people">People</Link>
        </li>
        <li>
          <Link to="/planets">Planets</Link>
        </li>
        <li>
          <Link to="/spaceships">Starships</Link>
        </li>
      </ul>
      <button className="btn btn-primary btn-sm change-service"
      onClick={onServiceChange}>
        Change SWAPI
      </button>

    </div>
  );
};

export default Header;
