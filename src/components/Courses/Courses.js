import React, { Component } from 'react';
import classes from './Courses.module.css';

import { connect } from 'react-redux';
import { getAllRates, addToFavorite } from '../../store/actions/actionCreators';

class Courses extends Component{
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
        <th></th>
        <th>{rate}</th>
        <th>{course}</th>
        <th>{code}</th>
        <th>{numbers}</th>
      </tr>
    )
  } 

  componentDidUpdate(prevProps) {
    if (this.props.rates.pageYOffset !== 0) {
      window.scrollTo(0, this.props.rates.pageYOffset)
    }
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
      <div className={classes.tableContainer}>
        <table>
          {sortRates}
        </table>
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
    getAllRates: () => dispatch(getAllRates()),
    addToFavorite: (id, state) => dispatch(addToFavorite(id, state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
