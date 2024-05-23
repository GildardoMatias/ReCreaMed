import React, { useEffect, useState } from 'react'
import { getData, usuario } from '../../resources'
import getAllEscalas from '../getEscalas'
import { Button, Modal, Table } from 'antd'
import EscalasCreateGeneralLink from '../escalasCreateGeneralLink'
import DocsDetails from './docs.details'

export default function DocsResults() {

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
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('docs', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])

    const getEncuestasData = (medico) => {

        getData(`encuestas/byDoctorAndTipo/${medico}/docs`).then((rs) => {
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
            render: (_, {  docs }) => (<>
                <Button onClick={() => { setEscalaForDetails(docs); showDetailsModal() }}>Ver detalles</Button>
            </>),
        },
    ]

    return (
        <div>
            <h4 className='spacedTitle'>Resultados de encuestas DOCS</h4>
            <Button type="primary" onClick={showModal}>
                Crear Link Encuesta DOCS
            </Button>

            <br /><br />

            <h4>Detalles de encuestas</h4>
            <Table columns={detailsColumns} dataSource={encuestasData} bordered />

            <Modal title="Crear Encuesta DOCS" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='docs' />
            </Modal>

            <DocsDetails escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />
        </div>
    )
}
