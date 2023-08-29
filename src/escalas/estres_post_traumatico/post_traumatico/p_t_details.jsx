import React from 'react'
import { Button, Card, Modal } from 'antd';
import { post_catalog } from './p_t_catalog';

// {"1":[3,2],"2":[3,0],"3":[2,2],"4":[4,4],"5":[1,2],"6":[2,1],"7":[1,3],"8":[0,0],"9":[1,1],"10":[1,4],"11":[3,3],"12":[1,0],"13":[1,4],"14":[4,4],"15":[3,2],"16":[1,1],"17":[0,1],"_id":"63866dc6e2c587930958c817"}

export default function PTDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    return (
        <Modal title="Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            <Card>
                <Card.Grid style={{ width: '50%' }} hoverable={false}>Pregunta</Card.Grid>
                <Card.Grid style={{ width: '25%' }} hoverable={false}>Frecuencia</Card.Grid>
                <Card.Grid style={{ width: '25%' }} hoverable={false}>Gravedad</Card.Grid>
                {
                    Object.keys(escalaDetails).map((key) => {
                        return <>
                            <Card.Grid style={{ width: '50%' }} hoverable={false}>{post_catalog[Number(key) - 1]} {Number(key) - 1}</Card.Grid>
                            <Card.Grid style={{ width: '25%' }} hoverable={false}>{escalaDetails[key][0]}</Card.Grid>
                            <Card.Grid style={{ width: '25%' }} hoverable={false}>{escalaDetails[key][1]}</Card.Grid>


                        </>
                        // return <p>{post_catalog[key]}</p>
                    })
                }
            </Card>
        </Modal>
    )
}
