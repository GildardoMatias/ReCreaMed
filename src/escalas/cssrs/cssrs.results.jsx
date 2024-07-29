import React, { useState, useEffect } from 'react'
import { getData, usuario } from '../../resources'
import getAllEscalas from '../getEscalas'
import { Button, Table, Modal } from 'antd'
// import Gad7Details from './gad7.details'
import EscalasCreateGeneralLink from '../escalasCreateGeneralLink'
import CssrsDetails from './cssrs.details'
import Loading from '../../loading'


export default function CssrsResults() {

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
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('cssrs', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
    }, [])

    const getEncuestasData = (medico) => {
        getData(`encuestas/byDoctorAndTipo/${medico}/cssrs`).then((rs) => {
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
            render: (_, { cssrs }) => (<>
                <Button onClick={() => { setEscalaForDetails(cssrs); showDetailsModal() }}>Ver detalles</Button>
            </>),
        },
    ]


    if(loading) return <Loading/>

    return (
        <div>
            <h4 className='spacedTitle'>Resultados de encuestas C-SSRS</h4>
            <Button type="primary" onClick={showModal}>
                Crear Link Encuesta C-SSRS
            </Button>

            <br /><br />

            <h4>Detalles de encuestas</h4>
            <Table columns={detailsColumns} dataSource={encuestasData} bordered />

            <Modal title="Crear Encuesta C-SSRS" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cerrar</Button>
                ]}>
                <EscalasCreateGeneralLink tipo='cssrs' />
            </Modal>

            <CssrsDetails escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />

        </div>
    )
}
