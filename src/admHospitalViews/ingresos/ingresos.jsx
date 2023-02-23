import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Select } from 'antd';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../resources';
import CreateBalance from './create-ingreso';
import Loading from '../../loading';

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

    const getBalancesData = (id_medico) => { getData(`balances/${id_medico}`).then((rs) => { setIngresosData(rs); console.log('balances', rs); }) }

    const MatchPatient = ({ paciente }) => {
        const patient = pacientesData.find((p) => paciente === p._id)
        return <div>{patient ? patient.name : <Text disabled>Usuario no encontrado</Text>}</div>
    }

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => { return <>{createdAt.substring(0, 10)}</> }
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
                return cita ? <MatchPatient paciente={cita.usuario} /> : <Text disabled>Cita y usuario no existente</Text>
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
            render: (_, record) => <Button onClick={() => { setIngresoForEdit(record); showModal() }}>Editar</Button>
        },
    ];

    if (loading) return <Loading />

    return (
        <div className='mainContainer'>
            <div className='fila'><h4>Ingresos de cada Medico</h4><Button onClick={showModal} type='primary' style={{ marginLeft: 32 }}>Agregar Nuevo</Button></div>
            <br />
            <p className='datos'>Selecciona un medico a continuacion para ver sus ingresos</p>

            <Select options={medicosData} onChange={handleDoctorChange} style={{ width: 240 }} />
            {
                medico && <Table columns={columns} dataSource={ingresosData} />
            }
            <div style={{ height: 200 }}></div>

            <CreateBalance balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} getBalancesData={getBalancesData} />
        </div >
    )
}
