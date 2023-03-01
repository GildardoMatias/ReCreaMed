import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography } from 'antd';
import { getData, usuario } from '../../resources';
import CreateBalance from './create-balance';

const { Text } = Typography;

export default function Balances() {
    const [balancesData, setBalancesData] = useState([])
    const [balanceForEdit, setBalanceForEdit] = useState({})
    const [pacientesData, setPacientesData] = useState({})

    // Modal For Edit Balance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };


    useEffect(() => { return getPacientesData() }, [])

    const getPacientesData = () => { getData(`mispacientes/${usuario._id}`).then((rs) => { setPacientesData(rs); getBalancesData(); console.log('pacientes', rs); }) }
    const getBalancesData = () => { getData(`balances/ingresos/${usuario._id}`).then((rs) => { setBalancesData(rs.reverse()); console.log('balances', rs); }) }

    const MatchPatient = ({ paciente }) => {
        const patient = pacientesData.find((p) => paciente === p._id)
        return <div>{patient ? patient.name : <Text disabled>Paciente eliminado o no existente</Text>}</div>
    }

    const columns = [
        {
            title: 'Fecha y Hora',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => { return <>{new Date(createdAt).toLocaleString()}</> }
        },
        {
            title: 'Monto',
            dataIndex: 'monto',
            key: 'monto',
        },
        {
            title: 'Forma de pago',
            key: 'forma_de_pago',
            dataIndex: 'forma_de_pago',
            render: (_, { forma_de_pago }) => {
                let color = forma_de_pago === 'efectivo' ? 'geekblue' : 'green';
                return <Tag color={color} >{forma_de_pago.toUpperCase()}</Tag>
            },
        },
        {
            title: 'Paciente',
            key: 'cita.paciente',
            dataIndex: 'cita',
            render: (_, { cita }) => {
                return cita ? <MatchPatient paciente={cita.usuario} /> : <Text disabled>Sin Paciente</Text>
            },
        },
        {
            title: 'Estado',
            key: 'Estado',
            dataIndex: 'estado',
            render: (_, { estado }) => {

                let color = estado === 'pagado' ? 'geekblue' : 'green';
                if (estado === 'pendiente' || estado === 'sin pagar') color = 'volcano';

                return <Tag color={color}> {estado.toUpperCase()} </Tag>
            }

        },
        {
            title: 'Editar',
            key: 'Editar',
            render: (_, record) => <Button onClick={() => { setBalanceForEdit(record); showModal() }}>Editar</Button>
        },
    ];


    return (
        <div className='mainContainer'>
            <div className='fila'><h4>Tabla de Ingresos</h4><Button onClick={showModal} type='primary' style={{ marginLeft: 32 }}>Agregar Nuevo</Button></div>
            <Table columns={columns} dataSource={balancesData} />
            <div style={{ height: 200 }}></div>

            <CreateBalance balanceForEdit={balanceForEdit} setBalanceForEdit={setBalanceForEdit} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} getBalancesData={getBalancesData} />
        </div >
    )
}
