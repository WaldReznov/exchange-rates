import React, { Component } from 'react';
import classes from './ConverterItem.module.css'
import { connect } from 'react-redux';
import { convertRate } from '../../store/actions/actionCreators';
import ListConverter from '../ListConverter/ListConverter';


class ConvereterItem extends Component {

  f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

  state = {
    isActive: false
  }

  check(value) {
    const arr = `${value}`.split('');
    return arr[0] === '0' && arr[1] !== '0' && typeof arr[1] === 'number' ? arr[1] : value  
  }

  changeActive = () => {
    this.setState({
      isActive: !this.state.isActive
    })

    console.log(this.state.isActive);
  }

  render() {
    const isActive = this.state.isActive;
    const {iso, quantity, rate, bynRate} = this.props;

    let value = bynRate / rate * quantity;

    if(this.f(value) > 2) {
      value = parseFloat(value.toFixed(2))
    } 

    value = this.check(value);

    console.log(`value ${value}`);

    return (
      <div className={classes.converterItem}>
        <div className={classes.converterText} onClick={this.changeActive}>
          <img src="data:image/png;base64,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"/>
          <p>{iso}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" id="dropdown_16"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v12H0z"></path><path d="M4.454 3.691A.9.9 0 103.346 5.11l4.096 3.203a.9.9 0 001.109 0l4.1-3.203a.9.9 0 10-1.108-1.418L7.997 6.46l-3.543-2.77z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
        </div>
        <input 
          autoFocus
          type="number"
          className={classes.input}
          onChange={event => this.props.convertRate(+event.target.value, rate, quantity)} 
          value={+value}/>

          <ListConverter iso={iso} isActive={isActive} changeActive={this.changeActive} />
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