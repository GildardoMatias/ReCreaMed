import React, { Component } from 'react'
// import {Card } from 'antd'
import SideMenu from './side.patients';

export class Patients extends Component {
    render() {
        return (
            <div>
                <div>
                            <SideMenu />
                </div>
            </div>
        )
    }
}

export default Patients
