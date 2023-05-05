import React, { Component, useState } from 'react'
import { Form, Input, Button, Row, Col, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import { Upload } from 'antd';
import { message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import { API, sendDataBody, updateData } from '../../resources'
const { Dragger } = Upload;


export default function Register(props) {
  const [profilePic, setProfilePic] = useState('https://')

  //Start upload props Upload File
  const dragDropProps = {
    name: 'file',
    multiple: false,
    action: API + 'imagenes/upload', // Production

    beforeUpload: (file) => {
      const isPNGorJPG = file.type === 'image/png' || file.type === 'image/jpeg';

      if (!isPNGorJPG) {
        message.error(`${file.name} no es una imagen tipo PNG o JPG`);
      }

      return isPNGorJPG || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log('New Files: ', info.file.response.file)
        setProfilePic(info.file.response.file)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onFinish = (values) => {
    values.logo = profilePic;
    values.estatus = '1';
    values.delete = '0';
    console.log("Ready to send:", values)
    sendDataBody('sucursales/add', values).then((rs) => {
      // message.success(rs.message || rs.error);
      console.log('resp: ', rs);
      if (rs.message && rs.message === 'Sucursal creada correctamente') window.location.href = '/hospitales'
      else message.warning(rs.message || rs.error)
      console.log('tosend: ', values);
    })
  };

  const onFinishEdit = (values) => {
    values.logo = profilePic;
    console.log("Ready to send editing:", values)
    updateData('sucursales/update/' + props.hospital._id, values).then(() => {
      props.setModalVisible(false)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      {props.hospital ? <></> : <h4>Registrar Nuevo Hospital</h4>}

      <Dragger {...dragDropProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Arrastra la imagen con el logotipo o click ara buscar</p>
        <p className="ant-upload-hint">
          Selecciona archivos en formato png, jpeg o webp
        </p>
      </Dragger>
      <br />
      <Form name="basic" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} initialValues={props.hospital} onFinish={props.hospital ? onFinishEdit : onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >

        <Row>
          <Col>

            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Please input your username!' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="RFC" name="rfc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Calle" name="calle" rules={[{ required: true, message: 'Ingresa nombre de la calle' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Numero exterior" name="num_exterior" rules={[{ required: true, message: 'Ingresa numero exterion' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Numero Interior" name="num_interior" rules={[{ required: false, message: 'Ingresa numero interior' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Colonia" name="colonia" rules={[{ required: true, message: 'Ingresa nombre de colonia' }]} >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Codigo Postal" name="codigo_postal" rules={[{ required: true, message: 'Ingresa codigo postal' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Ciudad Municipio" name="ciudad_municipio" rules={[{ required: true, message: 'Ingresa ciudad/municipio' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Estado" name="estado" rules={[{ required: true, message: 'Ingresa estado' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Telefono" name="telefono" rules={[{ required: true, message: 'Ingresa numero de telefono' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Correo Electronico" name="email" rules={[{ required: true, message: 'Correo@Hopspital.com' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="Sitio Web" name="sitio_web" rules={[{ required: true, message: 'www.hospital.com' }]} >
              <Input />
            </Form.Item>

          </Col>
        </Row>




        <Form.Item wrapperCol={{ offset: 9 }}>


          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Guardar
          </Button>
          {props.setModalVisible && <Button onClick={() => props.setModalVisible(false)} >Cancelar</Button>}
        </Form.Item>
      </Form>
    </div >
  )
}

