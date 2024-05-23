import React from 'react'
import { Modal, Card } from 'antd';
import { pcl5_questions } from './pcl5.catalog';

export default function Pcl5Details({ isModalOpen, handleOk, handleCancel, escalaDetails }) {

    const {
        problemas,
        peor_caso,
        tiempo,
        muerte_real,
        como_experimento,
        muerte_familiar
    } = escalaDetails;

    const responses = [
        "No del todo",
        "Un Poco",
        "Moderado",
        "Mucho",
        "Extremadamente"
    ]

    const Tablilla = ({ preg, res }) => {
        return <Card size='small'>
            <Card.Grid hoverable={false} style={{ width: '70%' }}>{preg}</Card.Grid>
            <Card.Grid hoverable={false} style={{ width: '30%' }}>{res}</Card.Grid>
        </Card>
    }

    return (
        <Modal title="Respuestas escala PCL-5" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} destroyOnClose >

            {peor_caso && <Tablilla preg="Brevemente identifique el peor de los casos" res={peor_caso} key={1111} />}
            {tiempo && <Tablilla preg="¿Hace cuanto tiempo pasó?" res={tiempo} key={1222} />}
            {muerte_real && <Tablilla preg="Hubo muerte real o amenaza, lesiones graves o violencia sexual?" res={muerte_real ? "Si" : "No"} key={1333} />}
            {como_experimento && <Tablilla preg="¿Cómo lo experimentó?" res={como_experimento} key={1444} />}
            {muerte_familiar && <Tablilla preg="Si el, evento involucra la muerte de un familiar cercano o un amigo cercano, ¿fué debido a algún tipo de accidente o violencia, o fué por causas naturales?" res={muerte_familiar} key={1555} />}

            {
                pcl5_questions.map((pr, i) => {
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{problemas && responses[problemas[i]]}</Card.Grid>
                    </Card>
                })
            }

        </Modal>
    )
}
