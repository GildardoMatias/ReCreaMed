import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Form, Select } from 'antd';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../../resources';
import getAllEscalas from '../../getEscalas';
import PTMXDetails from './p_t_mexicana_details';
const Option = { Select }

export default function PostTraumaticoMexicanaResults() {

    const [encuestasData, setEncuestasData] = useState([])
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)
    const [countersData, setCountersData] = useState([])
    const [loadingCounters, setLoadingCounters] = useState(true)
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(true)

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
        addColumns();
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('post_traumatico_mx', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])
    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            setMedicosData(rs)
        })
    }
    const getEncuestasData = (medico) => {
        getData(`encuestas/byDoctorAndTipo/${medico}/post_traumatico_mx/`).then((rs) => {
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
            title: 'Total encuestas',
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
        for (let i = 1; i < 15; i++) {
            columns.push({
                title: 'Pregunta ' + i,
                key: 'eptmx' + i,
                dataIndex: 'respuestas_ept_3mx',
                render: (_, { respuestas_ept_3mx }) => <>{respuestas_ept_3mx[i]}</>
            })
        }
        setColumns(columns)
    }

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
            render: (_, { respuestas_ept_3mx }) => (<>
                <Button onClick={() => { setEscalaForDetails(respuestas_ept_3mx); showDetailsModal() }}>Ver detalles</Button>
            </>),
        },
    ]

    return (
        <div>
            <h6>Resultados de la Validación mexicana de la Escala de Estrés Traumático Secundario</h6>

            <br />
            <Button type="primary" onClick={showModal}>
                Crear Enlace EPT MX
            </Button>
            <br />

            {/* <Table dataSource={countersData} columns={counterColumns} bordered /> */}

            <br />
            <h4>Detalles de encuestas</h4>
            <br />
            <Table dataSource={encuestasData} columns={detailsColumns} bordered />
            {/* <Table dataSource={encuestasData} columns={columns} scroll={{ x: 1600 }} bordered /> */}

            <Modal title="Crear Encuesta de Estres Post Traumatico" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='post_traumatico_mx' />
            </Modal>

            <PTMXDetails escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />

        </div>
    )
}
