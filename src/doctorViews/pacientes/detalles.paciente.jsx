import React, { useState, useEffect } from 'react'
import { getData } from '../../resources';
import { Row, Col } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Loading from '../../loading';







export default function DetallesPaciente(props) {
    const [pacienteData, setPacienteData] = useState([]);
    const [pacienteLoading, setPacienteLoading] = useState(true);

    useEffect(() => {

        getData(`getuser/${props.paciente}`).then(rs => { console.log("DetallePac: ", rs); setPacienteData(rs); setPacienteLoading(false) });
    }, [props.paciente])



    return (
        // <div className='mainContainer'>
        <div>
            <h3>Datos del Paciente</h3>
            {pacienteLoading ? <Loading /> :
                <Row>
                    <Col span={8}>
                        <Card>
                            <Avatar size={128} icon={<UserOutlined />} />
                            <br />
                            <p>Nombre: {pacienteData.name} </p>
                            <p>Correo: {pacienteData.email} </p>
                            <p>Telefono: {pacienteData.telefono} </p>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card>
                            <p>Estado: {pacienteData.estado}</p>
                            <p>Municipio: {pacienteData.municipio}</p>
                            <p>Colonia: {pacienteData.colonia}</p>
                            <p>Calle: {pacienteData.calle}</p>
                            <p>Codigo Postal:{pacienteData.codigopostal} </p>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}
