import React, { useState, useEffect } from 'react'
import { Table, Button, Tag } from 'antd'
import CreateBalanceHosptal from './create-ingreso-hosptal';
import { getData } from '../../resources';
// import Loading from '../../loading';

export default function IngersosHosptal({ ids_hospitales }) {

    const [ingresosData, setIngresosData] = useState([])
    // const [loading, setLoading] = useState(true)
    const [isIngresoModalOpen, setIsIngresoModalOpen] = useState(false); // Modal For Add/Edit Inreso
    const [isGastooModalOpen, setIsGastoModalOpen] = useState(false); // Modal For Add/Edit Gasto
  
    useEffect(() => {
        getIngresos()
    }, [])

    const getIngresos = () => {
        getData(`balances/hospital/${ids_hospitales[0]}`).then((rs) => {
            setIngresosData(rs)
        })
    }

    const columns = [
        {
            title: 'Concepto',
            dataIndex: 'concepto',
            key: 'concepto',
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

        // {
        //     title: 'Factura',
        //     key: 'Factura',
        //     dataIndex: 'factura',
        //     render: (_, { factura }) => { return factura && <CheckCircleTwoTone /> }

        // },
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
        // {
        //     title: 'Acciones',
        //     key: 'Editar',
        //     render: (_, record) => <div style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        //         {/* <Button onClick={() => { deleteData(`balances/remove/${record._id}`).then(()=>getIngresos()) }}>Eliminar</Button> */}
        //         <Button size='small' onClick={() => handleEditIngreso(record)}>Editar Monto</Button>
        //         <Button size='small' onClick={() => { setIngresoForPrint([record]); showTicketModal() }}>Imprimir Nota</Button>
        //     </div>
        // },
    ];

    // if (loading) return <Loading />

    return <div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <h4>Ingresos del hospital</h4>
            {/* {JSON.stringify(ids_hospitales)} For view another hospitals , create a select with ids_hospitales as options and a state for hospital selected and pass ir as a param into createBalance*/}
            <Button ghost size='small' onClick={() => setIsIngresoModalOpen(true)} type='primary'  >Agregar Nuevo Ingreso del Hospital</Button>
            <Button ghost size='small' onClick={() => setIsGastoModalOpen(true)} type='primary'  >Agregar Nuevo Gasto del Hospital</Button>
        </div>

        <Table dataSource={ingresosData} columns={columns} size='small' />

        {/* Ingreso of Hospital*/}
        <CreateBalanceHosptal tipo='ingreso' setIsModalOpen={setIsIngresoModalOpen} isModalOpen={isIngresoModalOpen} getIngresos={getIngresos} id_hospital={ids_hospitales[0]} />
        {/* Gasto of Hospital*/}
        <CreateBalanceHosptal tipo='egreso' setIsModalOpen={setIsGastoModalOpen} isModalOpen={isGastooModalOpen} getIngresos={getIngresos} id_hospital={ids_hospitales[0]} />

    </div>
}
