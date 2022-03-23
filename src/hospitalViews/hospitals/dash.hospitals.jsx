import React, { Component } from 'react'
import { Table } from 'antd';

export class Dash extends Component {
    //Start tabla data
    columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Numero Interior',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
    }
  ];
  
  data = [
    {
      key: '1',
      name: 'Prados Verdes',
      age: 32,
      address: 'Col Prados Verdes 22 Calle Corregidora',
      telefono: '1234567890',
      email: 'Correo@hospital.com'
    },
    {
      key: '2',
      name: 'Loma Alta',
      age: 42,
      address: 'Col Prados Verdes 22 Calle Corregidora',
      telefono: '1234567890',
      email: 'Correo@hospital.com'
    },
    {
      key: '3',
      name: 'Santana',
      age: 32,
      address: 'Col Prados Verdes 22 Calle Corregidora',
      telefono: '1234567890',
      email: 'Correo@hospital.com'
    },
    {
      key: '4',
      name: 'Esperanza',
      age: 32,
      address: 'Col Prados Verdes 22 Calle Corregidora',
      telefono: '1234567890',
      email: 'Correo@hospital.com'
    },
  ];
  
  onChange (pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
    //End tabla data
    render() {
        return (
            <div>
                <h1>Todos los hospitales</h1>
                <Table columns={this.columns} dataSource={this.data} onChange={this.onChange} />
            </div>
        )
    }
}

export default Dash
