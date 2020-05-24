import React, { Component } from 'react';
import avatar from './img/anon-avatar.png';

export default class Profile extends Component {
  render() {
    return (
      <div className="masthead text-white text-center">
        <div className="container d-flex align-items-center flex-column">
           <img className="masthead-avatar mb-2" src={avatar} alt="Logo" />
          <p className="masthead-heading-home mb-0">Login to find out my secret identity!</p>

          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>
      </div>
    )
  }
}
