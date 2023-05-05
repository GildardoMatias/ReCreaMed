import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Modal } from 'antd';
import { deleteData, getData, usuario } from '../../resources';
import CreateBalance from './create-balance';
import Ticket from './ticket-for-print';

const { Text } = Typography;

export default function Balances() {
    const [balancesData, setBalancesData] = useState([])
    const [pacientesData, setPacientesData] = useState({})

    // Modal For Edit Ingreso
    const [ingresoForEdit, setIngresoForEdit] = useState(null)
    const [isIngresoModalOpen, setIsIngresoModalOpen] = useState(false);
    const showIngresoModal = () => { setIsIngresoModalOpen(true) };

    // Modal For Edit Gasto
    const [egresoForEdit, setEgresoForEdit] = useState(null)
    const [isEgresoModalOpen, setIsEgresoModalOpen] = useState(false);
    const showEgresoModal = () => { setIsEgresoModalOpen(true) };

    // Modal For Ticket
    const [ingresoForPrint, setIngresoForPrint] = useState([])
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const showTicketModal = () => { setIsTicketModalOpen(true) }
    const handleTicketOk = () => { setIsTicketModalOpen(false) }
    const handleTicketCancel = () => { setIsTicketModalOpen(false) }

    useEffect(() => { return getPacientesData() }, [])

    const getPacientesData = () => { getData(`mispacientes/${usuario._id}`).then((rs) => { setPacientesData(rs); getBalancesData(); console.log('pacientes', rs); }) }
    const getBalancesData = () => { getData(`balances/medico/${usuario._id}`).then((rs) => { setBalancesData(rs.reverse()); console.log('balances', rs); }) }

    const MatchPatient = ({ paciente }) => {
        const patient = pacientesData.find((p) => paciente === p._id)
        return <div>{patient ? patient.name : <Text disabled>Paciente eliminado o no existente</Text>} <p style={{ fontSize: 10 }}>Tomado de la cita</p></div>
    }

    const columns = [
        {
            title: 'Fecha y Hora',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => { return <>{new Date(createdAt).toLocaleString()}</> }
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
            render: (_, { tipo }) => {
                let color = (tipo && tipo === 'ingreso') ? 'geekblue' : 'volcano';
                return tipo ? <Tag color={color} >{tipo.toUpperCase()}</Tag> : <Tag color={color}>Indefinido</Tag>
            },
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
            // render: (_, { cita }) => {
            //     return cita ? <MatchPatient paciente={cita.usuario} /> : <Text disabled>Sin Paciente</Text>
            // },
            render: (_, record) => {
                if (record.cita) return <MatchPatient paciente={record.cita.usuario} />
                else if (record.paciente) return <>{record.paciente.name}</>
                else return <Text type="secondary"> Sin Paciente</Text>
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
            title: 'Acciones',
            key: 'Editar',
            render: (_, record) => <div className='fila'>
                <Button onClick={() => { setIngresoForEdit(record); showIngresoModal() }}>Editar</Button>
                {record.tipo === 'ingreso' && <Button onClick={() => { console.log(record); setIngresoForPrint([record]); showTicketModal() }}>Imprimir Nota</Button>}
            </div>
        },
    ];


    return (
        <div className='mainContainer'>
            <div className='fila'>
                <h4>Tabla de Ingresos</h4>
                <Button onClick={showIngresoModal} type='primary' ghost style={{ marginLeft: 32 }}>Agregar Ingreso</Button>
                <Button onClick={showEgresoModal} type='primary' ghost style={{ marginLeft: 32 }}>Agregar Gasto</Button>
            </div>
            <Table columns={columns} dataSource={balancesData} />
            <div style={{ height: 200 }}></div>

            {/* Ingreso */}
            <CreateBalance tipo='ingreso' balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsIngresoModalOpen} isModalOpen={isIngresoModalOpen} getBalancesData={getBalancesData} />

            {/* Gasto */}
            <CreateBalance tipo='egreso' balanceForEdit={egresoForEdit} setBalanceForEdit={setEgresoForEdit} setIsModalOpen={setIsEgresoModalOpen} isModalOpen={isEgresoModalOpen} getBalancesData={getBalancesData} />

            {/* Ticket */}
            <Modal title="Imprimir Nota de Venta" open={isTicketModalOpen} onOk={handleTicketOk} onCancel={handleTicketCancel} width={600}>
                <Ticket ingresos={ingresoForPrint} logo="https://api.recreamed.com/images/bd71d914-1f11-4bea-81e5-81b55e11a4e1.jpg" company='Hospital: ' seller='Médico: ' buyer='Paciente: ' />
            </Modal>


        </div >
    )
}
