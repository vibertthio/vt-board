import React from 'react';
import PropTypes from 'prop-types';
import logo from './../img/flash.png';

/**
 * [Title description]
 * @param {list} props
 * @return {element}
 */
function Title(props) {
  return (
    <div className="title">
      <img
        src={logo}
        className="logo"
        alt="logo"
      />
      <div className="app-title">
        <h1>{props.content}</h1>
      </div>
    </div>
  );
}

Title.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Title;
