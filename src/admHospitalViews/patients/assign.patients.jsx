import React, { useEffect } from 'react'
import { Select, Space, Form, Button, message } from 'antd'
import { getData, updateData } from '../../resources';
import { useState } from 'react';

export default function AssignPatients() {
    const [pacientesData, setPacientesData] = useState([])
    const [medicosData, setMedicosData] = useState([])

    useEffect(() => {
        getPacientesData()
        getMedicosData()
    }, [])


    const getPacientesData = () => {
        getData('users_by_rol/Paciente').then((rs) => {
            rs.forEach(p => {
                p.value = p._id;
                p.label = p.name;
                p.key = p._id;
            });
            setPacientesData(rs)
        })
    }

    const getMedicosData = () => {
        getData('users_by_rol/Medico').then((rs) => {
            rs.forEach(p => {
                p.value = p._id;
                p.label = p.name;
                p.key = p._id;
            });
            setMedicosData(rs)
        })
    }


    const onFinish = (values) => {
        // find patient into patients data
        const found = pacientesData.find(p => p._id === values.paciente)
        console.log(found)
        // Push to array of medicos if not exists
        if (found.medicos_asignados.includes(values.medico))
            message.info('El medico ya se encuentra asignado a este paciente')
        else {
            found.medicos_asignados.push(values.medico);
            updateData(`users/updateUser/${values.paciente}`, found)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='mainContainer'>
            <h4>Asignar Pacientes</h4>



            <Form
                name="reassign_patients"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Selecciona paciente"
                    name="paciente"
                    rules={[{
                        required: true,
                        message: 'Selecciona un paciente!',
                    },
                    ]}
                >
                    <Select
                        defaultValue="Selecciona un paciente"
                        style={{ width: 320 }}
                        onChange={handleChange}
                        options={pacientesData}
                    />
                </Form.Item>

                <Form.Item
                    label="Selecciona medico a asignar"
                    name="medico"
                    rules={[{ required: true, message: 'Selecciona un medico a asignar!' },
                    ]}
                >
                    <Select
                        defaultValue="Selecciona un medico"
                        style={{ width: 320 }}
                        onChange={handleChange}
                        options={medicosData}
                    />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Asignar
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}
