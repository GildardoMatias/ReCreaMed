import React from 'react'
import { Modal, Card } from 'antd';
import { thi_catalog } from './thi.catalog';


export default function ThiDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {

    const resps = ["Si", "A veces", "No"]

    return (
        <Modal title="Respuestas escala THI" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            {
                thi_catalog.map((pr, i) => {
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && resps[escalaDetails[i]]}</Card.Grid>
                    </Card>
                })
            }

        </Modal>
    )
}