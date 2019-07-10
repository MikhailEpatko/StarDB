import React, {Component} from 'react';
import './planet-page.css';
import ItemList from "../item-list";
import PlanetDetails from "../planet-details";
import ErrorIndicator from "../error-indicator";

export default class PlanetPage extends Component {

  state = {
    selectedPlanet: null,
    hasError: false
  };

  onPlanetSelected = (id) => {
    this.setState({selectedPlanet: id});
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorIndicator />
      );
    }
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPlanetSelected}/>
        </div>
        <div className="col-md-6">
          <PlanetDetails planetId={this.state.selectedPlanet}/>
        </div>
      </div>
    );
  }
}
