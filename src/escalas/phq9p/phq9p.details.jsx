import React from 'react'
import { Modal, Card } from 'antd';
import { phq9_catalog } from './phq9p.catalog';


export default function Phq9pDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    var score = 0;
    return (
        <Modal title="Respuestas escala PHQ9P" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            {
                phq9_catalog.map((key, i) => {
                    score += escalaDetails[i];
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{phq9_catalog[i]}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && escalaDetails[i]}</Card.Grid>
                    </Card>
                })
            }

            <Card>
                <p>Total score: <strong>{score}</strong></p>
            </Card>

        </Modal>
    )
}