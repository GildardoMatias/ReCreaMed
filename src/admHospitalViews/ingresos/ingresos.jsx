import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Modal, Card, Row, Col, Switch, Select } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons'
import moment from 'moment/moment';

import { getData, usuario, sendDataBody, ids_hospitales } from '../../resources';
import CreateBalance from './create-ingreso';
import Loading from '../../loading';
import Ticket from './ticket-for-print';
import IngersosHosptal from './ingresos.hospital';

const { Text } = Typography;

export default function Ingresos() {
    const [loading, setLoading] = useState(true)
    const [medicosData, setMedicosData] = useState({}) // Populate the main select component
    const [medico, setMedico] = useState(null)
    const [ingresosData, setIngresosData] = useState([])
    const [ingresoForEdit, setIngresoForEdit] = useState({})
    const [ingresoForPrint, setIngresoForPrint] = useState([])

    // Modal For Add/Edit Inreso
    const [isIngresoModalOpen, setIsIngresoModalOpen] = useState(false);
    const showIngresoModal = () => { setIsIngresoModalOpen(true) };
    // Modal For Add/Edit Enreso
    const [isEgresoModalOpen, setIsEgresoModalOpen] = useState(false)
    const showEgresoModal = () => { setIsEgresoModalOpen(true) };

    // Select logo for print in receta. Switches the modal view into select logo hospital/pdf recipe for print
    const [logoHospital, setLogoHospital] = useState(null)
    const [nombreHospital, setNombreHospital] = useState(null)
    const [isLogoSelected, setIsLogoSelected] = useState(false)

    // Modal For Ticket
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const showTicketModal = () => { setIsTicketModalOpen(true); };
    const handleTicketOk = () => { setIsTicketModalOpen(false); setIsLogoSelected(false) };
    const handleTicketCancel = () => { setIsTicketModalOpen(false);; setIsLogoSelected(false) };

    const [lastFecha, setLastFecha] = useState("")
    const [firstFecha, setFirstFecha] = useState("")

    // Toggles between for medic/for hospital
    const [viewTipeMedics, setViewTipeMedics] = useState(false)

    useEffect(() => {
        getLastFechaCierre()
    }, [])

    function subtractMonths(date, months) { date.setMonth(date.getMonth() - months); return date; }

    const getLastFechaCierre = () => {
        getData(`cortes/${usuario._id}`).then((rs) => {
            setFirstFecha(rs.at(0).fecha_cierre)
            setLastFecha(rs.length > 1 ? rs.at(-1).fecha_cierre : subtractMonths(new Date(), 3))
        }).then(getIngresos())
    }

    const getIngresos = async () => {
        // First get List of medics
        const medicos = await sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales })

        medicos.forEach(m => { m.label = m.name; m.value = m._id; })// to pass to create modal
        setMedicosData(medicos) // to pass to create modal and select

        // const lastFechaCierre = await getData(`cortes/${usuario._id}`).then((rs) => {
        //     setFirstFecha(rs.at(0).fecha_cierre)
        //     setLastFecha(rs.length > 1 ? rs.at(-1).fecha_cierre : subtractMonths(new Date(), 3))
        //     return rs.length > 1 ? rs.at(-1).fecha_cierre : subtractMonths(new Date(), 3)
        // })

        const ids = medicos.map(doc => {
            return doc._id
        });
        getBalancesData(ids)
    }

    const getBalancesData = (medicos) => {
        const body = {
            fecha_inicio: lastFecha,
            medico: medicos
        }
        console.log(body)
        sendDataBody('balances', body).then((rs) => {
            console.log(rs)
            rs.forEach((i) => { i.doctor = i.medico; i.medico = i.medico._id; if (i.paciente) { i.usuario = i.paciente; i.paciente = i.paciente._id; } })
            setIngresosData(rs)
        }).finally(() => setLoading(false))
    }

    const handleEditIngreso = (record) => {
        record.fecha_hora = moment.utc(record.fecha_hora)
        setIngresoForEdit(record);
        showIngresoModal()
    }



    const columns = [
        {
            title: 'Médico',
            dataIndex: 'medico',
            key: 'createdAt',
            render: (_, { doctor }) => { return <>{doctor.name}</> }
        },
        // {
        //     title: 'Concepto',
        //     dataIndex: 'concepto',
        //     key: 'concepto',
        // },
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
            title: 'Fecha',
            dataIndex: 'fecha_hora',
            key: 'fecha_hora',
            render: (_, { fecha_hora }) => { return <>{new Date(fecha_hora).toLocaleString()}</> },
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.fecha_hora > b.fecha_hora,
        },
        {
            title: 'Monto',
            dataIndex: 'monto',
            key: 'monto',
            render: (_, { monto }) => { return <>${monto}</> }
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
                let color = forma_de_pago === 'efectivo' ? 'geekblue' : 'green';
                return <Tag color={color} >{forma_de_pago.toUpperCase()}</Tag>
            },
        },
        {
            title: 'Paciente',
            key: 'usuario',
            dataIndex: 'usuario',
            render: (_, record) => {
                // if (record.cita) return <>{record.cita.usuario}</>
                if (record.cita) return <div style={{ display: 'flex', flexDirection: 'column' }}>{record.cita.usuario.name} <span style={{ fontSize: 9 }}>Tomado de la cita</span></div> //when populate is ready
                else if (record.usuario) return <>{record.usuario.name}</>
                else return <Text type="secondary"> Sin Paciente</Text>
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
            // render: (_, { estado }) => {
            //     let color = estado === 'pagado' ? 'green' : 'geekblue';
            //     if (estado === 'pendiente' || estado === 'sin pagar') color = 'volcano';
            //     return <Tag color={color}> {estado.toUpperCase()} </Tag>
            // }
            render: (_, { abono, monto }) => {
                const pagado = abono === monto;
                let color = pagado ? 'green' : 'volcano';
                return <Tag color={color}> {pagado ? 'PAGADO' : 'PENDIENTE'} </Tag>
            }

        },
        {
            title: 'Acciones',
            key: 'Editar',
            render: (_, record) => <div style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                {/* <Button onClick={() => { deleteData(`balances/remove/${record._id}`).then(()=>getIngresos()) }}>Eliminar</Button> */}
                <Button size='small' onClick={() => handleEditIngreso(record)}>Editar Monto</Button>
                <Button size='small' onClick={() => { setIngresoForPrint([record]); showTicketModal() }}>Imprimir Nota</Button>
            </div>
        },
    ];

    // Toggle View Tipe medic/for all
    const onSwitchChange = (checked) => {
        setViewTipeMedics(checked)
        console.log(`switch to ${checked}`);
        if (!checked) getIngresos()
    };
    const handleDoctorChange = (value) => { setMedico(value); getBalancesData([value]); };


    if (loading) return <Loading />

    return (
        <div className='mainContainer'>
            {/* <div>first fecha cierre {firstFecha} </div>
            <div>last fecha cierre {lastFecha} </div> */}

            <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <h4>Ingresos de{viewTipeMedics ? 'l médico' : ' todos los medicos'}</h4>
                <Button ghost size='small' onClick={showIngresoModal} type='primary'  >Agregar Nuevo Ingreso</Button>
                <Button ghost size='small' onClick={showEgresoModal} type='primary'  >Agregar Nuevo Gasto</Button>
            </div>

            <div>
                Hospital <Switch onChange={onSwitchChange} /> Medico
                {
                    viewTipeMedics && <Select options={medicosData} onChange={handleDoctorChange} style={{ width: 240, marginLeft: 16 }} placeholder='Seleccione medico' />
                }
            </div>

            <br />

            <Table columns={columns} dataSource={ingresosData} size='small' />

            <IngersosHosptal ids_hospitales={ids_hospitales} />

            {/* Ingreso */}
            <CreateBalance tipo='ingreso' balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsIngresoModalOpen} isModalOpen={isIngresoModalOpen} getIngresos={getIngresos} medico={medico} medicosData={medicosData} />

            {/* Gasto */}
            <CreateBalance tipo='egreso' balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsEgresoModalOpen} isModalOpen={isEgresoModalOpen} getIngresos={getIngresos} medico={medico} medicosData={medicosData} />

            <Modal title="Imprimir Nota de Venta" open={isTicketModalOpen} onOk={handleTicketOk} onCancel={handleTicketCancel} width={600}>
                {
                    isLogoSelected ? // Si ya hay logo seleccionado, se pasa a la receta y se muestra en pdf
                        <Ticket ingresos={ingresoForPrint} logo={'https://api.recreamed.com/images/' + logoHospital} hospital={nombreHospital} seller='Médico: ' buyer='Paciente: ' />
                        :
                        <div>
                            <Card title='Selecciona un hospital' bordered={false}>
                                {
                                    usuario.horarios.map((h) => {
                                        return <Card.Grid style={{ width: '100%' }} onClick={() => { console.log(h.sucursal); setLogoHospital(h.sucursal.logo); setNombreHospital(h.sucursal.nombre); setIsLogoSelected(true) }} key={h._id}>
                                            <Row align="middle">
                                                <Col span={6} offset={4}><img width={64} src={'https://api.recreamed.com/images/' + h.sucursal.logo} alt="Logo" /></Col>
                                                <Col span={10}>{h.sucursal.nombre} <br /> {h.horario}</Col>
                                            </Row>
                                        </Card.Grid>
                                    })
                                }
                            </Card>
                        </div>
                }

            </Modal>
        </div >
    )
}
