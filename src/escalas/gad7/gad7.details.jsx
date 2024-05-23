import React from 'react'
import { Button, Modal, Card } from 'antd';
import { gad7_catalog } from './gad7.catalog';


export default function Gad7Details({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    var score = 0;
    return (
        <Modal title="Respuestas escala GAD-7" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
         
            {
                gad7_catalog.map((pr, i) => {
                    score += escalaDetails[i];
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
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