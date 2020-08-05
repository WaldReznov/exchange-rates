import React, { Component } from 'react';
import ConverterItem from '../ConverterItem/ConverterItem';
import classes from './Converter.module.css'
import { connect } from 'react-redux';
import { changeFromRate, changeToRate } from '../../store/actions/actionCreators';
import ListConverter from '../ListConverter/ListConverter';

class Convereter extends Component {

  state = {
    rate: null
  }

  render() {
    const ratesTable = [];

    const fromRate = <ConverterItem action={this.props.changeFromRate} {...this.props.rates.fromRate} />;
      
    const toRate = <ConverterItem action={this.props.changeToRate} {...this.props.rates.toRate} />;

    return (
      <div className={classes.converter}>
        <h1></h1>
        {fromRate} 
        <div className={classes.revertRates__container}>
          <div className={classes.revertRates}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="sort_outline_28">
              <g fill="none" fill-rule="evenodd">
                <path d="M0 0h28v28H0z"></path>
                <path d="M9 6.5c.552 0 1 .482 1 1.077v10.508l2.293-2.292a1 1 0 011.32-.083l.094.083a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 18.085V7.577c0-.555.39-1.012.891-1.07zm10.707.253l4 4a1 1 0 01-1.414 1.414L20 9.874V20.46a1 1 0 01-2 0V9.874l-2.293 2.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0z" fill="currentColor" fill-rule="nonzero"></path>
              </g>
            </svg>
          </div>
        </div>
        {toRate}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    rates: state.rates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFromRate: (rate) => dispatch(changeFromRate(rate)),
    changeToRate: (rate) => dispatch(changeToRate(rate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convereter);