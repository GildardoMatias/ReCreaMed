import React from 'react'
import { Form, Input, Button, message, Space } from 'antd'
import { InputNumber, Select } from 'antd';
import { S_API, API } from '../../resources'
import { usuario } from '../../resources'

const { Option } = Select;
const estados = ["Michoacan", "Morelos", "Guerrero"];

export default function Register(props) {

  const [form] = Form.useForm();

  async function addHistoria() {
    return await fetch(API + 'historias/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        historial: "Historia clinica al " + new Date()
      })
    }).then(res => res.json())
      .then(response => {
        console.log('Story Created: ', response);
        return response
      })
      .catch(error => console.error('Error:', error))
  }

  const createPAtientData = async (usr) => {
    const historia = await addHistoria();
    console.log('historia on Register: ', historia);
    const postBody = {
      usuario: usr,
      historia: historia.id_historia,
      notas: [],
      recetas: []
    }
    console.log('postBodyForExpedient: ', postBody);
    await fetch(API + 'expedientes/add', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => { console.log('Success:', response); message.success(response.message || response.error); })
      .catch(error => console.error('Error:', error))
      .finally(() => { props.setAdding(false) })
  }

  const onFinish = async (values) => {

    // Register patient
    values.avatar = 'https://';
    values.estatus = '1';
    values.rol = 'Paciente';
    values.password = '' + values.telefono;
    values.universidad = '';
    values.certificacion = '';
    values.cedula = '';
    values.horarios = [];
    values.medicos_asignados = props.paciente ? props.paciente.medicos_asignados : [usuario._id];

    delete values.prefix;

    const url = props.paciente ? API + 'users/updateUser/' + props.paciente._id : S_API + 'register';

    console.log(values)
    console.log('url: ', url);
    // await fetch(url, {
    //   method: props.paciente ? 'PUT' : 'POST',
    //   body: JSON.stringify(values),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    //   .then(response => {
    //     console.log('Create User Response:', response);
    //     message.success(response.message || response.error);
    //     props.paciente ? console.log('Editing, not creating patient') : createPAtientData(response.user_id);
    //   })
    //   .catch(error => console.error('Error:', error))
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
  return (
    <div style={{ width: '100%' }}>
      {
        props.paciente ? <h4>Editar paciente</h4> : <h4>Registrar Paciente</h4>
      }

      <br />
      <Form
        // {...formItemLayout}
        labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={props.paciente}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Correo"
          rules={[{ type: 'email', message: 'Ingresa un correo electronico vaido!' }, { required: true, message: 'Please input your E-mail!' }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor ingrese su contraseña!', },]} hasFeedback >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirmar contraseña"
          dependencies={['password']}
          hasFeedback
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
        </Form.Item> */}

        <Form.Item
          name="telefono"
          label="Telefono"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'Ingresa Nombre y apellidos',
            },
          ]}
        >
          <Input />
        </Form.Item>
     
        <Form.Item
          name="res_name"
          label="Nombre Responsable"
          rules={[
            {
              required: true,
              message: 'Ingresa Nombre y apellidos',
            },
          ]}
        >
          <Input />
        </Form.Item>
       
        <Form.Item
          name="res_phone"
          label="Telefono Responsable"
          rules={[
            {
              required: true,
              message: 'Ingresa Nombre y apellidos',
            },
          ]}
        >
          <Input />
        </Form.Item>

        



        <Form.Item
          name="calle"
          label="Calle"
          rules={[
            {
              required: true,
              message: 'Ingresa calle',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="numexterior"
          label="Num Exterior"
          rules={[
            {
              required: true,
              message: 'Ingresa numero exterior',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="numinterior"
          label="Num Interior"
          rules={[
            {
              required: true,
              message: 'Ingresa numinterior',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Colonia"
          name="colonia"
          rules={[{ required: true, message: 'Please input your colobnia!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="estado" label="Estado" rules={[{ required: true, message: 'Apellido materno', },]}>
          <Select placeholder="Elije tu estado">
            {estados.map(e => <Option value={e}>{e}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="municipio"
          label="Municipio"
          rules={[{ required: true, message: 'Ingresa tu municipio' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="codigopostal" label="Codigo Postal" rules={[{ required: true, message: 'Ingresa codigopostal', },]}>
          <InputNumber style={{ width: '100%', }} />
        </Form.Item>
        {/* <Form.Item
          name="certificacion"
          label="Certificacion"
          rules={[{ required: true, message: 'Ingresa tu certificacion' }]}
        >
          <Input />
        </Form.Item> */}
        {/* <Form.Item
          name="universidad"
          label="Universidad" rules={[{ required: true, message: 'Ingresa tu universidad' }]} >
          <Input />
        </Form.Item> */}

        <Form.Item label='*'>
          <Space>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
            <Button onClick={() => props.setAdding(false)}>Cancelar</Button>
          </Space>

        </Form.Item>
      </Form>
    </div>
  )
}
