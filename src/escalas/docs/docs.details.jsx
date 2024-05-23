import React from 'react'
import { Modal, Card, Divider } from "antd";
import { docs_catalog_1, docs_catalog_2, docs_catalog_3, docs_catalog_4 } from './docs.catalog';

export default function DocsDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    const { cat1, cat2, cat3, cat4 } = escalaDetails;

    const CardWidget = ({ pregunta, respuesta }) => {
        return <Card size='small'>
            <Card.Grid hoverable={false} style={{ width: '70%' }}>{pregunta}</Card.Grid>
            <Card.Grid hoverable={false} style={{ width: '30%' }}><strong>{respuesta}</strong></Card.Grid>
        </Card>
    }

    return (
        <Modal title="Respuestas escala DOCS" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={900} destroyOnClose>

            {
                docs_catalog_1.map((p, i) => {
                    return <CardWidget pregunta={p.pregunta} respuesta={cat1 && cat1[i] ? p.respuestas[cat1[i]] : 'Sin respuesta'} />
                })
            }

            <br />
            <Divider>Categoria 2</Divider>
            {
                docs_catalog_2.map((p, i) => {
                    return <CardWidget pregunta={p.pregunta} respuesta={cat2 && cat2[i] ? p.respuestas[cat2[i]] : 'Sin respuesta'} />
                })
            }

            <br />
            <Divider>Categoria 3</Divider>
            {
                docs_catalog_3.map((p, i) => {
                    return <CardWidget pregunta={p.pregunta} respuesta={cat3 && cat3[i] ? p.respuestas[cat3[i]] : 'Sin respuesta'} />
                })
            }

            <br />
            <Divider>Categoria 4</Divider>
            {
                docs_catalog_4.map((p, i) => {
                    return <CardWidget pregunta={p.pregunta} respuesta={cat4 && cat4[i] ? p.respuestas[cat4[i]] : 'Sin respuesta'} />
                })
            }
        </Modal>
    )
}
