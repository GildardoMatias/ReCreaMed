import { useEffect, useState } from "react";
import { Button, Modal, Typography, Table } from 'antd'
import { sendDataBody, getData, usuario, deleteData } from '../../resources'
const { Text } = Typography;

export default function Detalles(props) {
    console.log('Corte for details ', props.corte)
    const [pacientesData, setPacientesData] = useState([])

    const [totales, setTotales] = useState({})
    const handleOk = () => { props.setIsModalOpen(false) };

    useEffect(() => { return getPacientesData() }, [])

    // Here creates the main data
    useEffect(() => {
        sendDataBody(`balances/ingresos/corte`, props.corte).then(rs => {
            console.log(rs)
            let totalIngresos = 0;
            let totalPendiente = 0;
            let totalCobros = rs.length;
            let totalPagados = 0;
            let totalPendientes = 0;
            let _listOfDeudors = [];
            let _listOfPagados = [];
            rs.forEach(c => {
                if ((c && c.estado === 'pagado') || c.monto === c.abono) {
                    totalIngresos += c.monto;
                    totalPagados++
                    _listOfPagados.push(c)
                } else {
                    totalPendiente += c.monto;
                    totalPendientes++;
                    _listOfDeudors.push(c)
                }
            });
            const totales = {
                ingresosTotales: totalIngresos,
                deudasTotales: totalPendiente,
                cobrosTotales: totalCobros,
                pagados: totalPagados,
                pendientes: totalPendientes,
                listOfDeudors: _listOfDeudors,
                listOfPagados: _listOfPagados
            }
            setTotales(totales)
        })


    }, [props.corte])



    // Give me the patients to match names
    const getPacientesData = () => { getData(`mispacientes/${usuario._id}`).then((rs) => { setPacientesData(rs); }) }
    const MatchPatient = ({ paciente }) => {
        const patient = pacientesData.find((p) => paciente === p._id)
        return <div>{patient ? patient.name : <Text disabled>Paciente eliminado o no existente</Text>} <p style={{ fontSize: 10 }}>Tomado de la cita</p></div>
    }
    const columns = [
        {
            title: 'Paciente',
            key: 'cita.paciente',
            dataIndex: 'cita',
            // render: (_, record) => {
            //     if (record.cita) return <MatchPatient paciente={record.cita.usuario} />
            //     else if (record.paciente) return <>{record.paciente.name}</>
            //     else return <Text type="secondary"> Sin Paciente</Text>
            // },
            render: (_, record) => {
                if (record.cita) return <>{record.cita.usuario.name}</>
                else if (record.paciente) return <>{record.paciente.name}</>
                else return <Text type="secondary"> Sin Paciente</Text>
            },
        },
        {
            title: 'Monto',
            dataIndex: 'monto',
            key: 'monto',
            render: (_, { monto }) => <>${monto}</>
        },
        {
            title: 'Fecha y Hora',
            dataIndex: 'fecha_hora',
            key: 'fecha_hora',
            render: (_, { fecha_hora }) => { return <>{new Date(fecha_hora).toLocaleString()}</> }
        },

    ];
    return <Modal title="Detalles del corte" open={props.isModalOpen} onCancel={handleOk} destroyOnClose
        footer={[<Button onClick={handleOk}>Cerrar</Button>]}
    >
        {/* <h5>Ingresos </h5>
        <h5>Pagados: {totales.pagados}</h5> */}

        {/* <p>showing of {JSON.stringify(props.corte)}</p> */}
        {/* <p>pagados {JSON.stringify(totales.listOfPagados)}</p> */}
        {/* <p>tam {totales.listOfPagados.length}</p> */}

        <h5>Total ingresos: <span style={{ color: '#3277a8' }}>${totales.ingresosTotales}</span></h5>
        {
            totales.listOfPagados && totales.listOfPagados.length > 0 && <Table dataSource={totales.listOfPagados} columns={columns} bordered={false} size='small' />
        }

        <h5>Pendientes</h5>
        <h5>Total: <span style={{ color: '#eb3d43' }}>${totales.deudasTotales}</span></h5>

        {
            totales.listOfDeudors && totales.listOfDeudors.length > 0 && <Table dataSource={totales.listOfDeudors} columns={columns} bordered={false} size='small' />
        }
        {/* {
            totales.listOfDeudors && totales.listOfDeudors.length > 0 &&
            <ul>
                {totales.listOfDeudors.map((d) => {
                    return <li>
                        {() => {
                            if (d.cita) { <MatchPatient paciente={d.cita.usuario} /> }
                            else if (d.paciente) <>{d.paciente.name}</>
                        }
                        } - {d.monto} - {new Date(d.fecha_hora).toLocaleString()}
                    </li>
                })}
                <li>Otrito :/</li>
            </ul>
        } */}
    </ Modal>
}
