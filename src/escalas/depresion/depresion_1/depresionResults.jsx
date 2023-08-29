import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../../resources';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';
import getAllEscalas from '../../getEscalas';
import Loading from '../../../loading';
const { Option } = Select;

// DEPRESION QIDS 

export default function DepresionResults() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [countersData, setCountersData] = useState([])
    const [loading, setLoading] = useState(true)

    // For Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };

    useEffect(() => {
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion') ? getAllEscalas('depresion', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])


    const getEncuestasData = (medico) => {
        getData(`encuestas/depresion/medico/${medico}`).then((rs) => {
            // getCounters(rs, medico);
            console.log(rs);
            setEncuestasData(rs)
        }).finally(() => setLoading(false))
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
        }).finally(() => { setCountersData(results); });
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
            title: 'Paciente',
            dataIndex: 'usuario',
            key: 'name',
            render: (_, { usuario }) => <>{usuario ? usuario.name : "Usuario eliminado"}</>
        },
        {
            title: 'Puntaje',
            dataIndex: 'score',
            key: 'age',
        }
    ];

    if (loading) return <Loading />

    return (
        <div className='mainContainer'>
            <h5>Resultados de encuestas de sintomatologia depresiva QUIDS (QUICK INVENTORY OF DEPRESSIVE SYMPTOMATOLOGY)</h5>
            <br />
            <Button type="primary" onClick={showModal}>
                Generar Escala Depresion 1
            </Button>

            <br /><br />

            {/* Counters <Table dataSource={countersData} columns={counterColumns} bordered /> <br /> */}

            <h4>Detalles de encuestas</h4>
            <br />
            <Table dataSource={encuestasData} columns={columns} bordered />

            <Modal title="Crear encuesta de Depresion QUIDS" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='depresion_qids' />
            </Modal>
        </div>
    )
}
