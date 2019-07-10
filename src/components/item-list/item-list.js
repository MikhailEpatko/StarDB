import React, {Component} from 'react';
import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    planets: null,
    people: null
  };

  componentDidMount() {
   this.swapiService.getAllPlanets()
     .then((planets) => {
       this.setState({planets})
     });
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }

  render() {
    const {planets} = this.state;
    if (!planets) {
      return <Spinner />
    }
    const items = this.renderItems(planets);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  };
}
