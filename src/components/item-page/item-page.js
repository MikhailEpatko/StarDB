import React, {Component} from 'react';
import './item-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import Row from '../row';
import ErrorBoundry from "../error-boundry";

export default class ItemPage extends Component {

  state = {
    selectedItemId: null
  };

  onItemSelected = (id) => {
    this.setState({selectedItemId: id});
  };

  render() {
    const {getData, getItemData, getImageUrl, renderItem} = this.props;

    const itemList = (
      <ItemList getData={getData}
                onItemSelected={this.onItemSelected}
                renderItem={renderItem}/>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedItemId}
                     getItemData={getItemData}
                     getImageUrl={getImageUrl}>
          {this.props.children}
        </ItemDetails>
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails}/>

    );
  }
}
