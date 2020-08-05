import React, {Component} from 'react';
import classes from './Layout.module.css';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom'

class Layout extends Component {

  state = {
    menuY: 0,
    showMenu: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {

    const aa = this.state.menuY > window.pageYOffset;

    this.setState({
      showMenu: aa,
      menuY: window.pageYOffset
    })

    if(window.pageYOffset === 0) {
      this.setState({
        showMenu: true,
        menuY: window.pageYOffset
      })
    }
  }

  render() {
    const isActive = this.state.showMenu ? classes.navContainer__active : '';
    const listConverterClasses = `${classes.navContainer} ${isActive}`

    return (
      <div className={classes.layout}>
        <h1>Курсы валют</h1>

        <div className={classes.layout__children}>
          {this.props.children}
        </div>
        

        <div className={listConverterClasses}>
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