import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PlanetPage from "../planet-page";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    console.log('Cauth');
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator/>
    }
    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
    return (
      <div>
        <Header/>
        {randomPlanet}
        <button className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
          Show random planet
        </button>
        <ErrorButton/>
        <PlanetPage getData={this.swapiService.getAllPlanets}
                    renderItem={({name, population}) => `${name} { population: ${population} }`}/>
        <PlanetPage getData={this.swapiService.getPeople}
                    renderItem={({name, gender}) => `${name} - { ${gender} }`}/>
        <PlanetPage getData={this.swapiService.getAllSpaceships}
                    renderItem={({name, model}) => `${name} - { ${model} }`}/>
      </div>
    );
  };
}
