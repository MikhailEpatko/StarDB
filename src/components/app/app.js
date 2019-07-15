import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorButton from "../error-button";
import {ItemPage, NewItemPage, OtherItemPage, LoginPage, SecretPage} from "../pages";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import Record from '../record';
import ErrorBoundry from "../error-boundry";
import ItemDetails from "../item-details";

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    randomPlanetButtonLabel: 'Hide random planet',
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({isLoggedIn: true});
  };

  toggleRandomPlanet = () => {
    this.setState(({showRandomPlanet}) => {
      return {
        randomPlanetButtonLabel: showRandomPlanet ? 'Show random planet' : 'Hide random planet',
        showRandomPlanet: !showRandomPlanet
      }
    });
  };

  onServiceChange = () => {
    this.setState((state) => {
      const Service = state.swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const {
      getAllPlanets, getPlanet, getPlanetImage,
      getPeople, getPerson, getPersonImage,
      getAllSpaceships, getSpaceship, getSpaceshipImage
    } = this.state.swapiService;

    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet swapiService={this.state.swapiService}/> : null;

    const PlanetsPage = () => {
      return (
        <ItemPage getData={getAllPlanets}
                  getItemData={getPlanet}
                  getImageUrl={getPlanetImage}
                  renderItem={({name, population}) => `${name} { population: ${population} }`}>
          <Record field="diameter" label="Diameter"/>
          <Record field="gravity" label="Gravity"/>
          <Record field="population" label="Population"/>
        </ItemPage>
      );
    };

    const PeoplePage = () => {
      return (
        <div>
          <h2>People</h2>
          <OtherItemPage getData={getPeople}
                         getItemData={getPerson}
                         getImageUrl={getPersonImage}
                         renderItem={({name, gender}) => `${name} - { ${gender} }`}>
            <Record field="gender" label="Gender"/>
            <Record field="eyeColor" label="Eye Color"/>
            <Record field="birthYear" label="Birth Year"/>
          </OtherItemPage>
        </div>);
    };

    const SpaceshipPage = () => {
      return (
        <NewItemPage getData={getAllSpaceships}
                     renderItem={({name, model}) => `${name} - { ${model} }`}>
        </NewItemPage>);
    };

    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div>
              <Header onServiceChange={this.onServiceChange}/>
              {randomPlanet}
              <button className="toggle-planet btn btn-warning btn-lg"
                      onClick={this.toggleRandomPlanet}>
                {this.state.randomPlanetButtonLabel}
              </button>
              <ErrorButton/>

              <Switch>
                <Route path="/"
                       render={() => <h2>Welcome to StarDB!</h2>}
                       exact/>

                <Route path="/planets"
                       render={() => <h2>Planets</h2>}
                       exact/>
                <Route path="/planets" component={PlanetsPage}/>

                <Route path="/people/:id?" component={PeoplePage}/>

                <Route path="/spaceships"
                       render={() => <h2>Spaceships</h2>}
                       exact/>
                <Route path="/spaceships" exact component={SpaceshipPage}/>
                <Route path="/spaceships/:id"
                       render={({match}) => {
                         return (
                           <ItemDetails itemId={match.params.id} getItemData={getSpaceship}
                                        getImageUrl={getSpaceshipImage}>
                             <Record field="model" label="Model"/>
                             <Record field="manufactured" label="Manufactured"/>
                             <Record field="passengers" label="Passengers"/>
                           </ItemDetails>
                         );
                       }}/>

                <Route path="/secret-page" render={() => (
                  <SecretPage isLoggedIn={isLoggedIn}/>
                )}/>

                <Route path="/login"
                       render={() => (
                         <LoginPage isLoggedIn={isLoggedIn}
                                    onLogin={this.onLogin}/>
                       )}/>
                <Route render={() => (<h2>Page not found</h2>)}/>
                {/*<Redirect to="/"/>*/}
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
}
