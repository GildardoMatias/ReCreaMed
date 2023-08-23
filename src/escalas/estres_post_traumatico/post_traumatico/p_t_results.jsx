import React, { useState, useEffect } from 'react'
import { Button, Modal, Select, Form, Table } from 'antd';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';
import getAllEscalas from '../../getEscalas';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../../resources';
const { Option } = Select;

export default function PostTraumaticoResults() {
    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    const [countersData, setCountersData] = useState([])
    const [loadingCounters, setLoadingCounters] = useState(true)
    const [loading, setLoading] = useState(true)
    const [columns, setColumns] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };


    useEffect(() => {
        addColumns();
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion') ? getAllEscalas('post_traumatico', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])
    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            setMedicosData(rs)
        })
    }
    const getEncuestasData = (medico) => {
        getData(`encuestas/byDoctorAndTipo/${medico}/post_traumatico/`).then((rs) => {
            getCounters(rs, medico);
            console.log(rs);
            setEncuestasData(rs)
        })
    }

    const getCounters = (data, medico) => {
        const allEncuestas = [...data];
        const results = []
        getData(`mispacientes/${medico}`).then(rs => {
            console.log('MisPacientes ept1: ', rs);
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
            title: 'Total Escalas Respondidas',
            key: 'total',
            dataIndex: 'total'
        }
    ];



    const addColumns = () => {
        let columns = [
            {
                title: 'Paciente',
                dataIndex: 'usuario',
                key: 'name',
                render: (_, { usuario }) => <>{usuario ? usuario.name : "Usuario eliminado"}</>
            }
        ];
        for (let i = 1; i < 18; i++) {
            columns.push({
                title: 'Pregunta ' + i,
                children: [
                    {
                        title: 'Frecuencia',
                        dataIndex: 'respuestas_depresion2_gpc',
                        key: 'hrsd' + i,
                        render: (_, { respuestas_ept1_davidson }) => (
                            <>
                                {respuestas_ept1_davidson[i][0]}
                            </>
                        ),
                    }, {
                        title: 'Gravedad',
                        dataIndex: 'respuestas_depresion2_gpc',
                        key: 'hrsd' + i,
                        render: (_, { respuestas_ept1_davidson }) => (
                            <>
                                {respuestas_ept1_davidson[i][1]}
                            </>
                        ),
                    }

                ]
            })
        }
        setColumns(columns)
    }

    return (
        <div>
            <h6>Evaluación Del Trastorno Por Estrés Postraumático: Aproximación A Las Propiedades Psicométricas De La Escala De Trauma De Davidson</h6>
            <br />
            <Button type="primary" onClick={showModal}>
                Crear Enlace EPT 1
            </Button>
            <br />
            {/* <Table dataSource={countersData} columns={counterColumns} bordered /> */}
            <br />
            <h4>Detalles de encuestas</h4>
            <br />
            <Table dataSource={encuestasData} columns={columns} scroll={{ x: 1600 }} bordered />


            <Modal title="Crear Encuesta de Estres Post Traumatico" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='post_traumatico' />
            </Modal>
        </div>
    )
}
