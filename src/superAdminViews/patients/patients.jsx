import React, { useEffect, useState} from 'react'
import { Table } from 'antd'

export default function Users() {
    const [usuarios, setUsuarios] = useState();
    const [usuariosIsLoading, setUsuariosIsLoading] = useState(true);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'cedula',
            dataIndex: 'cedula',
            key: 'cedula',
        },
        {
            title: 'id_medicoasignado',
            dataIndex: 'id_medicoasignado',
            key: 'id_medicoasignado',
        },
    ];
    


    const getUsers = () => {
        fetch('https://recreamed.com/usuarios', {
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => response.json())
            .then(data => { setUsuarios(data); setUsuariosIsLoading(false); console.log(data) })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div style={{ padding: 40 }}>
            <h4>Usuarios</h4>

            <Table dataSource={dataSource} columns={columns} />


        </div>
    )
}
