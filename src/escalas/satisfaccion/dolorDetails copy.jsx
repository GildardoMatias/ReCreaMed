import React from 'react'
import { Button, Modal } from 'antd';

const pretungas = { "Ritmo_Cardiaco_Elevado": false, "Sentimientos_de_Ansiedad": true, "Debilidad_o_Mareos_ligeros": false, "Sedacion_o_Somnolencia": true, "Nauseas": false, "Vision_Borrosa": true, "Aumento_de_la_Presión_Arterial": false, "Mareos": true, "Dolor_de_cabeza": false, "desrealizacion_0": 0, "desrealizacion_1": 1, "despersonalizacion_0": 1, "despersonalizacion_1": 3, "amnesia_0": 1, "amnesia_1": 1, "ketamina": 6, "ketaminaiv": 0, "ketaminaivb": 2, "_id": "646f77314c0254e92dd244c1" }

export default function DolorDetails({ isModalOpen, handleOk, handleCancel, escalaDetails }) {
    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
            <p>{JSON.stringify(escalaDetails)}</p>
        </Modal>
    )
}
