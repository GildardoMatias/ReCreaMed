import React, { Component } from 'react'
import { Table } from 'antd'

export class Dash extends Component {
     dataSource = [
        {
          key: '1',
          name: 'Miguel Alvarez Cortez',
          age: 565454,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'Josue Justo Vargas',
          age: 12332165845,
          address: '10 Downing Street',
        },
      ];
      
       columns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Cedula',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Direccion',
          dataIndex: 'address',
          key: 'address',
        },
      ];
    render() {
        return (
            <div>
                <h1>Doctores</h1>
                <Table dataSource={this.dataSource} columns={this.columns} />
            </div>
        )
    }
}

export default Dash
