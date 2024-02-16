import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Modal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons'
import { deleteData, getData, usuario } from '../../resources';
import CreateBalance from './create-balance';
import Ticket from './ticket-for-print';

const { Text } = Typography;

export default function Balances() {
    const [balancesData, setBalancesData] = useState([])

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

    useEffect(() => { getBalancesData() }, [])

    const getBalancesData = () => { getData(`balances/medico/${usuario._id}`).then((rs) => { setBalancesData(rs.reverse()); console.log('balances', rs); }) }


    const columns = [
        {
            title: 'Fecha y Hora',
            dataIndex: 'fecha_hpra',
            key: 'fecha_hora',
            render: (_, { fecha_hora }) => { return <>{new Date(fecha_hora).toLocaleString()}</> }
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
            render: (_, { monto }) => `$ ${monto}`
        },
        {
            title: 'Abono',
            dataIndex: 'abono',
            key: 'abono',
            render: (_, { abono }) => { return abono && <>${abono}</> }
        },
        {
            title: 'Adeudo',
            dataIndex: 'adeudo',
            key: 'adeudo',
            render: (_, record) => { return <>${record.monto - record.abono}</> }

        },
        {
            title: 'Forma de pago',
            key: 'forma_de_pago',
            dataIndex: 'forma_de_pago',
            render: (_, { forma_de_pago }) => {
                let color = forma_de_pago === 'efectivo' ? 'green' : 'geekblue';
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
                // if (record.cita) return <MatchPatient paciente={record.cita.usuario} />
                if (record.cita) return <div style={{ display: 'flex', flexDirection: 'column' }}>{record.cita.usuario.name} <span style={{ fontSize: 9 }}>Tomado de la cita</span></div> //when populate is ready
                else if (record.paciente) return <>{record.paciente.name}</>
                else return <Text type="secondary"> Sin Paciente </Text>
            },
        },
        {
            title: 'Factura',
            key: 'Factura',
            dataIndex: 'factura',
            render: (_, { factura }) => { return factura && <CheckCircleTwoTone /> }

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
                <Ticket ingresos={ingresoForPrint} idHospital={usuario.horarios[0].sucursal._id} logo="https://api.recreamed.com/images/bd71d914-1f11-4bea-81e5-81b55e11a4e1.jpg" company='Hospital: ' seller='Médico: ' buyer='Paciente: ' />
            </Modal>


        </div >
    )
}
