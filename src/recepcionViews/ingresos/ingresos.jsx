import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Card, Modal, Row, Col, Switch, Select } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons'
import { getData, usuario, sendDataBody, ids_hospitales  } from '../../resources';
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

    // Select logo for print in receta. Switches the modal view into select logo hospital/pdf recipe for print
    const [logoHospital, setLogoHospital] = useState(null)
    const [nombreHospital, setNombreHospital] = useState(null)
    const [isLogoSelected, setIsLogoSelected] = useState(false)

    // Modal For Edit Balance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };

    // Modal For Ticket
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const showTicketModal = () => { setIsTicketModalOpen(true) };
    const handleTicketOk = () => { setIsTicketModalOpen(false); setIsLogoSelected(false) };
    const handleTicketCancel = () => { setIsTicketModalOpen(false); setIsLogoSelected(false) };

    // Modal For Add/Edit Gasto
    // const [isEgresoModalOpen, setIsEgresoModalOpen] = useState(false)
    // const showEgresoModal = () => { setIsEgresoModalOpen(true) };

    // Toggles between for medic/for hospital
    const [viewTipeMedics, setViewTipeMedics] = useState(false)

    // const [lastFecha, setLastFecha] = useState("")
    // const [firstFecha, setFirstFecha] = useState("")


    function subtractMonths(date, months) { date.setMonth(date.getMonth() - months); return date; }


    useEffect(() => {
        getIngresos()
    }, [])

    const getIngresos = async () => {
        const medicos = await sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales })

        medicos.forEach(m => { m.label = m.name; m.value = m._id; })// to pass to create modal
        setMedicosData(medicos) // to pass to create modal

        const promises = medicos.map(medico => getData(`balances/medico/${medico._id}`));

        Promise.all(promises)
            .then(resultados => {
                const ingresos = resultados.flat(); // concatenar todos los arrays de ingresos
                console.log(ingresos);
                // Doctor is for details, medico is for edit. Usuario is for details, paciente id for Edit
                ingresos.forEach((i) => { i.doctor = i.medico; i.medico = i.medico._id; if (i.paciente) { i.usuario = i.paciente; i.paciente = i.paciente._id; } })
                setIngresosData(ingresos.sort((a, b) => a.fecha_hora < b.fecha_hora))
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
            sorter: (a, b) => a.fecha_hora > b.fecha_hora,
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
                let color = forma_de_pago === 'efectivo' ? 'green' : 'geekblue';
                return <Tag color={color} >{forma_de_pago.toUpperCase()}</Tag>
            },
        },
        {
            title: 'Paciente',
            key: 'usuario',
            dataIndex: 'usuario',
            render: (_, record) => {
                // if (record.cita) return <>{record.cita.usuario}</>
                if (record.cita) return <>{record.cita.usuario.name}</> //when populate is ready
                else if (record.usuario) return <>{record.usuario.name}</>
                else return <Text type="secondary"> Sin Paciente</Text>
            }
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
            //     let color = estado === 'pagado' ? 'geekblue' : 'green';
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
                <Button size='small' onClick={() => handleEditIngreso(record)}>Editar Estado</Button>
                <Button size='small' onClick={() => { setIngresoForPrint(record); showTicketModal() }}>Imprimir Nota</Button>
            </div>
        },
    ];

    const getBalancesData = (medicos) => {
        const body = {
            fecha_inicio: subtractMonths(new Date(), 2),
            medico: medicos
        }
        // console.log('Balances body',body)
        sendDataBody('balances', body).then((rs) => {
            console.log('alances', rs)
            rs.forEach((i) => { i.doctor = i.medico; i.medico = i.medico._id; if (i.paciente) { i.usuario = i.paciente; i.paciente = i.paciente._id; } })
            setIngresosData(rs)
        }).finally(() => setLoading(false))
    }

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

            <div className='fila'>
                <h4>Ingresos de todos los medicos</h4>
                <Button size='small' onClick={showModal} type='primary' >Agregar Nuevo Ingreso</Button>
                {/* <Button ghost onClick={showEgresoModal} type='primary' style={{ marginBottom: 22, marginLeft: 6 }} >Agregar Nuevo Gasto</Button> */}
            </div>

            <div>
                Hospital <Switch onChange={onSwitchChange} /> Medico
                {
                    viewTipeMedics && <Select options={medicosData} onChange={handleDoctorChange} style={{ width: 240, marginLeft: 16 }} placeholder='Seleccione medico' />
                }
            </div>

            <br />

            <Table columns={columns} dataSource={ingresosData}
            // scroll={{ x: 950, y: "calc(100vh - 220px)" }}
            />

            <div style={{ height: 200 }}></div>

            {/* Ingreso */}
            <CreateBalance tipo='ingreso' balanceForEdit={ingresoForEdit} setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} getIngresos={getIngresos} medico={medico} medicosData={medicosData} />

            {/* Gasto */}
            {/* <CreateBalance tipo='egreso' setBalanceForEdit={setIngresoForEdit} setIsModalOpen={setIsEgresoModalOpen} isModalOpen={isEgresoModalOpen} getIngresos={getIngresos} medicosData={medicosData} /> */}

            {/* Ticket */}
            <Modal title="Imprimir Nota de Venta" open={isTicketModalOpen} onOk={handleTicketOk} onCancel={handleTicketCancel} width={600}>

                {
                    isLogoSelected ? // Si ya hay logo seleccionado, se pasa a la receta y se muestra en pdf
                        <Ticket ingreso={ingresoForPrint} logo={'https://api.recreamed.com/images/' + logoHospital} hospital={nombreHospital} seller='Médico: ' buyer='Paciente: ' />
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
