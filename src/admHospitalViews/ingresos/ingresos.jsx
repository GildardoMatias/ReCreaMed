import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Select, Modal } from 'antd';
import { getData, usuario, sendDataBody, ids_hospitales, deleteData } from '../../resources';
import CreateBalance from './create-ingreso';
import Loading from '../../loading';
import Ticket from './ticket-for-print';
import moment from 'moment/moment';

const { Text } = Typography;

export default function Ingresos() {
    const [loading, setLoading] = useState(true)
    const [medicosData, setMedicosData] = useState({}) // Populate the main select component
    const [medico, setMedico] = useState(null)
    const [ingresosData, setIngresosData] = useState([])
    const [ingresoForEdit, setIngresoForEdit] = useState({})
    const [ingresoForPrint, setIngresoForPrint] = useState([])

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
        getIngresos()
    }, [])

    const getIngresos = async () => {
        const medicos = await sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales })

        medicos.forEach(m => { m.label = m.name; m.value = m._id; })// to pass to create modal
        setMedicosData(medicos) // to pass to create modal

        const promises = medicos.map(medico => getData(`balances/ingresos/${medico._id}`));

        Promise.all(promises)
            .then(resultados => {
                const ingresos = resultados.flat(); // concatenar todos los arrays de ingresos
                console.log(ingresos);
                // Doctor is for details, medico is for edit. Usuario is for details, paciente id for Edit
                ingresos.forEach((i) => { i.doctor = i.medico; i.medico = i.medico._id; if (i.paciente) { i.usuario = i.paciente; i.paciente = i.paciente._id; } })
                setIngresosData(ingresos.reverse())
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleEditIngreso = (record) => {
        record.fecha_hora = moment.utc(record.fecha_hora)
        setIngresoForEdit(record);
        showModal()
    }

    const columns = [
        {
            title: 'Médico',
            dataIndex: 'medico',
            key: 'createdAt',
            render: (_, { doctor }) => { return <>{doctor.name}</> }
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha_hora',
            key: 'fecha_hora',
            render: (_, { fecha_hora }) => { return <>{new Date(fecha_hora).toLocaleString()}</> }
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
            key: 'usuario',
            dataIndex: 'usuario',
            render: (_, { usuario }) => { return <>{usuario.name}</> },
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
                {/* <Button onClick={() => { deleteData(`balances/remove/${record._id}`).then(()=>getIngresos()) }}>Eliminar</Button> */}
                <Button onClick={() => handleEditIngreso(record)}>Editar</Button>
                <Button onClick={() => { setIngresoForPrint([record]); showTicketModal() }}>Imprimir Nota</Button>
            </div>
        },
    ];

    const ingresos = [
        { id: 1, product: 'Ketamina 1', quantity: 1, price: 1200 },
    ];

    if (loading) return <Loading />

    return (
        <div className='mainContainer'>
            <h4>Ingresos de todos los medicos</h4>
            <br />

            {/* <div></div> */}

            <Button onClick={showModal} type='primary' style={{ marginBottom: 22 }} >Agregar Nuevo Ingreso</Button>

            <Table columns={columns} dataSource={ingresosData} />

            <div style={{ height: 200 }}></div>

            <CreateBalance balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} getIngresos={getIngresos} medico={medico} medicosData={medicosData} />

            <Modal title="Imprimir Nota de Venta" open={isTicketModalOpen} onOk={handleTicketOk} onCancel={handleTicketCancel} width={600}>
                <Ticket ingresos={ingresoForPrint} logo="https://api.recreamed.com/images/bd71d914-1f11-4bea-81e5-81b55e11a4e1.jpg" company='Hospital: ' seller='Médico: ' buyer='Paciente: ' />
            </Modal>
        </div >
    )
}
