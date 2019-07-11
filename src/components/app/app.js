import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorButton from "../error-button";
import ItemPage from "../item-page";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import SwapiService from "../../services/swapi-service";
import Record from '../record';
import ErrorBoundry from "../error-boundry";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
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
    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
    const {
      getAllPlanets, getPlanet, getPlanetImage,
      getPeople, getPerson, getPersonImage,
      getAllSpaceships, getSpaceship, getSpaceshipImage
    } = this.swapiService;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div>
            <Header/>
            {randomPlanet}
            <button className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
              Show random planet
            </button>
            <ErrorButton/>

            <ItemPage getData={getAllPlanets}
                      getItemData={getPlanet}
                      getImageUrl={getPlanetImage}
                      renderItem={({name, population}) => `${name} { population: ${population} }`}>
              <Record field="diameter" label="Diameter"/>
              <Record field="gravity" label="Gravity"/>
              <Record field="population" label="Population"/>
            </ItemPage>

            <ItemPage getData={getPeople}
                      getItemData={getPerson}
                      getImageUrl={getPersonImage}
                      renderItem={({name, gender}) => `${name} - { ${gender} }`}>
              <Record field="gender" label="Gender"/>
              <Record field="eyeColor" label="Eye Color"/>
              <Record field="birthYear" label="Birth Year"/>
            </ItemPage>

            <ItemPage getData={getAllSpaceships}
                      getItemData={getSpaceship}
                      getImageUrl={getSpaceshipImage}
                      renderItem={({name, model}) => `${name} - { ${model} }`}>
              <Record field="model" label="Model"/>
              <Record field="manufactured" label="Manufactured"/>
              <Record field="passengers" label="Passengers"/>
            </ItemPage>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
}
