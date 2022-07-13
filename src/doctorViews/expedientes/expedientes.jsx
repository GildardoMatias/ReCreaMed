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

export default function Expedientes(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [expedientesData, setExpedientesData] = useState([]);
    const [expedientesLoading, setExpedientesLoading] = useState(true);
    const [pacientesData, setPacientesData] = useState([]);
    const [pacientesLoading, setPacientesLoading] = useState(true);
    const [pacienteSelected, setPacienteSelected] = useState("Ninguno");
    const [historia, setHistoria] = useState("");
    const [notas, setNotas] = useState("");
    const [recetas, setRecetas] = useState([]);


    function handleChange(value) {
        setPacienteSelected(value);
        getExpedientesData(value)
    }
    // useEffect(() => {
    //     console.log('Patient received: ', props.paciente)
    //     getPacientesData()
    // }, [])

    useEffect(() => {
        setPacienteSelected(props.paciente);
        getExpedientesData(props.paciente)
    }, [props.paciente])


    const getExpedientesData = (id_paciente) => {
        fetch(API + `expedientes/${id_paciente}`)
            .then(response => response.json())
            .then(data => {
                // console.log("GetExpData: ", data);
                setExpedientesData(data);
                if (typeof data != "undefined") {
                    setNotas(data.notas); setRecetas(data.recetas); setHistoria(data.historia);
                } else { setNotas(null); setRecetas(null); setHistoria(null) }
            })
            .finally(() => setExpedientesLoading(false))
    }

    // const getPacientesData = () => {
    //     fetch(API + `mispacientes/${usuario._id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("Pacientes: ", data); setPacientesData(data);
    //         })
    //         .finally(() => setPacientesLoading(false))
    // }

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
            render: (text, rec) => <Button onClick={() => { setNotas(rec._id); showDetailModal() }}>Detalle Nota</Button>,

        },
        {
            title: 'Receta',
            dataIndex: 'receta',
            key: 'receta',
        }
    ];



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
        {/* {
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
        } */}

        {/* <h5>Paciente: {expedientesData[0] && expedientesData[0].usuario.name}</h5> */}


        <DetalleHistoria historia={historia} />
        <DetalleNota notas={notas} id_expediente={expedientesData._id} prevExpNotas={expedientesData.notas} paciente={props.paciente} recetas={expedientesData.recetas}/>
        
        {/* <Row>
            <Col span={12} >
            </Col>
            <Col span={12}>
                <DetalleReceta recetas={recetas} />
            </Col>
        </Row> */}


        <CreateExpedient isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} pacientesData={pacientesData} />

    </div>;
}
