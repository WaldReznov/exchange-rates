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
    const {iso, quantity, rate, bynRate} = this.props

    let value = bynRate / rate * quantity;

    if(this.f(value) > 2) {
      value = parseFloat(value.toFixed(2))
    } 

    value = this.check(value);
    console.log('props', this.props)

    console.log(`iso ${iso}`);

    return (
      <div className={classes.converterItem}>
        <div className={classes.converterText} onClick={this.changeActive}>
          {iso !== undefined ? (
            <div className={classes.convertItem__img}>
              <img src={`https://www.countryflags.io/${iso.slice(0, 2)}/flat/64.png`} />
            </div>
          ) : ''}
          <p>{iso}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" id="dropdown_16"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v12H0z"></path><path d="M4.454 3.691A.9.9 0 103.346 5.11l4.096 3.203a.9.9 0 001.109 0l4.1-3.203a.9.9 0 10-1.108-1.418L7.997 6.46l-3.543-2.77z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
        </div>
        <input 
          autoFocus
          type="number"
          className={classes.input}
          onChange={event => this.props.convertRate(+event.target.value, rate, quantity)} 
          value={+value}/>

          <ListConverter iso={iso} action={this.props.action} isActive={isActive} changeActive={this.changeActive} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bynRate: state.rates.rate,
    rates: state.rates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    convertRate: (value, rate, quantity) => dispatch(convertRate(value, rate, quantity))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConvereterItem);