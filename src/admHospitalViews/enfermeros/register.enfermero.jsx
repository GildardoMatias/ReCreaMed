import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Space, Row, Col, Upload } from 'antd'
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { Divider, Select } from 'antd';
import { S_API, getData, API } from '../../resources'
const { Option } = Select;
const { Dragger } = Upload;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function Register(props) {

  const [form] = Form.useForm();

  const [sucursales, setSucursales] = useState([]);
  const [sucursalesLoading, setSucursalesLoading] = useState(true);
  const [avatar, setAvatar] = useState(props.medico ? props.medico.avatar : 'https://')

  //Start upload props Upload File
  const dragDropProps = {
    name: 'file',
    multiple: false,
    action: API + 'imagenes/upload',

    onChange(info) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log('New Files: ', info.file.response.file)
        setAvatar(info.file.response.file)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    console.log('received Medic: ', props.medico);
    getData('sucursales').then((rs) => { setSucursales(rs); setSucursalesLoading(false) })
  }, [])



  const onFinish = (values) => {
    values.avatar = avatar;
    values.estatus = '1';
    values.rol = 'Enfermero';
    delete values.confirm;
    delete values.prefix;

    console.log('ready to send', values)
    fetch(S_API + 'register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', response);
        response.message && response.message === 'Usuario creado correctamente' ?
          window.location.href = 'enfermeros' : message.error(response.error);
      })
      .catch(error => console.error('Error:', error))
  };

  const onFinishEdit = (values) => {
    values.avatar = avatar;
    // values.estatus = '1';
    // values.rol = 'Medico';
    // delete values.confirm;
    // delete values.prefix;

    console.log('ready to send', values)
    fetch(API + 'users/updateUser/' + props.medico._id, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', response);
        response.message && response.message === 'Usuario actualizado correctamente' ?
          props.setIsModalVisible(false) : message.error(response.error);
      })
      .catch(error => console.error('Error:', error))
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+52">+52</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      {
        props.medico ?
          <></> : <h1>Registrar enfermero</h1>
      }
      <br />
      <Dragger {...dragDropProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Arrastra la imagen de perfil o click ara buscar</p>
        <p className="ant-upload-hint">
          Selecciona archivos en formato png, jpeg o webp
        </p>
      </Dragger>
      <br />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={props.medico ? onFinishEdit : onFinish}
        // initialValues={{ horarios: [{ sucursal: '', horario: '' }], prefix: '+52' }}
        initialValues={props.medico}
        scrollToFirstError
      >

        <Row>

          <Col span={11}>
            <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Ingresa Nombre y apellidos' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Correo" rules={[{ type: 'email', message: 'Ingresa un corrreo electronico valido' }, { required: true, message: 'Please input your E-mail!' }]}>
              <Input />
            </Form.Item>

            {
              props.medico ? <></> : <>
                <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor ingrese su contraseña!', },]} hasFeedback >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="confirm" label="Confirmar contraseña" dependencies={['password']} hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Las contraseñas deben coincidir!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            }


            <Form.Item name="telefono" label="Telefono" rules={[{ required: true, message: 'Ingresa el numero de telefono correcto' },]}>
              <Input addonBefore={prefixSelector} style={{ width: '100%', }} />
            </Form.Item>




          </Col>
          <Col span={11}>
            <Form.Item label="horarios" rules={[{ required: true, message: 'Ingresa al menos un horario', },]}>
              <Form.List name="horarios" label="horarios list"
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'sucursal']}
                          rules={[{ required: true, message: 'Elije Sucursal' }]}
                        >
                          <Select placeholder="Elije Sucursal" style={{ width: '120px' }} >
                            {sucursalesLoading ? "Cargando" :
                              sucursales.map(s => <Option value={s._id}>{s.nombre}</Option>)
                            }
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'horario']}
                          rules={[{ required: false, message: 'Missing last name' }]}
                        >
                          <Input placeholder="Horario" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Agregar Horario
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item name="certificacion" label="Certificacion" rules={[{ required: false, message: 'Ingresa tu certificacion' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Universidades" rules={[{ required: true, message: 'Ingresa al menos una universidad', },]}>
              <Form.List name="universidades" label="universidades list">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'universidad']}
                          rules={[{ required: true, message: 'Ingresa la universidad' }]}
                        >
                          <Input placeholder="Universidad" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'carrera']}
                          rules={[{ required: true, message: 'Ingresa la carrera' }]}
                        >
                          <Input placeholder="Carrera" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'cedula']}
                          rules={[{ required: false, message: 'Ingresa la cedula' }]}
                        >
                          <Input placeholder="Cedula" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Agregar Universidad
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item name="especialidad" label="Especialidad" rules={[{ required: false, message: 'Ingresa especialidad' }]}>
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {
                props.setIsModalVisible && <Button onClick={() => props.setIsModalVisible(false)} style={{ marginRight: 6 }}>
                  Cancelar
                </Button>
              }
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Form.Item>
          </Col>

        </Row>





        {/* <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            He leído y acepto los <a href="https://recreamed.com">terminos y condiciones</a>
          </Checkbox>
        </Form.Item> */}


      </Form>
    </div>
  )
}
