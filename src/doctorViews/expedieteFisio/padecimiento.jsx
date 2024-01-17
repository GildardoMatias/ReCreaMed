import { Card, Col, Row } from 'antd';
import React from 'react'


export default function Padecimiento({ fisio_data }) {

    const { motivo,
        tiempo,
        momento_dia,
        movimientos,
        localizacion,
        localizacion_es,
        tipo,
        tipo_es,
        ena } = fisio_data;

    const Question = ({ label, answer, bkg }) => {
        return <Row style={{ height: 16, backgroundColor: bkg ? '#f5f8fc' : 'white' }}>
            <Col span={12} style={{ fontSize: 12, color: '#515a6e', fontWeight: 500 }}>{label}</Col>
            <Col style={{ fontSize: 12 }}>{answer}</Col>
        </Row>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 15 }}>
            <Question label='Cuál es el motivo de su consulta/lesión/patología?: ' answer={motivo} />
            <Question label='Cuanto tiempo lleva con el problema?:' answer={tiempo} bkg />
            <Question label='En qué momento le duele más?:' answer={momento_dia} />
            <Question label='Con qué movimientos aumenta el dolor?:' answer={movimientos} bkg />
            <Question label='Localizaión del dolor:' answer={localizacion} />
            <Question label='Especificar:' answer={localizacion_es} bkg />
            <Question label='Tipo de dolor:' answer={tipo} />
            <Question label='Especificar:' answer={tipo_es} bkg />
            <Question label='Escala numerica analogica:' answer={ena} />
        </div>
    )
}
