import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Upload, Divider } from 'antd'
import { InputNumber, Select } from 'antd';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { S_API, API, getData } from '../../resources'

const { Option } = Select;
const { Dragger } = Upload;
const estados = ["Michoacan", "Morelos", "Guerrero"];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
export default function Register(props) {

  const [form] = Form.useForm();

  const [medicosData, setMedicosData] = useState(null)
  const [medicosDataLoading, setMedicosDataLoading] = useState(true)
  const [avatar, setAvatar] = useState(props.paciente ? props.paciente.avatar : 'https://')

  useEffect(() => {
    getData('/users_by_rol/Medico').then((res) => { setMedicosData(res); setMedicosDataLoading(false); })
  }, [])


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
      .then(response => { 
        console.log('Success:', response); 
        message.success(response.message || response.error);
        // if(response.message && response.message === 'Expediente creado correctamente'){
        //   window.location.href = 'usuarios'
        // }
      })
      .catch(error => console.error('Error:', error))
      // .finally(() => { props.setAdding(false) }) here will be close modal
  }

  const onFinish = async (values) => {

    // Register patient
    values.avatar = avatar;
    values.estatus = '1';
    values.rol = 'Paciente';
    values.password = '' + values.telefono;
    values.universidad = '';
    values.certificacion = '';
    values.cedula = '';
    values.horarios = [];
    // values.medicos_asignados = props.paciente ? props.paciente.medicos_asignados : [usuario._id];
    values.responsable = props.paciente ? props.paciente.responsable : { nombre: values.res_name, telefono: values.res_phone }

    delete values.prefix;
    delete values.res_name;
    delete values.res_phone;

    const url = props.paciente ? API + 'users/updateUser/' + props.paciente._id : S_API + 'register';

    console.log(values)
    console.log('url: ', url);
    await fetch(url, {
      method: props.paciente ? 'PUT' : 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Create User Response:', response);
        message.success(response.message || response.error);
        props.paciente ? console.log('Editing, not creating patient') : createPAtientData(response.user_id);
      })
      .catch(error => console.error('Error:', error))
  };

  const onFinishEdit = (values) => {
    // values.avatar = 'https://';
    // values.estatus = '1';
    // values.rol = 'Paciente';
    // delete values.confirm;
    // delete values.prefix;
    // delete values.agreement;

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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
    <div>
      <h4>Registrar Usuario</h4>
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
        // {...formItemLayout}
        labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}
        form={form}
        name="register"
        onFinish={props.paciente ? onFinishEdit : onFinish}
        // initialValues={{residence: ['zhejiang', 'hangzhou', 'xihu'],prefix: '52'}}
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

        {/* Medicos Asignados */}
        <Form.List
          name="medicos_asignados"
          rules={[
            {
              validator: async (_, medicos_asignados) => {
                if (!medicos_asignados || medicos_asignados.length < 1) {
                  return Promise.reject(new Error('Ingrese al menos un medico'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'medicos_asignados' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Ingrese nombre del medico o borre este campo.",
                      },
                    ]}
                    noStyle
                  >
                    <Select
                      // defaultValue="lucy"
                      style={{
                        width: 120,
                      }}
                    // onChange={handleChange}
                    >
                      {
                        medicosDataLoading ? <Option value="loading">Cargando...</Option> :
                          medicosData.map((m) => <Option value={m._id}>{m.name}</Option>)
                      }


                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                  Asignar Medico
                </Button>
                {/* <Button type="dashed" onClick={() => { add('The head item', 0) }} style={{ width: '60%', marginTop: '20px' }} icon={<PlusOutlined />}>Add field at head</Button> */}
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="telefono"
          label="Telefono"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
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
          rules={[{ required: true, message: 'Ingresa Nombre y apellidos' }]}
        >
          <Input />
        </Form.Item>

        <Divider>Responsable (opcional)</Divider>
        <Form.Item
          name="res_name"
          label="Nombre Responsable"
          rules={[{ message: 'Ingresa Nombre y apellidos' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="res_phone"
          label="Telefono Responsable"
          rules={[{ message: 'Ingresa Nombre y apellidos' }
          ]}
        >
          <Input />
        </Form.Item>
        <Divider />

        <Form.Item
          name="calle"
          label="Calle"
          rules={[{ required: true, message: 'Ingresa calle', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="numexterior"
          label="Num Exterior"
          rules={[{ required: true, message: 'Ingresa numero exterior' }]}
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

          <Button type="primary" htmlType="submit">
            Registrar
          </Button>


        </Form.Item>
      </Form>
    </div>
  )
}
