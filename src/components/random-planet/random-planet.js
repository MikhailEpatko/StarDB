import React, {Component} from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner'

export default class RandomPlanet extends Component {

  state = {
    planet: {}
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  swapiService = new SwapiService();

  onPlanetLoaded = (planet) => {
    this.setState({planet});
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  }

  render() {
    const {planet: {id, name, diameter, gravity, population}} = this.state;


    return (
      <div className="random-planet jumbotron rounded">

        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Gravity</span>
              <span>{gravity}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}
