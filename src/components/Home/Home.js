import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getGraphicRates } from '../../store/actions/actionCreators';
import classes from './Home.module.css';



class Home extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
    console.log('graphicRates' , this.props)
  }

  laneData = (labels, dates) => {
    return {
      labels: labels,
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dates,
        }
      ]
    };
  }

  lineGraphic = (data, title) => {
    return (
      <div className={classes.graphicItem}>
        <div className={classes.title}>
          {title}
        </div>

        <Line data={data} options = {{
          legend: {
              display: false
          },
          scales:{
            xAxes: [{
                // display: false //this will remove all the x-axis grid lines
            }]
          }
        }}/>
      </div>
    )
  }

  render() {
    const graphicRates = this.props.rates.graphicRates;
    const rates = this.props.rates.rates;
    console.log('graphicRates', graphicRates[0])
    let graphics;
    if(graphicRates[0] !== undefined) {
      graphics = graphicRates.map(rate => {
        const labels = rate.map(item => item.date).reverse();
        const dates = rate.map(item => item.rate).reverse();
        const title = rate.find(item => item.iso === rate[0]['iso']);
        const data = this.laneData(labels, dates);

        return this.lineGraphic(data, title.name);
      })
    }

    return (
      <div className={classes.graphic}>
      {graphics}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rates: state.rates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGraphicRates: () => dispatch(getGraphicRates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);