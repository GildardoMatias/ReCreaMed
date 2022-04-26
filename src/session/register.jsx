import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';
import {S_API} from '../resources'
import logo from '../assets/Logo.png';
import './login.css';

const { Option } = Select;
const estados = ["Michoacan", "Morelos", "Guerrero"];

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
      span: 16,
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

export function Register() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.avatar = 'https://';
    values.estatus = '1';
    delete values.confirm;
    delete values.prefix;
    delete values.agreement;

    console.log(values)
    fetch(S_API+'register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {console.log('Success:', response); message.success(response.message);})
      .catch (error => console.error('Error:', error))
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
  <Row>
    <Col span={12} offset={6}>
      <br />
      <br />
      <Card hoverable>
        <Row justify="center"> <img src={logo} alt="Logo" width={160} /></Row>
        <br />
        <br />
        <Row justify="center">
          <h3>Registro de administrador</h3>
        </Row>
        <br />
        <br />
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '52',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="Correo"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor ingrese su contraseña!', },]} hasFeedback >
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
          </Form.Item>

          <Form.Item name="rol" label="Rol" rules={[{ required: true, message: 'Elije el rol', },]}>
            <Select placeholder="Elije tu estado">
              <Option value="Administrador">Administrador</Option>
              <Option value="Medico">Medico</Option>
              <Option value="Paciente">Paciente</Option>
            </Select>
          </Form.Item>

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
            name="id_sucursal"
            label="Id Sucursal"
            rules={[
              {
                required: true,
                message: 'Ingresa el ID de la sucursal',
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="id_medicoasignado"
            label="Id Medico Asignado"
            rules={[
              {
                required: true,
                message: 'Ingresa el ID del medico ',
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
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
            name="cedula"
            label="Cedula"
            rules={[
              {
                required: true,
                message: 'Ingresa cedula',
              },
            ]}
          >
            <Input/>
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
            <Input/>
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
            <Input/>
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
          <Form.Item name="municipio" label="Municipio" rules={[{ required: true, message: 'Ingresa tu municipio' }]} > <Input /> </Form.Item>
          <Form.Item name="codigopostal" label="Codigo Postal" rules={[{ required: true, message: 'Ingresa codigopostal', },]}>
            <InputNumber addonAfter={suffixSelector} style={{ width: '100%', }} />
          </Form.Item>
          <Form.Item
            name="certificacion"
            label="Certificacion"
            rules={[{ required: true, message: 'Ingresa tu certificacion' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="universidad"
            label="Universidad" rules={[{ required: true, message: 'Ingresa tu universidad' }]} >
            <Input />
          </Form.Item>

          <Form.Item
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
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  </Row>
);
};