import React, { Component } from 'react';
import avatar from './img/avatar.png';

export default class Profile extends Component {
  render() {
    return (
      <div className="masthead text-white text-center">
        <div className="container d-flex align-items-center flex-column">
           <img className="masthead-avatar mb-2" src={avatar} alt="Logo" />
          <h1 className="masthead-heading text-uppercase mb-0">John Bat</h1>

          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <p className="masthead-subheading font-weight-light mb-0">na na na na na na na na</p>
        </div>
      </div>
    )
  }
}
