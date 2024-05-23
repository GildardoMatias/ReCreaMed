import React from 'react'
import { Row, Col, Card, Button } from 'antd'
import { RegisterFisioForm } from '../doctorViews/pacientes/register.patent.fisio'
import { useParams } from "react-router-dom";
import logo from '../assets/Logo.png';

export default function RegisterPatientFisio() {
    let { idmedico } = useParams();

    return <Row >
        <Col xs={24} sm={24} md={24} lg={{span: 14, offset: 5}} xl={14} >
            <br /><br />
            <Card hoverable>
                <Row justify='center'>
                    <img src={logo} alt="Logo" width={160} />
                </Row>
                <Row justify='center'>
                    <h3>Registro de nuevo paciente</h3>
                </Row>
                <br />
                <RegisterFisioForm id_medico_f={idmedico} />
                <br />
                <Row justify='end'>
                    <Button type="primary" htmlType="submit" form='register_patient_fisio'>
                        Guardar
                    </Button>
                </Row>
            </Card>
            <br />
        </Col>
    </Row>
}
