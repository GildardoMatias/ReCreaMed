import React from 'react'
import { Card, Input } from 'antd';
const { TextArea } = Input;
export default function Soap() {
    return (
        <Card>
            <div className='fila'><strong>S</strong><TextArea rows={1} /> </div>
            <div className='fila'><strong>O</strong> <TextArea rows={1} /> </div>
            <div className='fila'><strong>A</strong> <TextArea rows={1} /> </div>
            <div className='fila'><strong>P</strong> <TextArea rows={1} /> </div>
        </Card>
    )
}


const exp = {
    "_id": "64362d88fd79d28f49d66b3b",
    "usuario": {
        "_id": "641608ae799c5d19e048ee96",
        "name": "MARIO FERNANDEZ",
        "telefono": 4525457008
    },
    "historia": "64362d6dfd79d28f49d66b39",
    "notas": [],
    "recetas": [],
    "createdAt": "2023-04-12T04:03:20.209Z",
    "updatedAt": "2023-04-12T04:03:20.209Z",
    "S": "",
    "O": "",
    "A": "",
    "P": "",
}