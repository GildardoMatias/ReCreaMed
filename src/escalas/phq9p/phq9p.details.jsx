import React from 'react'
import { Modal, Card } from 'antd';
import { phq9_catalog } from './phq9p.catalog';


export default function Phq9pDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    const responses = [
        "No del todo",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
    ]
    const finalResponses = [
        "Para nada dificil",
        "Un poco difícil",
        "Muy difícil",
        "Extremaadamente difícil",
    ]
    var score = 0;
    return (
        <Modal title="Respuestas escala PHQ9P" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>



            {  // TODO Create dedicated responses
                phq9_catalog.map((key, i) => {
                    score += escalaDetails[i];
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{phq9_catalog[i]}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && responses[escalaDetails[i]]}</Card.Grid>
                    </Card>
                })
            }

            <Card size='small'>
                <Card.Grid hoverable={false} style={{ width: '70%' }}>"Si usted marcó cualquiera de los problemas, ¿qué tan difícil han afectado estos problemas en hacer su trabajo, encargarse de tareas del hogar, o llevarse bien con otras personas?"</Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && finalResponses[escalaDetails[9]]}</Card.Grid>
            </Card>
            <Card>
                <p>Total score: <strong>{score}</strong></p>
            </Card>

        </Modal>
    )
}