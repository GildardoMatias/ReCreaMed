import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, message, Select } from 'antd';
import { API } from '../../resources';
import { usuario } from '../../resources';
import Loading from '../../loading';
import CreateExpedient from './createExpedient';
import DetalleNota from './detalleNota'
import DetalleReceta from './detalleReceta';
import DetalleHistoria from './detalleHistoria';

const { Option } = Select;

export default function Expedientes() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [expedientesData, setExpedientesData] = useState([]);
    const [expedientesLoading, setExpedientesLoading] = useState(true);
    const [pacientesData, setPacientesData] = useState([]);
    const [pacientesLoading, setPacientesLoading] = useState(true);
    const [pacienteSelected, setPacienteSelected] = useState("Ninguno");
    const [historia, setHistoria] = useState("");
    const [nota, setNota] = useState("");
    const [receta, setReceta] = useState("");


    function handleChange(value) {
        setPacienteSelected(value);
        getExpedientesData(value)
    }
    useEffect(() => {
        getPacientesData()
    }, [])

    const getExpedientesData = (id) => {
        fetch(API + `expedientes/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("GetExpData: ", data);
                setExpedientesData(data);
                if (typeof data[0] != "undefined") {
                    setNota(data[0].nota); setReceta(data[0].receta); setHistoria(data[0].historia);
                } else { setNota(null); setReceta(null); }
            })
            .finally(() => setExpedientesLoading(false))
    }

    const getPacientesData = () => {
        fetch(API + `mispacientes/${usuario._id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Pacientes: ", data); setPacientesData(data);
            })
            .finally(() => setPacientesLoading(false))
    }

    const showModal = () => { setIsModalVisible(true); };
    const showDetailModal = () => { setDetailModalVisible(true); };



    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'usuario',
            key: 'Paciente',
        },
        {
            title: 'Historia Clinica',
            dataIndex: 'historia',
            key: 'historiaClinica',
            render: (text, rec) => <Button onClick={setHistoria(rec)}>Detalle Historia</Button>,
        },
        {
            title: 'Notas Medicas',
            dataIndex: 'nota',
            key: 'notasMedicas',
            render: (text, rec) => <Button onClick={() => { setNota(rec._id); showDetailModal() }}>Detalle Nota</Button>,

        },
        {
            title: 'Receta',
            dataIndex: 'receta',
            key: 'receta',
        }
    ];



    return <div className="mainContainer">
        <Row>
            <Col span={16} ><h4>Expedientes</h4></Col>
            <Col>
                <Button type="primary" onClick={showModal}>
                    Nuevo expediente
                </Button>
            </Col>
        </Row>
        <br />
        {
            pacientesLoading ? <Loading /> :
                <Select
                    defaultValue={pacientesData && pacientesData[0]._id}
                    placeholder='Selecciona un paciente'
                    style={{ width: 200 }}
                    onChange={handleChange}>
                    {
                        pacientesData.map(p => <Option nota={p.nota} value={p._id}>{p.name}</Option>)
                    }
                </Select>
        }

        <br />

        <br />

        <br />

        <h5>Paciente: {expedientesData[0] && expedientesData[0].usuario.name}</h5>


        <Row>
            <Col span={12} >
                <DetalleNota nota={nota} />
            </Col>
            <Col span={12}>
                <DetalleReceta receta={receta} />
                <DetalleHistoria historia={historia} />
            </Col>
        </Row>


        <CreateExpedient isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} pacientesData={pacientesData} />

    </div>;
}
