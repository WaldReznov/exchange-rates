import React, {Component} from 'react';
import classes from './Layout.module.css';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom'

class Layout extends Component {
  render() {
    return (
      <div className={classes.layout}>
        <h1>Курсы валют</h1>

        <div className={classes.layout__children}>
          {this.props.children}
        </div>

        <div className={classes.navContainer}>
          <nav>
            <ul>
              <li><NavLink activeClassName={classes.active} exact to="/">Главная</NavLink></li>
              <li><NavLink activeClassName={classes.active} to="/courses">Курсы</NavLink></li>
              <li><NavLink activeClassName={classes.active} to="/converter">Конвертер</NavLink></li>
            </ul>          
          </nav>
        </div>
      </div>
    )
  }
}


export default connect()(Layout);