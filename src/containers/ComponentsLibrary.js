import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const ComponentsLibrary = ({ componentsList }) =>
  <ul className="components-library">
    {_.values(componentsList).map(element => (
      <li key={element.type}>{element.type}</li>
    ))}
  </ul>

const mapStateToProps = ({ componentsList }) => {
  return {
    componentsList
  }
}

export default connect(mapStateToProps)(ComponentsLibrary);
