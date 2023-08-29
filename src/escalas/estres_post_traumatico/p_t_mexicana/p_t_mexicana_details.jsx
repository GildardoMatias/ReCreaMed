import React from 'react'
import { Button, Modal, Card } from 'antd';
import { catalog_ept_mexicana } from './p_t_mexicana_catalog';

export default function PTMXDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    return (
        <Modal title="Respuestas de la escala" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            {
                Object.keys(escalaDetails).map((key) => {
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{catalog_ept_mexicana[Number(key) - 1]}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails[key]}</Card.Grid>
                    </Card>
                })
            }


        </Modal>
    )
}
