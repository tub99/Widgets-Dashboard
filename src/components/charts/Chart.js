import React, { Component } from 'react';
import MeasureWidget from '../widgets/MeasureWidget';
import './Chart.css';
import SplineChart from '../widgets/SplineChart';

export default class Chart extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="row chart-container">
          <div className="col-lg-8 chart-label">
            <h4>{this.props.chartProps.label}</h4>
          </div>
          <div className="col-lg-4 chart-label">
            <button type="button" className="btn  chart-buttons day-btn">Day</button>
            <button type="button" className="btn chart-buttons week-btn">Week</button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 spline-container card-body">
            <SplineChart className=""
              chartLabel={this.props.chartProps.label}
              chartData={this.props.chartProps.data} />
          </div>
        </div>

      </React.Fragment>

    );
  }
}
