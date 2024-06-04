import React from 'react'
import { Modal, Card } from 'antd';
import { emca_catalog } from './emca.catalog';

export default function EmcaDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {

    const rss = [
        "",
        "Muy en desacuerdo",
        "Bastante en desacuerdo",
        "Ni de acuerdo ni en desacuerdo",
        "Bastante de acuerdo",
        "Muy de acuerdo",
    ]

    return (
        <Modal title="Respuestas escala EMCA" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            {
                emca_catalog.map((pr, i) => {
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && rss[escalaDetails[i]]}</Card.Grid>
                    </Card>
                })
            }

        </Modal>
    )
}