import React, { Component } from 'react';
import classes from './App.module.css';

import { connect } from 'react-redux';
import { getAllRates, addToFavorite } from './store/actions/actionCreators';

class App extends Component{

  componentDidMount() {
    this.props.getAllRates();
    console.log(this.props)
  }

  createRatesRow = (rate, course, iso, numbers, code, favorite) => {
    if (favorite === undefined) {
      favorite = false;
    }

    let urlImage = (favorite === false) ? 'https://image.flaticon.com/icons/png/512/3004/3004102.png' 
                                        : 'https://image.flaticon.com/icons/png/512/3004/3004112.png';
    
    return (
      <tr className='rate-row' key={code}>
        <td>
          <img 
            className={classes.star} 
            src={urlImage}
            onClick={() => this.props.addToFavorite(iso, favorite)}
            alt="favorite"/>
        </td>
        <td>{rate}</td>
        <td>{course}</td>
        <td>{iso}</td>
        <td>{numbers}</td>
      </tr>
    )
  } 

  createRatesHeader = (rate, course, code, numbers, key) => {
    return (
      <tr className='rate-row' key={key}>
        <th>Избранные</th>
        <th>{rate}</th>
        <th>{course}</th>
        <th>{code}</th>
        <th>{numbers}</th>
      </tr>
    )
  } 

  render() {
    let rates = this.props.rates.rates;
    let sortRates;
    if(rates !== null) {
      let favoriteRates = rates.map((item) => {
        if(item.favorite) {
          return this.createRatesRow(item.name, item.rate, item.iso, item.quantity, item.code, item.favorite)
        }
      }).filter((item) => item !== undefined)

      let notFavoriteRates = rates.map((item) => {
        if(!item.favorite) {
          return this.createRatesRow(item.name, item.rate, item.iso, item.quantity, item.code, item.favorite)
        }
      }).filter((item) => item !== undefined)
      sortRates = [this.createRatesHeader('Валюта', 'Курс', 'Код', 'Единиц', 0), ...favoriteRates, ...notFavoriteRates];
    }
    
    return (
      <table>
        {sortRates}
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    rates: state.rates,
    fromRate: state.fromRate,
    toRate: state.toRate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllRates: () => dispatch(getAllRates()),
    addToFavorite: (id, state) => dispatch(addToFavorite(id, state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
