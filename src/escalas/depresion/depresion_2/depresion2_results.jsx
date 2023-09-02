import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../../resources';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';
import getAllEscalas from '../../getEscalas';
import Loading from '../../../loading';
const { Option } = Select;

// DEPRESION GPC

export default function Depresion2Results() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    const [countersData, setCountersData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingCounters, setLoadingCounters] = useState(true)

    // For Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };

    useEffect(() => {
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('depresion_gpc', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            setMedicosData(rs)
        })
    }

    const getEncuestasData = (medico) => {
        getData(`encuestas/byDoctorAndTipo/${medico}/depresion_gpc/`).then((rs) => {
            getCounters(rs, medico);
            console.log(rs);
            setEncuestasData(rs)
        }).finally(() => { setLoading(false) })
    }

    const getCounters = (data, medico) => {
        const allEncuestas = [...data];
        const results = []
        getData(`mispacientes/${medico}`).then(rs => {
            console.log('MisPacientes depresiod2: ', rs);
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
            dataIndex: 'paciente'
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
            render: (_, { usuario }) => <>{usuario ? usuario.name : "Usuario eliminado"}</>
        },
        {
            title: 'Puntaje HRSD',
            dataIndex: 'respuestas_depresion2_gpc',
            key: 'hrsd',
            render: (_, { respuestas_depresion2_gpc }) => (
                <>
                    {respuestas_depresion2_gpc.hrsd}
                </>
            ),
        },
        {
            title: 'Puntaje MADRS',
            dataIndex: 'respuestas_depresion2_gpc',
            key: 'madrs',
            render: (_, { respuestas_depresion2_gpc }) => (
                <>
                    {respuestas_depresion2_gpc.madrs}
                </>
            ),
        },
        {
            title: 'Puntaje PHQ',
            dataIndex: 'respuestas_depresion2_gpc',
            key: 'phq',
            render: (_, { respuestas_depresion2_gpc }) => (
                <>
                    {respuestas_depresion2_gpc.phq}
                </>
            ),
        }
    ];

    if (loading) return <Loading />

    return (
        <div className='mainContainer'>
            <h5>Resultados de encuestas de versiones validadas en español de las escalas HRSD, MADRS y PHQ-9</h5>
            <br />
            <Button type="primary" onClick={showModal}>
                Crear Link Depresion 2
            </Button>
            <br />

            <br />
            {/* <Table dataSource={countersData} columns={counterColumns} bordered /> */}
            <br />
            <h4>Detalles de encuestas</h4>
            <br />
            <Table dataSource={encuestasData} columns={columns} bordered />

            <Modal title="Crear Encuesta de depresion GPC" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='depresion_gpc' />
            </Modal>
        </div>
    )
}
