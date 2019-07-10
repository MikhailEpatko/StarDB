import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PlanetDetails from '../planet-details';

import './app.css';

export default class App extends Component{
  state = {
    showRandomPlanet: true,
    selectedPlanet: null
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPlanetSelected = (id) => {
    this.setState({selectedPlanet: id});
  };

  render() {
    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <div>
        <Header />
        {randomPlanet}
        <button className="toggle-planet btn btn-warning btn-lg"
        onClick={this.toggleRandomPlanet}>
          Show random planet
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPlanetSelected} />
          </div>
          <div className="col-md-6">
            <PlanetDetails planetId={this.state.selectedPlanet} />
          </div>
        </div>
      </div>
    );
  };
}
