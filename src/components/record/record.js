import React from 'react';
import './record.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      {/*<span>{field}</span>*/}
      <span>{item[field]}</span>
    </li>
  );
};

export default Record;