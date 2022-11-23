import React, { useEffect } from 'react'
import { useState } from 'react'
import { usuario, getData, sendDataBody } from '../../resources'
import { Form, Select, Space, Tag, Table } from 'antd';
const { Option } = Select;

export default function DolorResults() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    const [countersData, setCountersData] = useState([])
    const [loadingCounters, setLoadingCounters] = useState(true)

    useEffect(() => {
        usuario.rol === 'Administrador' ? getDoctorsData() : getEncuestasData(usuario._id)
    }, [])
    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        const body = { ids: usuario.medicos_asignados }
        sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
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
                const aprs = allEncuestas.filter(enc => enc.usuario._id === pac._id)
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
            title: 'Total encuestas',
            key: 'total',
            dataIndex: 'total'
        }
    ];

    const columns = [

        {
            title: 'Usuario',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (_, { usuario }) => <p>{usuario.name}</p>
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
            title: 'Pretgunta 13',
            dataIndex: 'respuestas_dolor',
            key: 'usuario',
            render: (_, { respuestas_dolor }) => <p>{respuestas_dolor[13]}</p>
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

    return (
        <div>
            <h4>Resultados de encuestas de dolor</h4>
            {
                usuario.rol === 'Administrador' && <Form.Item label="Medico" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                    style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Select
                        style={{ width: 260, }}
                        onChange={getEncuestasData}
                        placeholder='Selecciona un medico'
                    >
                        {
                            medicosData.map((p) => {
                                return <Option key={p._id} value={p._id}>{p.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            }
            <br />
            <Table dataSource={countersData} columns={counterColumns} bordered />
            <br />
            <h4>Detalles de encuestas</h4>
            <br />
            <Table columns={columns} dataSource={encuestasData} scroll={{ x: '200vw' }} bordered />

        </div>
    )
}
