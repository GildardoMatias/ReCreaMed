import React from 'react'
import { Card, Row, Col } from 'antd'

export default function DetalleHistoria({ paciente }) {

    const { createdAt, fisio_data: { motivo_visita, referido_medico, enterado_mosotros } } = paciente;

    const Question = ({ label, answer }) => {
        return <Row >
            <Col span={9} className='desc' >{label}</Col>
            <Col >{answer}</Col>
        </Row>
    }

    return <Card style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <h5>Historia clínica</h5>
        <Question label='Fecha:' answer={new Date(createdAt).toLocaleString()} />
        <Question label='Motivo de su visita/padecimiento actual:' answer={motivo_visita} />
        <Question label='Viene referido por algún médico o entrenador?:' answer={referido_medico} />
        <Question label='Cómo se enteró de nosotros?:' answer={enterado_mosotros} />
    </Card>
}
