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
            <h1>Registrar paciente</h1>
            <br/>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
          <Form.Item label="Nombre" name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Apellidos" name="rfc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="No. expediente" name="calle" rules={[{ required: true, message: 'Avenida Madero esquina con Santiago Tapia' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Sexo" name="nint" rules={[{ required: true, message: '74B' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="CURP" name="next" rules={[{ required: true, message: '12' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Numero de Seguro" name="colonia" rules={[{ required: true, message: 'Centro' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Direccion" name="colonia" rules={[{ required: true, message: 'Centro' }]} >
            <Input />
          </Form.Item>
          {/* <Form.Item label="Codigo Postal" name="cp" rules={[{ required: true, message: '58000' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Ciudad Municipio" name="ciudad_municipio" rules={[{ required: true, message: 'Ingresa ciudad/municipio' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Estado" name="estado" rules={[{ required: true, message: 'Ingresa estado' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Telefono" name="telefono" rules={[{ required: true, message: '1234567890' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Correo Electronico" name="correo" rules={[{ required: true, message: 'Correo@Hopspital.com' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Sitio Web" name="sitio_web" rules={[{ required: true, message: 'www.hospital.com' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Numero de Expediente" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
            <Input />
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
        </div>
    )
}
