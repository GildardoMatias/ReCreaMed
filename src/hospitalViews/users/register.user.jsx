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
            <h4>Registrar Usuario</h4>
            <br/>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
          <Form.Item label="Rol" name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Sucursal" name="rfc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Medico Asignado" name="calle" rules={[{ required: true, message: 'Avenida Madero esquina con Santiago Tapia' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Nombre" name="nint" rules={[{ required: true, message: '74B' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Correo" name="next" rules={[{ required: true, message: '12' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Contraseña" name="colonia" rules={[{ required: true, message: 'Centro' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Foto" name="colonia" rules={[{ required: true, message: 'Centro' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Telefono" name="cp" rules={[{ required: true, message: '58000' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Cedula" name="ciudad_municipio" rules={[{ required: true, message: 'Ingresa ciudad/municipio' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Numero Exterior" name="estado" rules={[{ required: true, message: 'Ingresa estado' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Numero Interior" name="telefono" rules={[{ required: true, message: '1234567890' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Calle" name="correo" rules={[{ required: true, message: 'Correo@Hopspital.com' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Colonia" name="sitio_web" rules={[{ required: true, message: 'www.hospital.com' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Municipio" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Estado" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Codigo Postal" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Estatus" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Certificacion" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Universidad" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
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
