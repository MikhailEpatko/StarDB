import React from 'react';
import {withRouter} from 'react-router-dom';

import './item-page.css';
import ItemList from "../item-list";
import Row from '../row';

const SpaceshipsPage = ({getData, renderItem, history}) => {

  const itemList = (
    <ItemList getData={getData}
              onItemSelected={(itemId) => {
                history.push(`/spaceships/${itemId}`);
              }}
              renderItem={renderItem}/>
  );

  return (
    <Row left={itemList}/>
  );

};

export default withRouter(SpaceshipsPage);