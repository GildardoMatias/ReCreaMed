import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody } from '../../../resources';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';
const { Option } = Select;

export default function DepresionResults() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    const [countersData, setCountersData] = useState([])
    const [loadingCounters, setLoadingCounters] = useState(true)

    // For Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };

    useEffect(() => {
        usuario.rol === 'Administrador' ? getDoctorsData() : getEncuestasData(usuario._id)
    }, [])
    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        const body = { ids: usuario.medicos_asignados }
        sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
    }
    const getEncuestasData = (medico) => {
        getData(`encuestas/depresion/medico/${medico}`).then((rs) => {
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
            <h5>Resultados de encuestas de sintomatologia depresiva QUIDS (QUICK INVENTORY OF DEPRESSIVE SYMPTOMATOLOGY)</h5>
            <br />
            <Button type="primary" onClick={showModal}>
                Crear Link Depresion 1
            </Button>
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
            <Table dataSource={countersData} columns={counterColumns} bordered />
            <br />
            <h4>Detalles de encuestas</h4>
            <br />
            <Table dataSource={encuestasData} columns={columns} bordered />

            <Modal title="Crear encuesta de Depresion QUIDS" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <EscalasCreateGeneralLink tipo='depresion_qids' />
            </Modal>
        </div>
    )
}
