import React, { Component } from 'react';
import classes from './ListConverter.module.css'
import { connect } from 'react-redux';
import ListConverterItem from '../ListConverterItem/ListConverterItem'

class ListConverter extends Component {

  render() {
    const changeActive = this.props.changeActive;
    const iso = this.props.iso;
    const isActive = this.props.isActive ? classes.ListConverter__active : '';
    this.props.isActive ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto'

    const rates = (this.props.rates.rates) ? this.props.rates.rates.map(item => {
      return <ListConverterItem changeActive={changeActive} action={this.props.action} rate={item} checked={iso === item.iso} />
    }) : null;
  
    const listConverterClasses = `${classes.ListConverter} ${isActive}`

    return (
      <div className={listConverterClasses}>

        <div className={classes.close} onClick={changeActive}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="dismiss_24"><g fill="currentColor" fill-rule="nonzero"><circle opacity=".12" cx="12" cy="12" r="12"></circle><path d="M12 10.727l3.464-3.463a.9.9 0 111.272 1.272L13.273 12l3.463 3.464a.9.9 0 11-1.272 1.272L12 13.273l-3.464 3.463a.9.9 0 11-1.272-1.272L10.727 12 7.264 8.536a.9.9 0 011.272-1.272L12 10.727z"></path></g></svg>
        </div>
        
        <h2>Выбор валюты</h2>

        <div className={classes.input__search}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="search_outline_16">
            <g fill="none" fill-rule="evenodd" opacity=".92">
              <path opacity=".1" d="M0 0h16v16H0z"></path>
              <path d="M9.823 10.884a5.5 5.5 0 111.06-1.06l3.896 3.9a.75.75 0 01-1.061 1.06l-3.895-3.9zM6.5 10.5a4 4 0 100-8 4 4 0 000 8z" fill="currentColor" fill-rule="nonzero"></path>
            </g>
          </svg>
          <input type="text" placeholder="Поиск"/>
        </div>

        <div className={classes.ListConverter__rates}>
          {rates}
        </div>
        
      </div>      
    );
  }
}

function mapStateToProps(state) {
  return {
    rates: state.rates
  }
}

export default connect(mapStateToProps, null)(ListConverter);