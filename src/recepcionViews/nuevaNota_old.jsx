import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import { API } from '../resources';
const { Option } = Select;

const onFinish = (values) => {
    console.log('Form values:', values);
    values.id_medico = '625706149a6437369f835bce';

    console.log(values)
    fetch(API + 'notas/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            console.log('Success:', response);
            message.success(response.message || response.error);
        })
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

export function NuevaNota() {
    const [pacientesData,setPacientesData] = useState([]);

    useEffect(() => { getPacientes() }, [])
    
    function getPacientes() {
        fetch(API + 'mispacientes/625706149a6437369f835bce')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPacientesData(data);
            });
    }

    return (
        <div>
            <h4 style={{ marginLeft: 20 }}>Detalles de la nota</h4>
            *La nota lleva el id del medico, obtenido de la sesion
            <br />
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                {/* <Form.Item label="Paciente" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item> */}
                <Form.Item label="Paciente" name="id_usuario" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        // filterOption={(input, option) =>
                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                    >
                        {
                            pacientesData.map(p => <Option value={p._id}>{p.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Edad" name="edad" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Talla" name="talla" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Peso" name="peso" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="IMC" name="imc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Temperatura" name="temperatura" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Presion Arterial" name="presion_arterial" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia Cardiaca" name="frecuencia_cardiaca" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia respiratoria" name="frecuencia_respiratoria" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Estudios" name="estudios" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Observaciones" name="Observaciones" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
