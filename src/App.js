import React, { Component } from 'react';
import classes from './App.module.css';
import Converter from './components/Converter/Converter'

import { connect } from 'react-redux';
import { getAllRates, addToFavorite, getGraphicRates } from './store/actions/actionCreators';
import Courses from './components/Courses/Courses';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home';


class App extends Component{

  componentDidMount() {
    this.props.getAllRates();
  }

  render() {
    console.log('app', this.props)
    return (
        <div className={classes.App}>
          <Switch>
            <Route path='/converter' component={Converter}/>
            <Route path='/courses' component={Courses}/>
            <Route path='/' component={Home}/>
          </Switch>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    graphicRates: state.graphicRates,
    fromRate: state.fromRate,
    toRate: state.toRate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllRates: () => dispatch(getAllRates()),
    getGraphicRates: () => dispatch(getGraphicRates()),
    addToFavorite: (id, state) => dispatch(addToFavorite(id, state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
