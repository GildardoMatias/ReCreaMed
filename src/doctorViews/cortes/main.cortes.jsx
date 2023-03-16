import { useEffect, useState } from 'react'
import { Button, Table, Space } from 'antd'
import { getData, sendDataBody, usuario } from '../../resources'
import Loading from '../../loading'
import Detalles from './details.corte'

export default function Cortes() {

    const [balance, setBalance] = useState({})
    const [cortesData, setCortesData] = useState([])
    const [loading, setLoading] = useState(true)
    // For details modal
    const [corteForDetails, setCorteForDetails] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = (corte) => { setCorteForDetails(corte); setIsModalOpen(true) };


    useEffect(() => {
        return getCortesData()
    }, [])

    const getCortesData = () => {
        getData(`cortes/${usuario._id}`).then((rs) => {
            setCortesData(rs.reverse())
        }).finally(() => setLoading(false))
    }

    const createCorte = () => {
        const newCorte = {
            medico: usuario._id,
            fecha_inicio: cortesData.length === 0 ? new Date() : cortesData.at(0).fecha_cierre,
            fecha_cierre: new Date(),
            comentario: ''
        }
        console.log('ready to send ', newCorte)
        sendDataBody('cortes/add', newCorte).then((rs) => {
            console.log(rs);
            getCortesData()
        })
    }


    const columns = [
        {
            title: 'fecha y hora de Inicio',
            dataIndex: 'fecha_inicio',
            key: 'fecha_inicio',
            render: (_, { fecha_inicio }) => <> {new Date(fecha_inicio).toLocaleString()}</>
        },
        {
            title: 'Fecha y hora de Cierre',
            dataIndex: 'fecha_cierre',
            key: 'fecha_cierre',
            render: (_, { fecha_cierre }) => <> {new Date(fecha_cierre).toLocaleString()}</>
        },
        {
            title: 'Comentario',
            dataIndex: 'comentario',
            key: 'comentario',
        },
        {
            title: 'Acciones',
            key: 'Acciones',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { showModal(record) }}>Ver Detalles</Button>
                    {/* <Button onClick={() => console.log(record)}>Editar</Button> */}
                    {/* <Button onClick={() => deleteData(`cortes/remove/${record._id}`)}>Eliminar</Button> */}
                </Space>)
        }
    ];

    if (loading) return <Loading />

    return <div className='mainContainer'>
        <div className='fila'><h4>Cortes</h4><Button onClick={createCorte} type='primary' style={{ marginLeft: 12 }}>{cortesData.length === 0 ? 'Generar Primer Corte' : 'Generar Corte'}</Button></div>
        <br />
        <Table columns={columns} dataSource={cortesData} />

        <Detalles corte={corteForDetails} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
}