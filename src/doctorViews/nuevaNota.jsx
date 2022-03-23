import React from 'react'
import { Form, Input, Button } from 'antd';
const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export function NuevaNota() {
    return (
        <div>
            <h4 style={{ marginLeft: 20 }}>Detalles de la nota</h4>
            *La nota lleva el id del medico, obtenido de la sesion
            <br />
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                <Form.Item label="Paciente" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Edad" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Talla" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Peso" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="IMC" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Temperatura" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Presion Arterial" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia Cariaca" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia respiratoria" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Estudios" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Observaciones" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
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
