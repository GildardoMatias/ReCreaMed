import { useEffect, useState } from 'react'
import { Button, Table, Space, Select, Popconfirm, Switch } from 'antd'
import { getData, sendDataBody, usuario, ids_hospitales } from '../../resources'
import Loading from '../../loading'
import Detalles from './details.corte'
import CreateCorte from './create.corte'

export default function Cortes() {
    const [medico, setMedico] = useState(null)
    const [balance, setBalance] = useState({})
    const [cortesData, setCortesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [medicosData, setMedicosData] = useState([]) // For populate medics select

    // Toggles between for medic/for hospital
    const [viewTipeMedics, setViewTipeMedics] = useState(true)

    // Data before all
    const [idsMedicos, setIdsMedicos] = useState([])

    // For details modal
    const [corteForDetails, setCorteForDetails] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = (corte) => {
        corte.medico = idsMedicos; // in controller, medics is used for flter balances not cortes   
        setCorteForDetails(corte); setIsModalOpen(true)
    };

    // For Create Corte Modal
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    const handleCreateOk = () => {
        setIsCreateModalOpen(false);
    };
    const handleCreateCancel = () => {
        setIsCreateModalOpen(false);
    };

    useEffect(() => {
        getDoctorsData()
        getCortesData(usuario._id)
    }, [])

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador. Is used for filter balances by corte
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            const md = rs.map(doc => {
                return doc._id
            });
            rs.forEach(m => { m.value = m._id; m.label = m.name })
            setMedicosData(rs)
            setIdsMedicos(md)
        }).finally(() => setLoading(false))
    }

    const getCortesData = (id_medico) => {
        getData(`cortes/${id_medico}`).then((rs) => {
            console.log('cortesData', rs)
            setCortesData(rs.reverse())
        }).finally(() => { setLoading(false) })
    }

    const createCorte = () => {
        const newCorte = {
            // medico: medico,
            medico: usuario._id,
            fecha_inicio: cortesData.length === 0 ? new Date() : cortesData.at(0).fecha_cierre,
            fecha_cierre: new Date(),
            comentario: ''
        }
        console.log('ready to send ', newCorte)
        sendDataBody('cortes/add', newCorte).then((rs) => {
            console.log(rs);
            getCortesData(medico)
        })
    }

    const handleDoctorChange = (value) => { setMedico(value); getCortesData(value); };

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

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setViewTipeMedics(checked);
    };


    return <div className='mainContainer'>

        <h4>Cortes de cada Medico</h4>
        <br />
        {/* <p className='datos'>Selecciona un medico a continuacion para ver sus cortes</p> */}

        {/* <Select options={medicosData} onChange={handleDoctorChange} style={{ width: 240 }} placeholder='Seleccione medico' /> */}

        {/* <Popconfirm
            placement='bottomRight'
            title="Crear Corte"
            description="Seguro que quere generar un corte de caja a la fecha y hora actuales?"
            onConfirm={createCorte}
            onCancel={() => console.log('Cancelled corte')}
            okText="Si"
            cancelText="No"
        >

            <Button type='primary' style={{ marginLeft: 12 }}>{cortesData.length === 0 ? 'Generar Primer Corte' : 'Generar Corte'}</Button>
        </Popconfirm> */}

        <Button onClick={showCreateModal} type='primary' style={{ marginLeft: 12 }}>Generar corte</Button>

        <br />
        <br />

        <Table columns={columns} dataSource={cortesData} />

        <div style={{ height: 200 }}></div>
        {/* {
            !medico ? <div>Seleccione un medico para ver sus cortes</div>
                :
                <div>
                    <div className='fila'>
                        <h4>Cortes</h4>
                        <Button onClick={createCorte} type='primary' style={{ marginLeft: 12 }}>{cortesData.length === 0 ? 'Generar Primer Corte' : 'Generar Corte'}</Button>
                    </div>
                    <br />
                    <Table columns={columns} dataSource={cortesData} />
                </div>
        } */}

        <Detalles corte={corteForDetails} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        <CreateCorte isModalOpen={isCreateModalOpen} handleOk={handleCreateOk} handleCancel={handleCreateCancel} />

    </div>
}