import React, { useState } from 'react'
import { Form, Input, Button, message, Select, Upload, Space } from 'antd';
import { API, usuario } from '../../resources';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { diagnosticos } from '../../assets/diagnosticos2';
const { Option, OptGroup } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const handleChange = (value) => {
    // Select diagnostic
    console.log(`selected ${value}`);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


//List of Estudios styles
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



export function NuevaNota(props) {
    const [estudiosFiles, setEstudiosFiles] = useState([])

    // useEffect(() => {
    //     console.log(diagnosticos)
    //     Object.keys(diagnosticos).forEach((k) => {
    //         console.log("Title: ", k);
    //         Object.keys(diagnosticos[k]).forEach((sk) => {
    //             console.log(sk, diagnosticos[k][sk])
    //         })
    //     })
    // }, [])

    // const [pacientesData, setPacientesData] = useState([]);
    const onFinishTest = (values) => {
        // Create Nota
        values.id_medico = usuario._id;
        values.id_usuario = props.paciente;
        values.recetas = [];
        values.estudios = estudiosFiles;

        console.log('Estudios ready to send: ', values.estudios)
        console.log('ready to send: ', values)
    }
    const onFinish = async (values) => {
        // Create Nota
        values.id_medico = usuario._id;
        values.id_usuario = props.paciente;
        values.recetas = [];
        values.estudios = estudiosFiles;
        console.log('ready To send: ', values)
        const newNota = await fetch(API + 'notas/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                message.success(response.message || response.error);
                // response.message && response.message === ''
                return response;
            })
            .catch(error => console.error('Error:', error))

        // Add new nota to received notas
        props.prevExpNotas.push(newNota.id_nota)
        //Update nota at expedient
        fetch(API + 'expedientes/updateNotas/' + props.id_expediente, {
            method: 'PUT',
            body: JSON.stringify({ "notas": props.prevExpNotas }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                console.log('Update Exp:', response);
                message.success(response.message || response.error);
            })
            .catch(error => console.error('Error:', error))
    };

    // Upload File
    const dragDropProps = {
        name: 'file',
        multiple: true,
        action: API + 'notas/estudios/upload', // Production

        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log('New Files: ', info.file.response.file)
                setEstudiosFiles([...estudiosFiles, info.file.response.file])
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    // Get value Of upload
    const getFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file.response.file;
    };

    return (
        <div>
            <h4 style={{ marginLeft: 20 }}>Detalles de la nota</h4>
            {/* <p>Expediente received: {props.id_expediente}</p>
            <p>Paciente received: {props.paciente}</p>
            <p>Medico received: {usuario._id}</p>
            <p>prevExpNotas received: {props.prevExpNotas}</p>
            *La nota lleva el id del medico, obtenido de la sesion */}
            {/* <p>Diag [0].clasificacion {diagnosticos[0]['clasificacion']}</p> */}

            <br />
            <Dragger {...dragDropProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Arrastra los archivos de estudio aquí, o da click para buscar</p>
                <p className="ant-upload-hint">
                    Selecciona archivos en pdf o imagen que sean menores a 2 MB para poder subirlos
                </p>
            </Dragger>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} initialValues={{ remember: true, estudios: [] }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" style={{ marginTop: 12 }} >

                <Form.Item label="Edad" name="edad" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Talla" name="talla" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Peso" name="peso" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="IMC" name="imc" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Temperatura" name="temperatura" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Presion Arterial" name="presion_arterial" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia Cariaca" name="frecuencia_cardiaca" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia respiratoria" name="frecuencia_respiratoria" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>

                {/* <Form.Item label="Estudios" name="estudios" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item> */}

                {/* 
                <Form.List
                    name="estudios"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('Ingresa al menos un estudio'));
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
                                    label={index === 0 ? 'Estudio' : ''}
                                    required={false}
                                    key={field.key}
                                    getValueFromEvent={getFile}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Ingresa estudios",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Upload {...UploadProps}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
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
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{
                                        // width: '100%',
                                        position: 'relative',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Agregar Estudios
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
 */}

                <Form.Item label="Observaciones" name="Observaciones" rules={[{ required: true, message: 'Ingresa Observaciones' }]} >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Diagnostico" name="diagnostico" rules={[{ required: true, message: 'Selecciona Diagnostico' }]} >
                    <Select
                        showSearch
                        style={{ width: 400 }}
                        onChange={handleChange}
                    >
                        {
                            Object.keys(diagnosticos).map((k) => {
                                return <OptGroup label={k}>
                                    {Object.keys(diagnosticos[k]).map((sk) => {
                                        return <Option value={sk}>{diagnosticos[k][sk]}</Option>
                                    })}
                                </OptGroup>

                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space>
                        <Button onClick={() => props.setIsModalVisible(false)}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Space>

                </Form.Item>
            </Form>
        </div>
    )
}
