import React from 'react';
import {withRouter} from 'react-router-dom';

import './item-page.css';
import ItemList from "../item-list";
import Row from '../row';
import ErrorBoundry from "../error-boundry";
import ItemDetails from "../item-details";

const OtherItemPage = (props) => {

  const {getItemData, getImageUrl, getData, renderItem, history, match} = props;

  const itemList = (
    <ItemList getData={getData}
              onItemSelected={(id) => history.push(id)}
              renderItem={renderItem}/>
  );

  const itemDetails = (
    <ErrorBoundry>
      <ItemDetails itemId={match.params.id}
                   getItemData={getItemData}
                   getImageUrl={getImageUrl}>
        {props.children}
      </ItemDetails>
    </ErrorBoundry>
  );

  return (
    <Row left={itemList} right={itemDetails}/>
  );

};

export default withRouter(OtherItemPage);