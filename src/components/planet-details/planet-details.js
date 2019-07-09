import React, {Component} from 'react';
import './planet-details.css';

export default class PlanetDetails extends Component {

  render() {
    return (
      <div className="planet-details card">
        <img className="planet-image"
             src="https://starwars-visualguide.com/assets/img/planets/2.jpg"
             alt="planet image" />

        <div className="card-body">
          <h4>Alderaan</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>12500</span>
            </li>
            <li className="list-group-item">
              <span className="term">Gravity</span>
              <span>1 standard</span>
            </li>
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>2000000000</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

}