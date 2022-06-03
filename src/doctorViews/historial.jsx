import React from 'react'
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;


const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export function Historial() {
    return (
        <div className='mainContainer'>
            <h4>Historial de los pacientes del medico</h4>
            <h4>Historial Clinico</h4>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >

                <Form.Item label="Paciente" name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="comentarios" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <TextArea rows={4} />
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
