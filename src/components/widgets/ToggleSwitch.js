import React, { Component } from 'react'
import './ToggleSwitch.css';

import Switch from '@material-ui/core/Switch';

export default class ToggleSwitch extends React.Component {


    handleChange = name => event => {
      //  this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <div>
                <label className="switch">
                    <input type="checkbox"
                     defaultChecked={this.props.isChecked}
                     onChange={this.handleChange}></input>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}