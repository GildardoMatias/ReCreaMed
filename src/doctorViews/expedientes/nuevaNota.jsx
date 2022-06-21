import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { API, usuario } from '../../resources';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


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
    // const [pacientesData, setPacientesData] = useState([]);

    const onFinish = async (values) => {
        // Create Nota
        values.id_medico = usuario._id;
        values.id_usuario = props.paciente;
        values.recetas = [];
        const newNota = await fetch(API + 'notas/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                message.success(response.message || response.error);
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

    // function getPacientes() {
    //     fetch(API + 'mispacientes/' + usuario._id)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setPacientesData(data);
    //         });
    // }

    return (
        <div>
            <h4 style={{ marginLeft: 20 }}>Detalles de la nota</h4>
            <p>Expediente received: {props.id_expediente}</p>
            <p>Paciente received: {props.paciente}</p>
            <p>Medico received: {usuario._id}</p>
            <p>prevExpNotas received: {props.prevExpNotas}</p>
            *La nota lleva el id del medico, obtenido de la sesion
            <br />
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true, estudios: [] }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >

                <Form.Item label="Edad" name="edad" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Talla" name="talla" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Peso" name="peso" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="IMC" name="imc" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Temperatura" name="temperatura" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Presion Arterial" name="presion_arterial" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia Cariaca" name="frecuencia_cardiaca" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Frecuencia respiratoria" name="frecuencia_respiratoria" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>

                {/* <Form.Item label="Estudios" name="estudios" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item> */}
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
                                        <Input
                                            placeholder="Detalles del estudio"
                                            style={{ width: '60%' }}
                                        />
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

                <Form.Item label="Observaciones" name="Observaciones" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
