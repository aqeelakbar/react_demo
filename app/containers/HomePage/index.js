/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { API } from './constants';
import Ships from './ships';
import Overlay from './overlay';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      shippingData: [],
      width: window.innerWidth,
      display: false
    }
  }

  getShippingData(url) {
    fetch(url)
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({shippingData: data.ships});
    }).catch(error => {
      console.log(error);
    })
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  handleClick(ship, e) {
    this.setState({
      ship:ship,
      display: true
    });
  }

  closeOverlay() {
    this.setState({
      ship:[],
      display: false
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({width: window.innerWidth});
  }

  componentDidMount() {
    this.getShippingData(API);
  }


  render() {
    const {width} = this.state;
    const platform = width <= 500 ? "mobile" : "desktop" ;
    return (
      <div>
        <Ships ships={this.state.shippingData} platform={platform} display={this.state.display} handleClick={this.handleClick.bind(this)} ship={this.state.ship} />
        {this.state.display && <Overlay display={this.state.display} ship={this.state.ship} handleClick={this.closeOverlay.bind(this)}></Overlay>}
      </div>
    );
  }
}
