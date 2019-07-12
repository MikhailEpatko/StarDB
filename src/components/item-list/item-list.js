import React, {Component} from 'react';
import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

  state = {
    itemList: null
  };

  componentDidMount() {
    this.updateList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getData !== prevProps.getData) {
      this.updateList();
    }
  }

   updateList = () => {
    const {getData} = this.props;
    getData()
      .then((itemList) => {
        this.setState({itemList})
      });
  };

  renderItems(arr) {
    return arr.map((item) => {
      const label = this.props.renderItem(item);
      return (
        <li className="list-group-item"
            key={item.id}
            onClick={() => this.props.onItemSelected(item.id)}>
          {label}
        </li>
      );
    });
  }



  render() {
    const {itemList} = this.state;
    if (!itemList) {
      return <Spinner/>
    }
    const items = this.renderItems(itemList);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  };
}

ItemList.defaultProps = {
  getData: () => {},
  renderItem: () => {}
};
