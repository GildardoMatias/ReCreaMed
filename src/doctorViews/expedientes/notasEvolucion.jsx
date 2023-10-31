import React, { useState, useEffect } from 'react'
import { Card, Button, Tabs, Row, Col, Modal, Space, Typography, message, Upload, Input, Select, Form, Divider, InputNumber } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { updateData, usuario, API } from '../../resources';
const { TextArea } = Input;

// estudios will be to notas/estudios/upload
// foto will be to images/upload

const numbers = ['Primera', 'Segunda', 'Tercera']

export default function NotasEvolucion({ _notas_evolucion, id_nota }) {

    const [newEstudio, setNewEstudio] = useState(null) //initially on database eill be [], onFinish or on Edit will insert this
    const [evoImage, setEvoImage] = useState(null)

    const [evoForEdit, setEvoForEdit] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true); };
    const handleOk = () => { setIsModalOpen(false); setEvoForEdit(null) };
    const handleCancel = () => { setIsModalOpen(false); setEvoForEdit(null) };

    const onFinish = (values) => {

        if (newEstudio) values.estudios = [newEstudio];

        // console.log('Prev notas:', _notas_evolucion);
        console.log('Received values of form:', values);
        _notas_evolucion.push(values)
        console.log('After notas:', _notas_evolucion);
        updateData(`notas/update/${id_nota}`, { notas_evolucion: _notas_evolucion }).then((rs) => {
            console.log(rs)
            setIsModalOpen(false)
        })
    };

    const onFinishEdit = (values) => {

        // add estudios and images
        evoForEdit.estudios.push(newEstudio)


        // Encuentra el índice del objeto a actualizar en el array
        const indexToUpdate = _notas_evolucion.findIndex(item => item._id === evoForEdit._id);

        if (indexToUpdate !== -1) {
            // Actualiza el objeto con los nuevos datos
            _notas_evolucion[indexToUpdate] = values;

            console.log("Elemento actualizado:", _notas_evolucion[indexToUpdate]);
            updateData(`notas/update/${id_nota}`, { notas_evolucion: _notas_evolucion }).then((rs) => {

                setIsModalOpen(false)
            })
        } else {
            console.log("No se encontró el elemento con el ID proporcionado.");
        }
    }

    const uploadEstudiosProps = {
        name: 'file',
        action: API + 'notas/estudios/upload',
        multiple: true,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log('New Files: ', info.file.response.file)
                // setEstudiosFiles([...estudiosFiles, info.file.response.file])
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return <div>
        {(_notas_evolucion && _notas_evolucion.length) > 0 ?
            _notas_evolucion.map((nota_evo) => {
                console.log('showing ', nota_evo)
                return <Card title={`Nota de evolución \t\tcreada el: ${new Date(nota_evo.createdAt).toLocaleDateString()}\t\tActualizada el ${new Date(nota_evo.createdAt).toLocaleDateString()}`} size='small' style={{ marginBottom: 8 }} key={nota_evo._id}>



                    <Card size='small'>
                        <div className='fila' style={{ marginBottom: 8 }}>
                            <span className='desc'>Signos Vitales</span>
                        </div>

                        <div className='fila'>

                            <div><span className='desc'>Temperatura: </span>{nota_evo.temperatura}°</div>
                            <div><span className='desc'>Frecuencia Respiratoria: </span>{nota_evo.frecuencia_respiratoria}</div>
                            <div><span className='desc'>Frecuencia Cardiaca: </span>{nota_evo.frecuencia_cardiaca}</div>
                            <div><span className='desc'>Presion Arterial: </span>{nota_evo.presion_arterial}</div>
                            <div><span className='desc'>Saturacion de Oxigeno: </span>{nota_evo.saturacion_oxigeno}</div>
                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button onClick={() => { setEvoForEdit(nota_evo); console.log('For edit ', nota_evo); showModal(); }} style={{ marginTop: 4 }} className='btnIconCentered' size='small' type="primary" shape="circle" icon={<EditOutlined />} ghost />
                        </div>
                    </Card>


                    <div style={{ marginTop: 8 }} >
                        <div className='fila' style={{ marginBottom: 8 }}>
                            <h6>S</h6> <Card size='small' style={{ width: '100%' }} className='textArea'>{nota_evo.s}</Card>
                        </div>
                        <div className='fila' style={{ marginBottom: 8 }}>
                            <h6>O</h6><Card size='small' style={{ width: '100%' }} className='textArea'>{nota_evo.o}</Card>
                        </div>
                        <div className='fila' style={{ marginBottom: 8 }}>
                            <h6>A</h6><Card size='small' style={{ width: '100%' }} className='textArea'>{nota_evo.a}</Card>
                        </div>
                        <div className='fila' style={{ marginBottom: 8 }}>
                            <h6>P</h6><Card size='small' style={{ width: '100%' }} className='textArea'>{nota_evo.p}</Card>
                        </div>
                    </div>

                    {/* <Button style={{ marginTop: 4 }} >Agregar</Button> */}

                </Card >
            })
            :
            <Card title='Sin notas de evolucion'>

            </Card>
        }
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button onClick={showModal} style={{ marginTop: 4 }} className='btnIconCentered' size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
        </div>


        <Modal title="Agregar Nota de Evolución" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
            footer={[
                <Button onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button type="primary" htmlType="submit" form='add_nota_evo_doc'>
                    Guardar
                </Button>
            ]}
        >

            {/* upload estudios and image */}
            <div className='fila'>

                <Upload {...uploadEstudiosProps}>
                    <Button icon={<UploadOutlined />}>Click para subir estudios</Button>
                </Upload>

                <Upload {...uploadEstudiosProps}>
                    <Button icon={<UploadOutlined />}>Click para subir fotos</Button>
                </Upload>

            </div>

            <br />

            <Form
                name="add_nota_evo_doc"
                onFinish={evoForEdit ? onFinishEdit : onFinish}
                // style={{maxWidth: 600}}
                autoComplete="off"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={evoForEdit || {}}
            >


                <Form.Item name='temperatura' label="Temperatura" rules={[{ required: false, message: 'Ingrese la temperatura' }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name='frecuencia_respiratoria' label="Frecuencia respiratoria" rules={[{ required: false, message: 'Ingrese la frecuencia respiratoria' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='frecuencia_cardiaca' label="Frecuencia cardiaca" rules={[{ required: false, message: 'Ingrese la frecuencia cardiaca' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='presion_arterial' label="Presion arterial" rules={[{ required: false, message: 'Ingrese la presión arterial' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='saturacion_oxigeno' label="Saturacion oxigeno" rules={[{ required: false, message: 'Ingrese la saturacion de oxigeno' }]}>
                    <Input />
                </Form.Item>


                {
                    usuario.rol === 'Medico' && <div>
                        <Form.Item label="S" name="s" rules={[{ required: false, message: 'Ingrese la respuesta' }]} >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="O" name="o" rules={[{ required: false, message: 'Ingrese la respuesta' }]} >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="A" name="a" rules={[{ required: false, message: 'Ingrese la respuesta' }]} >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="P" name="p" rules={[{ required: false, message: 'Ingrese la respuesta' }]} >
                            <Input.TextArea />
                        </Form.Item>
                    </div>
                }

                <Form.Item label="Estudios" rules={[{ required: false, message: 'Ingrese la saturacion de oxigeno' }]}>
                    <Button icon={<UploadOutlined />}>Click para seleccionar archivos</Button>
                </Form.Item>

                <Form.Item label="Foto" rules={[{ required: false, message: 'Ingrese la saturacion de oxigeno' }]}>
                    <Button icon={<UploadOutlined />}>Click para seleccionar fotos</Button>
                </Form.Item>
            </Form>
        </Modal>


    </div>
}
