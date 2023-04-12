import React from 'react';
import { Form, Input, Button, message } from 'antd'
import { InputNumber, Select } from 'antd';
import { S_API,estados } from '../../resources'
const { Option } = Select;

export default function Register() {

  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.avatar = 'https://';
    values.estatus = '1';
    values.rol = 'Medico';
    delete values.confirm;
    delete values.prefix;
    delete values.agreement;

    console.log(values)
    fetch(S_API + 'register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => { console.log('Success:', response); message.success(response.message || response.error); })
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


  
  return (
    <div className='mainContainer'>
      <h1>Registrar doctor</h1>
      <br />
      {/* <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
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
      </Form> */}
      <Form
        // {...formItemLayout}
        labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}
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
          <Input />
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
          <Input />
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
          <Select placeholder="Elije tu estado" showSearch>
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

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
