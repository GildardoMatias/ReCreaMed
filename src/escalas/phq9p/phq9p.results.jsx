import React, { useState, useEffect } from 'react'
import { getData, usuario } from '../../resources'
import getAllEscalas from '../getEscalas'
import { Button, Table, Modal } from 'antd'
import EscalasCreateGeneralLink from '../escalasCreateGeneralLink'
import Phq9pDetails from './phq9p.details'


export default function Phq9pResults() {

    const [encuestasData, setEncuestasData] = useState([])
    const [loading, setLoading] = useState(true)

    // For Creating Modal
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
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('phq9p', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])

    const getEncuestasData = (medico) => {
        getData(`encuestas/byDoctorAndTipo/${medico}/phq9p`).then((rs) => {
            console.log(rs);
            setEncuestasData(rs)
        })
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
            render: (_, { phq9p }) => (<>
                <Button onClick={() => { setEscalaForDetails(phq9p); showDetailsModal() }}>Ver detalles</Button>
            </>),
        },
    ]

    return (
        <div>
            <h4 className='spacedTitle'>Resultados de encuestas PHQ9P</h4>
            <Button type="primary" onClick={showModal}>
                Crear Link Encuesta PHQ9P
            </Button>

            <br /><br />

            <h4>Detalles de encuestas</h4>
            <Table columns={detailsColumns} dataSource={encuestasData} bordered />

            <Modal title="Crear Encuesta de PHQ9P" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='phq9p' />
            </Modal>

            <Phq9pDetails escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />

        </div>
    )
}
