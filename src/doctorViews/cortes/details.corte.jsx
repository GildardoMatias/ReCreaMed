import { useEffect, useState } from "react";
import { Button, Modal, Typography, Table } from 'antd'
import * as FileSaver from 'file-saver';
import XLSX from "sheetjs-style";
import { sendDataBody, getData, usuario, myHospitals } from '../../resources'
import CorteDocument from "./corteForPrint";
const { Text } = Typography;

export default function Detalles(props) {
    const [pacientesData, setPacientesData] = useState([])
    const [isPrinting, setIsPrinting] = useState(false)

    const [ingresos, setIngresos] = useState({})
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
            let totalEfectivo = 0;
            let totalTarjeta = 0;
            let totalTransferencia = 0;
            
            rs.forEach(c => {


                if (c.abono === c.monto || c.estado === 'pagado') {

                    switch (c.forma_de_pago) {
                        case 'efectivo':
                            totalEfectivo += c.monto;
                            break;
                        case 'transferencia':
                            totalTransferencia += c.monto;
                            break;
                        case 'tarjeta':
                            totalTarjeta += c.monto;
                            break;
                        default:
                            break;
                    }


                    totalIngresos += c.monto;
                    totalPagados++
                } else {
                    totalPendiente += c.monto;
                    totalPendientes++;
                    // listOfDeudors.push(c)
                }
            });
            const totales = {
                ingresosTotales: totalIngresos,
                deudasTotales: totalPendiente,
                cobrosTotales: totalCobros,
                pagados: totalPagados,
                pendientes: totalPendientes,
                totalEfectivo,
                totalTarjeta,
                totalTransferencia,
                // listOfDeudors
            }
            setIngresos(rs)
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

        // Aplicar estilo a una celda específica (ejemplo: primera fila)
        ws['A1'].s= {
            font: { bold: true, color: { rgb: '000000' } },
            fill: { fgColor: { rgb: 'FFFF00' } }
        };
        ws['A2'].s= {
            font: { bold: true, color: { rgb: '000000' } },
            fill: { fgColor: { rgb: 'FFFF00' } }
        };

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

        {
            // JSON.stringify(ingresos)
        }
        {
            // JSON.stringify(totales)
        }

        {isPrinting
            ?
            <CorteDocument corte={props.corte} ingresos={ingresos} totales={totales} logo={`https://api.recreamed.com/images/${myHospitals[0].logo}`} hospital={myHospitals[0].nombre} /> :
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
