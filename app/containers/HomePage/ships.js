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

import React, { Component, PropTypes } from 'react';
import { SHIPORIGINCOPY, SHIPTEUCOPY, MISSINGORIGIN, DISPLAYCOUNTRYORIGIN } from './constants';
import styled from 'styled-components';

export class Ships extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    ships: PropTypes.array.isRequired,
    platform: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      ships: [],
      platform: "mobile",
      display: false,
      ship: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ships !== this.props.ships){
      this.setState({
        ships:nextProps.ships
      });
    }
    if(nextProps.platform !== this.props.platform){
      this.setState({
        platform:nextProps.mobile
      });
    }
  }

  render() {
    const FleetContainer = styled.div`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          flex-flow: row wrap;
          justify-content: space-around;
    `;
    const ships = this.state.ships.map((ship) => {
      let boundHandleClick = this.props.handleClick.bind(this, ship);
      return(
          <Ship key={ship.id} ship={ship} clickhandler={boundHandleClick} platform={this.props.platform} />
      )
    });

    return (
      <FleetContainer>
        {ships}
      </FleetContainer>
    );
  }
}

class Ship extends Component {
  static propTypes = {
    ship: PropTypes.object.isRequired,
    platform: PropTypes.string.isRequired
  }

  constructor() {
    super()
  }

  render() {
    const Ship = styled.div`
          background: rgba(63, 127, 191, 0.44);
          border: 1px solid #666;
          border-radius: 5px 10px;
          display: block;
          height: 150px;
          margin: 5px;
          padding: 5px;
          width: ${props => props.platform == 'mobile' ? '250px' : '30%'}
    `;
    const { ship, platform } = this.props;
    const country = DISPLAYCOUNTRYORIGIN(ship.owner);
    return (
      <Ship platform={platform} onClick={this.props.clickhandler}>
        <h3>{ship.name}</h3>
        <div><b>{SHIPORIGINCOPY}: </b>{country}</div>
        <div><b>{SHIPTEUCOPY}: </b>{ship.maxTEU}</div>
      </Ship>
    );
  }
}

export default Ships;
