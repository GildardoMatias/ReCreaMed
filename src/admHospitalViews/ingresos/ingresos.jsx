import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Select, Modal } from 'antd';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../resources';
import CreateBalance from './create-ingreso';
import Loading from '../../loading';
import Ticket from './ticket-for-print';

const { Text } = Typography;

export default function Ingresos() {
    const [loading, setLoading] = useState(true)
    const [medicosData, setMedicosData] = useState({}) // Populate the main select component
    const [medico, setMedico] = useState(null)
    const [ingresosData, setIngresosData] = useState([])
    const [ingresoForEdit, setIngresoForEdit] = useState({})
    const [pacientesData, setPacientesData] = useState({})

    // Modal For Edit Balance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };

    // Modal For Ticket
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const showTicketModal = () => {
        setIsTicketModalOpen(true);
    };
    const handleTicketOk = () => {
        setIsTicketModalOpen(false);
    };
    const handleTicketCancel = () => {
        setIsTicketModalOpen(false);
    };

    useEffect(() => {
        return getPacientesData() // GEt all patients once, then get medics
    }, [])


    // useEffect(() => { getPacientesData() }, [])
    // useEffect(() => { getPacientesData() }, [isModalOpen])

    // First of all, get patients to match names, then get medicos to populate select
    const getPacientesData = () => { getData(`users_by_rol/Paciente`).then((rs) => { setPacientesData(rs); getDoctorsData() }) }

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            rs.forEach(m => { m.value = m._id; m.label = m.name })
            setMedicosData(rs)
        }).finally(() => setLoading(false))
    }
    const handleDoctorChange = (value) => { setMedico(value); getBalancesData(value); };

    const getBalancesData = (id_medico) => { getData(`balances/ingresos/${id_medico}`).then((rs) => { setIngresosData(rs); console.log('balances', rs); }) }

    const MatchPatient = ({ paciente }) => {
        const patient = pacientesData.find((p) => paciente === p._id)
        return <div>{patient ? patient.name : <Text disabled>Usuario no encontrado</Text>}</div>
    }

    const columns = [
        {
            title: 'Fecha',
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
                <Button onClick={() => { setIngresoForEdit(record); showModal() }}>Editar</Button>
                <Button onClick={() => { showTicketModal() }}>Generar Ticket</Button>
            </div>
        },
    ];

    const data = [
        { id: 1, product: 'Ketamina 1', quantity: 1, price: 1200 },
        // { id: 2, product: 'Producto 2', quantity: 1, price: 5 },
        // { id: 3, product: 'Producto 3', quantity: 3, price: 15 },
    ];

    if (loading) return <Loading />

    return (
        <div className='mainContainer'>
            <h4>Ingresos de cada Medico</h4>
            <br />
            <p className='datos'>Selecciona un medico a continuacion para ver sus ingresos</p>

            <div className='fila'>
                <Select options={medicosData} onChange={handleDoctorChange} style={{ width: 240 }} />
                <Button onClick={showModal} type='primary' style={{ marginLeft: 32 }} disabled={!medico}>Agregar Nuevo Ingreso</Button>
            </div>
            {
                medico && <Table columns={columns} dataSource={ingresosData} />
            }
            <div style={{ height: 200 }}></div>

            <CreateBalance balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} getBalancesData={getBalancesData} medico={medico} />

            <Modal title="Imprimir Ticket" open={isTicketModalOpen} onOk={handleTicketOk} onCancel={handleTicketCancel} width={600}>
                <Ticket data={data} logo="https://api.recreamed.com/images/bd71d914-1f11-4bea-81e5-81b55e11a4e1.jpg" company='Hospital: ' seller='Médico: ' buyer='Paciente: ' />
            </Modal>
        </div >
    )
}



