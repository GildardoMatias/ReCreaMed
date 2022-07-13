import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Upload } from 'antd';
import { message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import { API } from '../../resources'


export default function Register() {
  //Start upload props
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    beforeUpload(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
  };
  //End of Upload props

  const onFinish = (values) => {
    values.logo = 'https://';
    values.estatus = '1';
    values.delete = '0';
    console.log("Ready to send:", values)
    fetch(API + 'sucursales/add', {
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
  return (
    <div>
      <h1>Registro</h1>
      <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
        <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Please input your username!' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="RFC" name="rfc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
          <Input />
        </Form.Item>
        {/* <Form.Item label="Logo" name="logo" rules={[{ message: '' }]} >
          <Input />
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item> */}
        <Form.Item label="Calle" name="calle" rules={[{ required: true, message: 'Avenida Madero esquina con Santiago Tapia' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Numero exterior" name="num_exterior" rules={[{ required: true, message: '12' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Numero Interior" name="num_interior" rules={[{ required: true, message: '74B' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Colonia" name="colonia" rules={[{ required: true, message: 'Centro' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Codigo Postal" name="codigo_postal" rules={[{ required: true, message: '58000' }]} >
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
        <Form.Item label="Correo Electronico" name="email" rules={[{ required: true, message: 'Correo@Hopspital.com' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Sitio Web" name="sitio_web" rules={[{ required: true, message: 'www.hospital.com' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Numero de Expediente" name="no_expediente" rules={[{ required: true, message: 'Ingresa numero de expediente' }]} >
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

