import React from 'react'
import { Button, Modal, Card } from 'antd';
import { dolor_catalog } from './dolor_catalog';

const pretungas = { "Ritmo_Cardiaco_Elevado": false, "Sentimientos_de_Ansiedad": true, "Debilidad_o_Mareos_ligeros": false, "Sedacion_o_Somnolencia": true, "Nauseas": false, "Vision_Borrosa": true, "Aumento_de_la_Presión_Arterial": false, "Mareos": true, "Dolor_de_cabeza": false, "desrealizacion_0": 0, "desrealizacion_1": 1, "despersonalizacion_0": 1, "despersonalizacion_1": 3, "amnesia_0": 1, "amnesia_1": 1, "ketamina": 6, "ketaminaiv": 0, "ketaminaivb": 2, "_id": "646f77314c0254e92dd244c1" }

// { "1": ["Detras Izquierda"], "2": 4, "3": 3, "4": 6, "5": 5, "6": "correr", "7": "Caminar", "8": "Ninguno", "9": 2, "10": 3, "11": ["B. Mi enfermedad principal (la enfermedad que actualmente se está tratando y evaluando)"], "12": ["Fatigoso (pesado)", "Insoportable"], "14": 2, "15": 1, "16": 2, "17": 2, "18": 2, "19": 0, "20": 1, "21": ["Compresas frías"], "22": "si", "A13": 2, "B13": 6, "C13": 3, "D13": 4, "E13": 2, "F13": 5, "G13": 3, "B18": "no", "B19": "ningn", "B21": "si", "_id": "636163a89a3c0025d9f5c1f7" }

export default function DolorDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    return (
        <Modal title="Respuestas escala de dolor" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
            {
                Object.keys(escalaDetails).map((key) => {
                    const found = dolor_catalog.find((q) => String(q['n']) === key)
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{found && found["pregunta"]}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails[key]}</Card.Grid>
                    </Card>
                })
            }

        </Modal>
    )
}
