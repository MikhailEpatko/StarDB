import React, {Component} from 'react';
import './item-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    imageUrl: null
  };

  updateItem() {
    const {itemId, getItemData, getImageUrl} = this.props;
    if (!itemId) {
      return;
    }
    getItemData(itemId)
      .then((item) => {
        this.setState({
          item,
          imageUrl: getImageUrl(item)
        });
      });
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  render() {
    if (!this.state.item) {
      return (<span>Select an item from the list</span>);
    }
    const {imageUrl} = this.state;
    const {name} = this.state.item;

    return (
      <div className="item-details card">
        <img className="item-image"
             src={imageUrl}
             alt="item"/>
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item: this.state.item});
              })
            }
            <li className="list-group-item">
              <ErrorButton />
            </li>
          </ul>
        </div>
      </div>
    )
  }

}