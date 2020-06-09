import React, { Component } from 'react';
import ConverterItem from '../ConverterItem/ConverterItem';
import classes from './Converter.module.css'
import { connect } from 'react-redux';

class Convereter extends Component {

  render() {
    const ratesTable = [];
    if(this.props.rates.rates !== null) {
      const rates = this.props.rates.rates.map((item, index) => {
        return <ConverterItem key={index} {...item}/>
      })
      ratesTable.push(<ConverterItem iso={'BYN'} quantity={1} rate={1}/>)
      ratesTable.push([...rates])
    }

    return (
      <div className={classes.converter}>
        {ratesTable}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    rates: state.rates
  }
}

export default connect(mapStateToProps, null)(Convereter);