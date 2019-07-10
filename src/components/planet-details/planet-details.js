import React, {Component} from 'react';
import './planet-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";

export default class PlanetDetails extends Component {
  swapiService = new SwapiService();

  state = {
    planet: null
  };

  updatePlanet() {
    const {planetId} = this.props;
    if (!planetId) {
      return;
    }
    this.swapiService.getPlanet(planetId)
      .then((planet) => {
        this.setState({planet});
      });
  }

  componentDidMount() {
    this.updatePlanet();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.planetId !== prevProps.planetId) {
      this.updatePlanet();
    }
  }

  render() {
    if (!this.state.planet) {
      return (<span>Select a planet from the list</span>);
    }
    const {id, name, diameter, gravity, population} = this.state.planet;

    return (
      <div className="planet-details card">
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
             alt="planet"/>
        <div className="card-body">
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
            <li className="list-group-item">
              <ErrorButton />
            </li>
          </ul>
        </div>
      </div>
    )
  }

}