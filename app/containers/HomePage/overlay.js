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
import styled from 'styled-components';
import { DISPLAYCOUNTRYORIGIN } from './constants';

export default class Overlay extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.state = {
      showDetail: false
    }
  }

  render() {
    const Modal = styled.div`
          background-color: rgba(0, 0, 0, 0.4);
          display: ${props => props.display == 'none' ? 'none' : 'block'};
          height: 100%;
          position: fixed;
          left: 0;
          opacity: 1;
          -webkit-transition: opacity .2s ease-out;
          top: 0;
          transition: opacity .2s ease-out;
          width: 100%;
          z-index: 100;
          overflow: hidden
    `;
    const DetailPanel = styled.div`
          fontWeight: "bold";
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto;
          margin:0;
          min-height: 24em;
          -webkit-box-flex: 1;
          flex: 1;
    `;
    const Panel = styled.div`
          color: #ffffff;
          flex:none;
          max-width: 75%
    `;
    const style = {
      background: "teal",
      padding: "5px 10px",

    }
    const detail = this.props.ship;
    const country = DISPLAYCOUNTRYORIGIN(detail.owner);
    const ship = (
      <Panel>
        <div style={style}>
          Name: {detail.name}<br/>
          Teu: {detail.maxTEU}<br/>
          Weight: {detail.grossTonnage}<br/>
          Built: {detail.built}<br/>
          Length: {detail.lengthMeters}m<br/>
          Country of Origin: {country}<br/>
        </div>
      </Panel>
    );
    return (
      <Modal display={this.state.display} onClick={this.props.handleClick}>
        <DetailPanel>
          {ship}
        </DetailPanel>
      </Modal>
    );
  }
}
