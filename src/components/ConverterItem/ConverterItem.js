import React, { Component } from 'react';
import classes from './ConverterItem.module.css'
import { connect } from 'react-redux';
import { convertRate } from '../../store/actions/actionCreators';

class ConvereterItem extends Component {

  f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );


  render() {
    const {iso, quantity, rate, bynRate} = this.props;

    let value = bynRate / rate * quantity;

      
      if(this.f(value) > 5) {
        value = parseFloat(value.toFixed(5))
      }

    return (
      <div className={classes.converterItem}>
        <p>{iso}</p>
        <input 
          type="number"
          className={classes.input}
          onChange={event => this.props.convertRate(+event.target.value, rate, quantity)} 
          value={value}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    bynRate: state.rates.rate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    convertRate: (value, rate, quantity) => dispatch(convertRate(value, rate, quantity))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConvereterItem);