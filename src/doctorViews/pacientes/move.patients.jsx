import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, message } from 'antd';
import { API } from '../../resources';
import { usuario } from '../../resources';
const { Option } = Select;


export default function MovePatients() {
    const [pacientesData, setPacientesData] = useState([]);
    const [medicosData, setMedicosData] = useState([]);

    useEffect(() => {
        getPacientesData()
        getMedicosData()
    }, [])

    const getPacientesData = () => {
        fetch(API + `mispacientes/${usuario._id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Pacientes: ", data);
                setPacientesData(data);
                // setILoading(false);
            });
    }

    const getMedicosData = () => {
        fetch(API + `users_by_rol/Medico`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMedicosData(data);
                // setILoading(false);
            });
    }

    const onFinish = (values) => {
        // console.log('Valores:', values);
        const userFound = pacientesData.find(p => p._id === values.id_usuario);
        let userMedicos = userFound.medicos_asignados;
        userMedicos.push(values.medico);
        const postBody = { medicos_asignados: userMedicos }
        fetch(API + `users/updateMedicos/${values.id_usuario}`, { 
            method: 'PUT',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => { console.log('Success:', response); message.success(response.message || response.error); })
            .catch(error => console.error('Error:', error))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    //Select paciente widget
    function onChange(value) {
        console.log(`selected ${value}`);
    }
    function onSearch(val) {
        console.log('search:', val);
    }
    //End of select paciente widget
    return (
        <div>
            <h4> Asignar pacientes a otro médico </h4>
            <br />
            <Form name="expediente" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >

                <Form.Item label="Paciente" name="id_usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                    >
                        {
                            pacientesData.map(p => <Option value={p._id}>{p.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                    >
                        {
                            medicosData.map(p => <Option value={p._id}>{p.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" form='expediente'>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
