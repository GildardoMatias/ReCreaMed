import React, { Component } from 'react'
import { Table } from 'antd'

export class Dash extends Component {
     dataSource = [
        {
          key: '1',
          name: 'Antonio Lopez',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'Benito Maximo',
          age: 42,
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
          title: 'Edad',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Direccion',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Expediente',
          dataIndex: 'xped',
          key: 'xped',
        },
        {
          title: 'Medico',
          dataIndex: 'med',
          key: 'med',
        },
      ];
    render() {
        return (
            <div>
                <h1>Pacientes</h1>
                <Table dataSource={this.dataSource} columns={this.columns} />
            </div>
        )
    }
}

export default Dash
