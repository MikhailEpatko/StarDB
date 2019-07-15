import React from 'react';
import {withRouter} from 'react-router-dom';

import './item-page.css';
import ItemList from "../item-list";
import Row from '../row';

const NewItemPage = ({getData, renderItem, history}) => {

  const itemList = (
    <ItemList getData={getData}
              onItemSelected={(id) => history.push(id)}
              renderItem={renderItem}/>
  );

  return (
    <Row left={itemList}/>
  );

};

export default withRouter(NewItemPage);