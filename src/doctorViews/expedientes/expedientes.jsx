import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, message, Select } from 'antd';
import { API } from '../../resources';
import { usuario } from '../../resources';
import Loading from '../../loading';
import CreateExpedient from './createExpedient';
import DetalleNota from './detalleNota'
import DetalleHistoria from './detalleHistoria';

const { Option } = Select;

export default function Expedientes(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [expedientesData, setExpedientesData] = useState([]);
    const [expedientesLoading, setExpedientesLoading] = useState(true);
    const [historia, setHistoria] = useState("");
    const [notas, setNotas] = useState("");


 

    useEffect(() => {
        getExpedientesData(props.paciente)
    }, [props.paciente])


    const getExpedientesData = (id_paciente) => {
        fetch(API + `expedientes/${id_paciente}`)
            .then(response => response.json())
            .then(data => {
                // console.log("GetExpData: ", data);
                setExpedientesData(data);
                if (typeof data != "undefined") {
                    setNotas(data.notas); setHistoria(data.historia);
                } else { setNotas(null); setHistoria(null) }
            })
            .finally(() => setExpedientesLoading(false))
    }


    return <div>
        <Row>
            {/* <Col span={16} > */}
            {/* <h4>Expediente {props.paciente}</h4> */}
            <h4>Expediente </h4>
            {/* </Col> */}
            {/* <Col>
                <Button type="primary" onClick={showModal}>
                    Nuevo expediente
                </Button>
            </Col> */}
        </Row>

        <DetalleHistoria historia={historia} />
        
        <DetalleNota notas={notas} id_expediente={expedientesData._id} prevExpNotas={expedientesData.notas} paciente={props.paciente} />

        <CreateExpedient isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} pacientesData={[]} />

    </div>;
}
