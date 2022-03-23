import React from 'react'
import { Form, Input, Button } from 'antd'

export default function Register() {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
  
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div>
            <h1>Registrar doctor</h1>
            <br/>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
          <Form.Item label="Hospital" name="Hospital" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Nombre" name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Apellido Paterno" name="rfc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Apellido Materno" name="calle" rules={[{ required: true, message: 'Avenida Madero esquina con Santiago Tapia' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Cedula" name="nint" rules={[{ required: true, message: '74B' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Calle" name="next" rules={[{ required: true, message: '12' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Numero" name="colonia" rules={[{ required: true, message: 'Centro' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Colonia" name="cp" rules={[{ required: true, message: '58000' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Telefono" name="ciudad_municipio" rules={[{ required: true, message: 'Ingresa ciudad/municipio' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Correo" name="estado" rules={[{ required: true, message: 'Ingresa estado' }]} >
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
