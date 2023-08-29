import React from 'react'
import { Button, Modal, Tag, Card } from 'antd';
import { desrealizacion, despersonalizacion, amnesia } from './ketamina_catalog'

const gridStyle = { width: '50%' }
export default function KetaminaDetails({ isModalOpen, handleOk, handleCancel, escalaDetails: respuestas_ketamina }) {
    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h6>Efectos Secundarios de Ketamina</h6>
            {respuestas_ketamina.Aumento_de_la_Presión_Arterial && <Tag color="red">Aumento de la presion arterial</Tag>}
            {respuestas_ketamina.Debilidad_o_Mareos_ligeros && <Tag color="red">Debilidad o Mareos ligeros</Tag>}
            {respuestas_ketamina.Dolor_de_cabeza && <Tag color="red">Dolor de cabeza</Tag>}
            {respuestas_ketamina.Mareos && <Tag color="red">Mareos</Tag>}
            {respuestas_ketamina.Nauseas && <Tag color="red">Nauseas</Tag>}
            {respuestas_ketamina.Sentimientos_de_Ansiedad && <Tag color="red">Sentimientos de Ansiedad</Tag>}

            <h6>Escala de 6 elementos simplificada de síntomas disociativos administrada por el médico  (CADSS)</h6>
            <h5>Desrealizacion</h5>
            {
                Object.keys(desrealizacion).map((preg, index) => {
                    return <Card>
                        <Card.Grid style={gridStyle} hoverable={false}>
                            {preg}
                        </Card.Grid >
                        <Card.Grid style={gridStyle} hoverable={false}>
                            {desrealizacion[preg][respuestas_ketamina[`desrealizacion_${index}`]]}
                        </Card.Grid>
                    </Card>
                })
            }

            <h5>Despersonalizacion</h5>
            {
                Object.keys(despersonalizacion).map((preg, index) => {
                    return <Card>
                        <Card.Grid style={gridStyle} hoverable={false}>
                            {preg}
                        </Card.Grid >
                        <Card.Grid style={gridStyle} hoverable={false}>
                            {despersonalizacion[preg][respuestas_ketamina[`despersonalizacion_${index}`]]}
                        </Card.Grid>
                    </Card>
                })
            }

            <h5>Amnesia</h5>
            {
                Object.keys(amnesia).map((preg, index) => {
                    return <p>{preg} {amnesia[preg][respuestas_ketamina[`amnesia_${index}`]]}</p>
                })
            }


        </Modal>
    )
}
