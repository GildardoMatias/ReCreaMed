import React, { useEffect } from 'react'
import { useState } from 'react'
import { usuario, getData, sendDataBody, ids_hospitales } from '../../resources'
import { Form, Select, Space, Button, Table, Modal } from 'antd';
import EscalasCreateGeneralLink from '../escalasCreateGeneralLink';
import getAllEscalas from '../getEscalas';
import DolorDetails from './dolorDetails';
const { Option } = Select;

export default function DolorResults() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    const [countersData, setCountersData] = useState([])
    const [loadingCounters, setLoadingCounters] = useState(true)
    const [loading, setLoading] = useState(true)
    // For Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };

    // Modal for details
    const [escalaForDetails, setEscalaForDetails] = useState("")
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const showDetailsModal = () => { setIsDetailsModalOpen(true) };
    const handleDetailsOk = () => { setIsDetailsModalOpen(false) };
    const handleDetailsCancel = () => { setIsDetailsModalOpen(false) };

    useEffect(() => {
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('dolor', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            setMedicosData(rs)
        })
    }

    const getEncuestasData = (medico) => {
        getData(`encuestas/dolor/medico/${medico}`).then((rs) => {
            getCounters(rs, medico);
            console.log(rs);
            setEncuestasData(rs)
        })
    }

    const getCounters = (data, medico) => {
        const allEncuestas = [...data];
        const results = []
        getData(`mispacientes/${medico}`).then(rs => {
            rs.forEach(pac => {
                const aprs = allEncuestas.filter(enc => enc.usuario?._id === pac._id)
                const latest = aprs.at(-1)
                results.push({
                    'paciente': pac.name,
                    'total': aprs.length,
                    'semana': latest?.createdAt.substring(0, 10)
                })
            });
            console.log(results)
        }).finally(() => { setCountersData(results); setLoadingCounters(false) });
    }

    const counterColumns = [
        {
            title: 'Paciente',
            key: 'paciente',
            dataIndex: 'paciente',
        },
        {
            title: 'Fecha ultima encuesta',
            key: 'semana',
            dataIndex: 'semana',
        },
        {
            title: 'Total Escalas Respondidas',
            key: 'total',
            dataIndex: 'total'
        }
    ];

    const columns = [

        {
            title: 'Usuario',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (_, { usuario }) => <p>{usuario ? usuario.name : "Usuario eliminado"}</p>
        },
        {
            title: 'Pretgunta 1',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[1]}</p>
        },
        {
            title: 'Pretgunta 2',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[2]}</p>
        },
        {
            title: 'Pretgunta 3',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[3]}</p>
        },
        {
            title: 'Pretgunta 4',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[4]}</p>
        },
        {
            title: 'Pretgunta 5',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[5]}</p>
        },
        {
            title: 'Pretgunta 6',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[6]}</p>
        },
        {
            title: 'Pretgunta 7',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[7]}</p>
        },
        {
            title: 'Pretgunta 8',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[8]}</p>
        },
        {
            title: 'Pretgunta 9',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[9]}</p>
        },
        {
            title: 'Pretgunta 10',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[10]}</p>
        },
        {
            title: 'Pretgunta 11',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[11]}</p>
        },
        {
            title: 'Pretgunta 12',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[12]}</p>
        },
        {
            title: 'Pretgunta 13 A-G',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor['A13']}</p>
        },
        {
            title: 'Pretgunta 14',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[14]}</p>
        },
        {
            title: 'Pretgunta 15',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[15]}</p>
        },
        {
            title: 'Pretgunta 16',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[16]}</p>
        },
        {
            title: 'Pretgunta 17',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[17]}</p>
        },
        {
            title: 'Pretgunta 18',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[18]}</p>
        },
        {
            title: 'Pretgunta 19',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[19]}</p>
        },
        {
            title: 'Pretgunta 20',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[20]}</p>
        },
        {
            title: 'Pretgunta 21',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[21]}</p>
        },
        {
            title: 'Pretgunta 22',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[22]}</p>
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const detailsColumns = [
        {
            title: 'Usuario',
            key: 'usuario',
            dataIndex: 'usuario',
            render: (_, { usuario }) => (<>{usuario ? usuario.name : "usuario no existente"}</>),
            sorter: true
        },
        {
            title: 'Acciones',
            key: 'actions',
            dataIndex: 'actions',
            render: (_, { respuestas_dolor }) => (<>
                <Button onClick={() => { setEscalaForDetails(respuestas_dolor); showDetailsModal() }}>Ver detalles</Button>
            </>),
        },
    ]

    return (
        <div>
            <h4 className='spacedTitle'>Resultados de encuestas de dolor</h4>
            <Button type="primary" onClick={showModal}>
                Crear Link Encuesta de Dolor
            </Button>

            <br />
            {/* <Table dataSource={countersData} columns={counterColumns} bordered /> */}
            <br />
            <h4>Detalles de encuestas</h4>
            <br />
            {/* <Table columns={columns} dataSource={encuestasData} scroll={{ x: '200vw' }} bordered /> */}
            <Table columns={detailsColumns} dataSource={encuestasData} bordered />

            <Modal title="Crear Encuesta de dolor" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='dolor' />
            </Modal>

            <DolorDetails escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />

        </div>
    )
}
