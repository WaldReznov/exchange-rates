import React, {Component} from 'react';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {

  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.layout}>
        <main>
          {this.props.children}
        </main>

        <nav>
          <ul>
            <li className={classes.active}>Home</li>
            <li>Courses</li>
            <li>Exchange</li>
          </ul>          
        </nav>
      </div>
    )
  }
}


export default connect()(Layout);