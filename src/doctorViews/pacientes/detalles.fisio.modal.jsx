import React, { useState } from 'react'
import { Button, Modal } from 'antd'

export default function DetallesFisioModal({ userData }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpen = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <Button size='small' type='link' onClick={handleOpen}>Ver detalles</Button>

            <Modal title='Datos del paciente' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Datos: </p>
                <p>{JSON.stringify(userData)}</p>
            </Modal>
        </div>
    )
}
