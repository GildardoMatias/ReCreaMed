import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody } from '../../resources';
const { Option } = Select;

export default function DepresionResults() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    useEffect(() => {
        usuario.rol === 'Administrador' ? getDoctorsData() : getEncuestasData(usuario._id)
    }, [])
    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        const body = { ids: usuario.medicos_asignados }
        sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
    }
    const getEncuestasData = (medico) => {
        getData(`encuestas/depresion/medico/${medico}`).then((rs) => {
            console.log(rs);
            setEncuestasData(rs)
        })
    }


    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'usuario',
            key: 'name',
            render: (_, { usuario }) => <>{usuario.name}</>
        },
        {
            title: 'Puntaje',
            dataIndex: 'score',
            key: 'age',
        }
    ];

    return (
        <div className='mainContainer'>
            <h4>Resultados de encuestas de sintomatologia depresiva</h4>
            <br />
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
            <Table dataSource={encuestasData} columns={columns} />
        </div>
    )
}
