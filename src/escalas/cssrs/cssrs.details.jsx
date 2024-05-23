import React from 'react'
import { Modal, Card } from 'antd';
import { cssrs_catalog } from './cssrs.catalog';


export default function CssrsDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {

    const bkg = ['rgba(255, 255, 0, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(255, 0, 0, 0.5)']

    const EscalaDe3 = () => {
        return <Card>
            <Card.Grid hoverable={false} style={{ width: '70%' }}>{cssrs_catalog[0]}</Card.Grid>
            <Card.Grid hoverable={false} style={{ width: '30%', backgroundColor: bkg[0] }}>{escalaDetails[0] ? "Si" : "No"}</Card.Grid>

            <Card.Grid hoverable={false} style={{ width: '70%' }}>{cssrs_catalog[1]}</Card.Grid>
            <Card.Grid hoverable={false} style={{ width: '30%', backgroundColor: bkg[1] }}>{escalaDetails[1] ? "Si" : "No"}</Card.Grid>

            <Card.Grid hoverable={false} style={{ width: '70%' }}>{cssrs_catalog[5]}</Card.Grid>
            <Card.Grid hoverable={false} style={{ width: '30%', backgroundColor: bkg[5] }}>{escalaDetails[2] ? "Si" : "No"}</Card.Grid>
        </Card>
    }

    return (
        <Modal title="Respuestas escala GAD-7" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            {
                escalaDetails.length === 3 ? <EscalaDe3 /> :
                    cssrs_catalog.map((pr, i) => {
                        return <Card size='small'>
                            <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
                            <Card.Grid hoverable={false} style={{ width: '30%', backgroundColor: bkg[i] }}>{escalaDetails[i] ? "Si" : "No"}</Card.Grid>
                        </Card>
                    })
            }

        </Modal>
    )
}