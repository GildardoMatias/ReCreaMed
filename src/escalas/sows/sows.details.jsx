import React from 'react'
import { Modal, Card } from 'antd';
import { sows_catalog } from './sows.catalog';

export default function SowsDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {

    const rss = [
        "Ausente",
        "Leve",
        "Moderado",
        "Severo"
    ]

    return (
        <Modal title="Respuestas escala SOWS" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            {
                sows_catalog.map((pr, i) => {
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && rss[escalaDetails[i]]}</Card.Grid>
                    </Card>
                })
            }

        </Modal>
    )
}