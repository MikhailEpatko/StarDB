import React, {Component} from 'react';
import './planet-page.css';
import ItemList from "../item-list";
import PlanetDetails from "../planet-details";
import ErrorIndicator from "../error-indicator";
import Row from '../row';

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
        <ErrorIndicator/>
      );
    }
    const {getData, renderItem} = this.props;
    const itemList = (
      <ItemList getData={getData}
                onItemSelected={this.onPlanetSelected}
                renderItem={renderItem}/>
    );
    const planetDetails = (
      <PlanetDetails planetId={this.state.selectedPlanet}/>
    );

    return (
      <Row left={itemList} right={planetDetails} />
    );
  }
}
