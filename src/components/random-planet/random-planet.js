import React, {Component} from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  state = {
    planet: {},
    loading: true,
    error: false
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  swapiService = new SwapiService();

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet() {
    const id = 12000;
    // const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const {planet, loading, error} = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading && !error ? <PlanetView planet={planet}/> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    if (loading) {
      return (
        <Spinner />
      );
    }

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  };
}

const PlanetView = ({planet}) => {
  const {id, name, diameter, gravity, population} = planet;
  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
           alt="planet icon"/>
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
    </React.Fragment>
  );
};