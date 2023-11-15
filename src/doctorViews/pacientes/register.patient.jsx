import React, { useState, useRef } from 'react'
import { Form, Input, Button, message, Space, Divider, Upload, Switch, Modal, DatePicker } from 'antd'
import { InputNumber, Select } from 'antd';
import { S_API, API, usuario, estados } from '../../resources'
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import RegisterFisio from './register.patent.fisio';
// const { Dragger } = Upload;


const { Option } = Select;

function RegisterForm(props) {
  const myRef = useRef();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(props.paciente ? props.paciente.avatar : 'noimg.jpg')

  useEffect(() => {
    console.log('Received patient ', props.paciente)
    if (myRef && myRef.current) {
      const { input } = myRef.current
      input.focus()
    }
  }, [])



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
        if (response.message && response.message === 'Expediente creado correctamente') {
          props.setAdding(false)
        }
      })
      .catch(error => console.error('Error:', error))
  }

  const onFinish = async (values) => {

    // Register patient
    values.avatar = avatar;
    values.estatus = '1';
    values.rol = 'Paciente';
    values.password = '' + values.telefono;
    values.universidades = [];
    values.certificacion = '';
    values.cedula = '';
    values.horarios = [];
    values.medicos_asignados = props.paciente ? props.paciente.medicos_asignados : [usuario._id];
    // values.responsable = (props.paciente && props.paciente.responsable) ? props.paciente.responsable : { nombre: values.res_name, telefono: values.res_phone }
    values.responsable = { nombre: values.res_name, telefono: values.res_phone }

    delete values.prefix;
    delete values.res_name;
    delete values.res_phone;

    const url = props.paciente ? API + 'users/updateUser/' + props.paciente._id : S_API + 'register';

    console.log('before send', values)
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
        response.message === 'Usuario creado correctamente' ?
          props.setAdding(false) : console.log(response);
        response.message === 'Usuario actualizado correctamente' ?
          finishUpdate() : console.log(response);

      })
      .catch(error => console.error('Error:', error))
  };

  const finishUpdate = () => {
    props.setAdding(false); props.getPacientesData()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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

    // onDrop(e) {
    //   console.log('Dropped files', e.dataTransfer.files);
    // },
  };
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }} >
      {
        props.paciente ? <h4>Editar paciente</h4> : <h4>Registrar Paciente</h4>
      }

      <br />


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Upload {...dragDropProps}>
          <Button type="dashed" icon={<UploadOutlined style={{ fontSize: 24, color: '#0d6efd' }} />} style={{ width: 400, height: 80 }} block>Selecciona la foto de perfil</Button>
        </Upload>
      </div>
      <br />
      <Form
        // {...formItemLayout}
        labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}
        form={form}
        name="register_patient_medic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={props.paciente}
        scrollToFirstError
      >

        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: 'Ingresa Nombre y apellidos' }]}
        >
          <Input ref={myRef} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Correo"
          rules={[{ type: 'email', message: 'Ingresa un correo electronico vaido!' }, { required: true, message: 'Ingresa un correo electronico' }]}>
          <Input />
        </Form.Item>


        <Form.Item
          name="telefono"
          label="Telefono"
          rules={[{ required: true, message: 'Ingresa tu numero de telefono' }]}
        >
          <InputNumber
            // addonBefore={prefixSelector}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Divider>Responsable (opcional) </Divider>
        <Form.Item name="res_name" label="Nombre Responsable" >
          <Input />
        </Form.Item>
        <Form.Item name="res_phone" label="Telefono Responsable">
          <Input />
        </Form.Item>
        <Divider />

        <Form.Item
          name="calle"
          label="Calle"
          rules={[{ required: false, message: 'Ingresa calle', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="numexterior"
          label="Num Exterior"
          rules={[{ required: false, message: 'Ingresa numero exterior' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="numinterior"
          label="Num Interior"
          rules={[{ required: false, message: 'Ingresa numinterior' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Colonia"
          name="colonia"
          rules={[{ required: false, message: 'Ingresa ' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: false, message: 'Apellido materno', },]}>
          <Select placeholder="Elije tu estado" showSearch>
            {estados.map(e => <Option value={e}>{e}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="municipio"
          label="Municipio"
          rules={[{ required: false, message: 'Ingresa tu municipio' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="codigopostal"
          label="Codigo Postal"
          rules={[{ required: false, message: 'Ingresa codigopostal', },]}>
          <InputNumber style={{ width: '100%', }} />
        </Form.Item>

        <Form.Item name="sexo" label="sexo" rules={[{ required: false, message: 'Selecciona una opcion' }]}>
          <Select placeholder="Elije el sexo" >
            <Option value="H">H</Option>
            <Option value="M">M</Option>
            <Option value="Otro">Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item name="edad" label="Edad" rules={[{ required: false, message: 'Ingresa edad' }]} >
          <InputNumber min={1} max={120} />
        </Form.Item>

        <Form.Item name="diagnostico" label="Diagnostico" rules={[{ required: false, message: 'Ingresa el diagnostico' }]} >
          <Input />
        </Form.Item>

        <Form.Item name="peso" label="Peso" rules={[{ required: false, message: 'Ingresa el peso' }]} >
          <InputNumber min={1} max={200} />
        </Form.Item>

        <Form.Item name="talla" label="Talla" rules={[{ required: false, message: 'Ingresa la talla' }]} >
          <InputNumber min={1} max={200} />
        </Form.Item>

        <Form.Item name="ocupacion" label="Ocupacion" rules={[{ required: false, message: 'Ingresa ocupacion' }]} >
          <Input />
        </Form.Item>

        <Form.Item name="estado_civil" label="Estado Civil" rules={[{ required: false, message: 'Ingresa estado civil' }]} >
          <Select placeholder="Elije el estado civil" >
            <Option value="Soltero">Soltero</Option>
            <Option value="Casado">Casado</Option>
            <Option value="Divorciado">Divorciado</Option>
            <Option value="Separación en proceso judicial">Separación en proceso judicial</Option>
            <Option value="Viudo">Viudo</Option>
            <Option value="Concubinato">Concubinato</Option>
          </Select>
        </Form.Item>

        <Form.Item name="escolaridad" label="Escolaridad" rules={[{ required: false, message: 'Ingresa escolaridad' }]} >
          <Select placeholder="Elije escolaridad" >
            <Option value="Ninguno">Ninguno</Option>
            <Option value="Preescolar">Preescolar</Option>
            <Option value="Primaria">Primaria</Option>
            <Option value="Secundaria">Secundaria</Option>
            <Option value="Medio Superior">Medio Superior</Option>
            <Option value="Superior">Superior</Option>
            <Option value="Posgrado">Posgrado</Option>
          </Select>
        </Form.Item>

        <Form.Item name="lugar_de_nacimiento" label="Lugar De Nacimiento" rules={[{ required: false, message: 'Ingresa el lugar de nacimiento' }]} >
          <Input />
        </Form.Item>

        <Form.Item name="fecha_nacimiento" label="Fecha De Nacimiento" rules={[{ required: false, message: 'Ingresa la fecha de nacimiento' }]} >
          <DatePicker />
        </Form.Item>

        <Form.Item name="ciudad" label="Ciudad de residencia" rules={[{ required: false, message: 'Ingresa ciudad' }]} >
          <Input />
        </Form.Item>

        <Form.Item name="fuma" label="Fuma" rules={[{ required: false, message: 'Ingresa tu universidad' }]} >
          <Switch defaultChecked={false} />
        </Form.Item>

        <Form.Item name="alcohol" label="Alcohol" rules={[{ required: false, message: 'Ingresa tu universidad' }]} >
          <Switch defaultChecked={false} />
        </Form.Item>

        <Form.Item name="drogas" label="Drogas" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
          <Select placeholder="Elije una opcion" >
            <Option value="Antes">Antes</Option>
            <Option value="Ahora">Ahora</Option>
            <Option value="Nunca">Nunca</Option>
          </Select>
        </Form.Item>

        <Form.Item name="cuales_drogas" label="Cuales Drogas" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
          <Input />
        </Form.Item>

        <Form.Item name="enfermedades_familiares" label="Enfermedades Familiares" rules={[{ required: false, message: 'Ingresa tu universidad' }]} >
          <Form.List name="enfermedades_familiares" >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item label='' required={false} key={field.key}>
                    <Form.Item {...field} noStyle
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{ required: false, whitespace: true, message: "Ingresa la enfermedad o elimina este campo" }]}
                    >
                      <Input placeholder="Ingresa enfermedad" style={{ width: fields.length > 1 ? '93%' : '100%' }} />
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
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Agregar Enfermedad  Familiar
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item name="enfermedades_medicas" label="Enfermedades Medicas" rules={[{ required: false, message: 'Ingresa tu universidad' }]} >
          <Form.List name="enfermedades_medicas">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item label='' required={false} key={field.key}>
                    <Form.Item {...field} noStyle
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{ required: false, whitespace: true, message: "Ingresa la enfermedad o elimina este campo" }]}
                    >
                      <Input placeholder="Ingresa enfermedad" style={{ width: fields.length > 1 ? '93%' : '100%' }} />
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
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Agregar Enfermedad Medica
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item name="tratamiento_actual" label="Tratamiento actual" rules={[{ required: false, message: 'Ingresa tu universidad' }]} >
          <Form.List name="tratamiento_actual" >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // label={`Tratamiento ${index + 1}`} 
                    label=''
                    required={false} key={field.key}>
                    <Form.Item {...field} noStyle
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{ required: false, whitespace: true, message: "Ingresa la enfermedad o elimina este campo" }]}
                    >
                      <Input placeholder="Ingresa enfermedad" style={{ width: fields.length > 1 ? '93%' : '100%' }} />
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
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Agregar Tratamiento
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/* <Form.Item wrapperCol={{
          offset: 8,
          span: 16,
        }}>
          <Space>
            <Button onClick={() => props.setAdding(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Space>

        </Form.Item> */}
      </Form>
    </div>
  )
}

export default function Register({ paciente, setIsModalOpen, isModalOpen, getPacientesData }) {


  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return <Modal width={800}
    // title={paciente ? 'Editar Paciente' : 'Registrar Paciente'}
    open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
    footer={[
      <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>,
      <Button type="primary" htmlType="submit" form='register_patient_medic'>
        Guardar
      </Button>
    ]}
  >
    {/* ISFisio? */}
    <RegisterForm paciente={paciente} setAdding={setIsModalOpen} getPacientesData={getPacientesData} />
    {/* <RegisterFisio /> */}
  </Modal>

}