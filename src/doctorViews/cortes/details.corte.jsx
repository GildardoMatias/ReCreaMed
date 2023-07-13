import { useEffect, useState } from "react";
import { Button, Modal, Typography, Table } from 'antd'
import * as FileSaver from 'file-saver';
import XLSX from "sheetjs-style";
import { sendDataBody, getData, usuario, deleteData } from '../../resources'
import CorteDocument from "./corteForPrint";
const { Text } = Typography;

export default function Detalles(props) {
    const [pacientesData, setPacientesData] = useState([])
    const [isPrinting, setIsPrinting] = useState(false)

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
            let listOfDeudors = [];
            rs.forEach(c => {
                if (c && c.estado === 'pagado') {
                    totalIngresos += c.monto;
                    totalPagados++
                } else {
                    totalPendiente += c.monto;
                    totalPendientes++;
                    listOfDeudors.push(c)
                }
            });
            const totales = {
                ingresosTotales: totalIngresos,
                deudasTotales: totalPendiente,
                cobrosTotales: totalCobros,
                pagados: totalPagados,
                pendientes: totalPendientes,
                listOfDeudors: listOfDeudors
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
            render: (_, record) => {
                if (record.cita) return <MatchPatient paciente={record.cita.usuario} />
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => { return <>{new Date(createdAt).toLocaleString()}</> }
        },

    ];


    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtextension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet([totales]);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: filetype })
        FileSaver.saveAs(data, 'corte' + new Date().toLocaleDateString() + fileExtextension)
    }

    return <Modal width={600} title="Detalles del corte" open={props.isModalOpen} onCancel={handleOk} destroyOnClose
        footer={[
            <Button onClick={() => setIsPrinting(!isPrinting)}>{isPrinting ? "Cancelar Impresion" : "Imprimir PDF"}</Button>,
            <Button onClick={() => exportToExcel()}>Exportar a excel</Button>,
            <Button onClick={handleOk}>Cerrar</Button>
        ]}
    >
        {isPrinting
            ?
            <CorteDocument totales={totales} logo="https://api.recreamed.com/images/bd71d914-1f11-4bea-81e5-81b55e11a4e1.jpg" company='Hospital: ' seller='Médico: ' buyer='Paciente: ' /> :
            <div>

                <h5>Ingresos </h5>
                <h5>Pagados: {totales.pagados}</h5>
                <h5>Total: <span style={{ color: '#3277a8' }}>${totales.ingresosTotales}</span></h5>
                <br />
                <h5>Pendientes</h5>
                <h5>Total: <span style={{ color: '#eb3d43' }}>${totales.deudasTotales}</span></h5>

                {
                    totales.listOfDeudors && totales.listOfDeudors.length > 0 && <Table dataSource={totales.listOfDeudors} columns={columns} bordered={false} size='small' />
                }

            </div>
        }

    </ Modal>
}
