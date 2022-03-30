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
} from 'antd';
import API from '../../resources'
import logo from '../assets/Logo.png';
import './login.css';

const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
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

  const sendUser = () => {
    fetch(

    )
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    var data = { username: 'example' };

    console.log(JSON.stringify(values))
    // fetch(API, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response => console.log('Success:', response));
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
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
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
              prefix: '86',
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

            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
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

            <Form.Item
              name="rol"
              label="Rol"
              tooltip="Ingresa el rol"
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar tu nombre real',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select your habitual residence!',
          },
        ]}
      >
        <Cascader options={residences} />
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
              <InputNumber
                addonAfter={suffixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item name="colonia" label="Colonia" rules={[{ required: true, message: 'Ingresa tu colonia' }]} > <Input /> </Form.Item>
            <Form.Item name="municipio" label="Municipio" rules={[{ required: true, message: 'Ingresa tu municipio' }]} > <Input /> </Form.Item>
            <Form.Item name="estado" label="Estado" rules={[{ required: true, message: 'Ingresa tu estado' }]} > <Input /> </Form.Item>
            <Form.Item name="municipio" label="Municipio" rules={[{ required: true, message: 'Ingresa tu municipio' }]} > <Input /> </Form.Item>
            <Form.Item name="codigopostal" label="Codigo Postal" rules={[{required: true,message: 'Ingresa codigopostal',},]}>
              <InputNumber addonAfter={suffixSelector} style={{ width: '100%',}}/>
            </Form.Item>
            <Form.Item name="certificacion" label="Certificacion" rules={[{ required: true, message: 'Ingresa tu certificacion' }]} > <Input /> </Form.Item>
            <Form.Item name="universidad" label="Universidad" rules={[{ required: true, message: 'Ingresa tu universidad' }]} > <Input /> </Form.Item>

            {/* <Form.Item name="website" label="Apellido Paterno" rules={[ {required: true,message: 'Please input website!',},]}>
              <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                <Input />
              </AutoComplete>
            </Form.Item> */}

            <Form.Item
              name="gender"
              label="Apellido Materno"
              rules={[
                {
                  required: true,
                  message: 'Apellido materno',
                },
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Captcha" extra="We must make sure that your are a human.">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Please input the captcha you got!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>Get captcha</Button>
                </Col>
              </Row>
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
                I have read the <a href="">agreement</a>
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