import React, { useState } from 'react'
import { Button, Select, Form, Input, InputNumber, Divider, Modal, Radio, message, Upload } from 'antd';
import { registerProfile, updateData, usuario } from '../../resources';
import { UploadOutlined } from '@ant-design/icons'
import { API } from '../../resources'
const { Option } = Select;


export function RegisterFisioForm({ paciente, setAdding, id_medico_f }) {

    const [referido, setReferido] = useState(false)
    const [avatar, setAvatar] = useState(paciente && paciente.avatar ? paciente.avatar : 'noimg.jpg')
    // const [avatar, setAvatar] = useState(paciente.avatar)

    const onFinish = (values) => {
        values.avatar = avatar;
        values.tipo = 'FISIO'
        values.password = '' + values.telefono;
        values.rol = 'Paciente';
        values.medicos_asignados = id_medico_f ? [id_medico_f] : [usuario._id];

        console.log('Register Fisio:', values);
        registerProfile(values).then((rs) => {
            console.log('Response register fisio ', rs)
            if (rs.message && rs.message === 'Usuario creado correctamente') {
                message.info('Usuario creado correctamente')
                if (setAdding) setAdding(false);
            } else message.error(rs.error)
        })
    };

    const onFinishEdit = (values) => {
        values.avatar = avatar;
        console.log(values)
        updateData(`users/updateUser/${paciente._id}`, values).then(rs => { if (setAdding) setAdding(false) })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log('Failed avatar:', avatar);
        message.error('Revise los datos del formulario')
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

    return <div>


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img width={180} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' style={{ justifySelf: 'center' }} />
            <Upload {...dragDropProps}>
                <Button type="dashed" icon={<UploadOutlined style={{ fontSize: 24, color: '#0d6efd' }} />} style={{ width: 400, height: 60 }} block>Haz click para cambiar la foto de perfil</Button>
            </Upload>
        </div>

        <br />

        <Form
            name="register_patient_fisio"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            size='small'
            initialValues={paciente || {}}
            onFinish={paciente ? onFinishEdit : onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label="Nombre y Apellidos" name="name"
                rules={[{ required: true, message: 'Ingrese nombre y apellidos' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="sexo" label="Sexo" rules={[{ required: true, message: 'Selecciona una opcion' }]}>
                <Select placeholder="Elije el sexo" >
                    <Option value="H">H</Option>
                    <Option value="M">M</Option>
                    <Option value="Otro">Otro</Option>
                </Select>
            </Form.Item>

            <Form.Item name="edad" label="Edad" rules={[{ required: true, message: 'Ingresa edad' }]} >
                <InputNumber min={1} max={120} />
            </Form.Item>



            <Form.Item name="telefono" label="Telefono" rules={[{ required: true, message: 'Ingresa un numero de telefono válido' }]}>
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="email" label="Correo electrónico" rules={[{ required: true, message: 'Ingresa correo electronico válido' }]}>
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

            <Form.Item name="ocupacion" label="Ocupacion" rules={[{ required: false, message: 'Ingresa ocupacion' }]} >
                <Input />
            </Form.Item>

            <Divider >Historia Clinica</Divider>

            <Form.Item name={['fisio_data', 'motivo_visita']} label="Motivo por el cual nos visita/padecimiento actual" rules={[{ required: true, message: 'Ingresa datos' }]} >
                <Input />
            </Form.Item>

            <Form.Item label="Viene referido por algún médico o entrenador?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={val => { console.log('Selected ', val); setReferido(val.target.value) }} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            {
                referido && <Form.Item name={['fisio_data', 'referido_medico']} label="Especificar" rules={[{ required: false, message: 'Ingresa datos' }]} >
                    <Input />
                </Form.Item>
            }

            <Form.Item name={['fisio_data', 'enterado_mosotros']} label="Cómo se enteró de nosotros?" rules={[{ required: true, message: 'Ingresa datos' }]} >
                <Input />
            </Form.Item>

            <Divider >Antecedentes Personales</Divider>

            <Form.Item name={['fisio_data', 'enfermedad']} label="Padece usted alguna enfermedad?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'medicamento']} label="Toma algún medcamento?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'intervenido']} label="Ha sdo intervendo quirurgicamente?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'tabaquismo']} label="Tabaquismo" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'drogas']} label="Drogas" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'alcoholismo']} label="Alcoholismo" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'suplemento']} label="Suplemento alimenticio" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'fractura']} label="Ha sufrido alguna fractura, esguince, luxación o desgarre?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Divider>Antecedentes Heredofamiliares</Divider>

            <Form.Item name={['fisio_data', 'cancer']} label="Cancer" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'dabetes']} label="Diabetes" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'hipertension']} label="Hipertension" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'enfermedad_mental']} label="Enfermedad Mental" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'neurologicas']} label="Enfermedades neurologicas" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'cardiopatias']} label="Cardiopatias" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'reumaticas']} label="Enfermedades reumaticas" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'malformaciones']} label="Malformaciones congénitas" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Practica algún deporte o realiza actividad física?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={['fisio_data', 'deporte']} label="Especificar" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Input />
            </Form.Item>

            <Form.Item name={['fisio_data', 'frecuencia']} label="Con qué frecuencia?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Input />
            </Form.Item>

            <Form.Item name={['fisio_data', 'desde_cuando']} label="Desde Cuando lo practicas?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Input />
            </Form.Item>

            <Form.Item name={['fisio_data', 'recreatvo']} label="Recreatvo o competición?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
                <Input />
            </Form.Item>

        </Form>
    </div>
}

export default function Register({ paciente, setIsModalOpen, isModalOpen, getPacientesData }) {


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <Modal width={800}
        title='Registrar paciente'
        // title={paciente ? 'Editar Paciente' : 'Registrar Paciente'}
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
        footer={[
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>,
            <Button type="primary" htmlType="submit" form='register_patient_fisio'>
                Guardar {paciente && "cambios"}
            </Button>
        ]}
    >
        {/* ISFisio? */}
        <RegisterFisioForm paciente={paciente} setAdding={setIsModalOpen} getPacientesData={getPacientesData} />
        {/* <RegisterFisio /> */}
    </Modal>

}