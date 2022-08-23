import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Space, Modal, Form, Input, message } from 'antd';
import { API } from '../../resources';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
const { TextArea } = Input;
//Los IDS de las recetas son tomados y enviados desde el expediente
// Estan siendo agregadas y actualizadas directamente al expediente desde el form de detallenota->Agregar Receta
export default function DetalleReceta(props) {

    const [recetaData, setRecetaData] = useState([])
    const [recetaLoading, setRecetaLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        props.recetas ?
            fetch(API + 'recetas/getMany', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'ids': props.recetas })
            }).then(res => res.json())
                .then(response => {
                    // console.log('Recetas Received:', response);
                    setRecetaData(response);
                    setRecetaLoading(false)
                })
                .catch(error => console.error('Error:', error))
            :
            finifhGet()

    }, [props.recetas])

    const finifhGet = () => { setRecetaData([]); setRecetaLoading(false); }

    // New Receta
    const onFinish = async (values) => {
        values.id_nota = props.id_nota;
        console.log('new Receta:', values);
        console.log('new Recetas:', values);

        const newReceta = await fetch(API + 'recetas/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', response);
                message.info(response.message || response.error)
                response.message === 'Receta creada correctamente' ? setIsModalVisible(false) : console.log(response.error);
                return response;
            })
            .catch(error => console.error('Error:', error))

        props.recetas.push(newReceta.id_receta)
        console.log('New Recetas: ', props.recetas);

        // Update nota.recetas
        fetch(API + 'notas/updateRecetas/' + props.id_nota, {
            method: 'PUT',
            body: JSON.stringify({ "recetas": props.recetas }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                console.log('Update Exp:', response);
                message.success(response.message || response.error);
            })
            .catch(error => console.error('Error:', error))

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // End of Form


    const gridStyle = {
        width: '100%',
        height: '32',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return <div>
        <Card bordered={false} title={<>Recetas <Button onClick={() => setIsModalVisible(true)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} /></>} >
            {/* <Space>
                <h5>Recetas </h5>
                
            </Space> */}
            {
                recetaLoading ? <h5>Cargando Receta...</h5> :
                    recetaData.length > 0 ?

                        recetaData.map((r) => {
                            return <><Card.Grid key={r._id} style={gridStyle}> <p style={{ whiteSpace: 'pre' }}> Prescripcion : {r.prescripcion} </p> <Button style={{ marginLeft: 8 }} onClick={() => setEditing(true)} size='small' type="primary" shape="circle" icon={<FormOutlined />} /></Card.Grid></>
                        })
                        :
                        <h6>No hay una receta asignada</h6>
            }
        </Card>

        <Modal title="Nueva Receta" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <Button type="primary" htmlType="submit" form='create_receta_medic'>
                    Guardar
                </Button>,
                <Button onClick={handleCancel}>Cancelar</Button>
            ]}
        >
            {/* <p>Nota: {notaData._id}</p> */}
            <Form
                name="create_receta_medic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Prescripcion"
                    name="prescripcion"
                    rules={[{ required: true, message: 'Ingresa la prescripcion' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

            </Form>
        </Modal>
    </div>
}
