import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Modal, Form, Input, message } from 'antd';
import { API, sendDataBody, updateData, usuario } from '../../resources';
import { PlusOutlined, FormOutlined, PrinterOutlined } from '@ant-design/icons';
import RecetaDocument from './detalleRecetaForPrint';
const { TextArea } = Input;
//Los IDS de las recetas son tomados y enviados desde el expediente
// Estan siendo agregadas y actualizadas directamente al expediente desde el form de detallenota->Agregar Receta
export default function DetalleReceta(props) {

    const [recetaData, setRecetaData] = useState([]);
    const [recetaLoading, setRecetaLoading] = useState(true);
    const [recetaForEdit, setRecetaForEdit] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal For Add REcipe
    const [isEditingModalVisible, setIsEditingModalVisible] = useState(false); // Modal For Edit Recipe
    const [isPrintingModalVisible, setIsPrintingModalVisible] = useState(false)

    // Add Recipe Modal
    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };
    // Edit Recipe Modal
    const showEditModal = () => { console.log('BeforeEdit'); setIsEditingModalVisible(true); };
    const handleEditOk = () => { setIsEditingModalVisible(false); };
    const handleEditCancel = () => { setIsEditingModalVisible(false); };
    // Print Receta Modal
    const showPrintModal = () => { setIsPrintingModalVisible(true); };
    const handlePrintOk = () => { setIsPrintingModalVisible(false); setIsLogoSelected(false)};
    const handlePrintCancel = () => { setIsPrintingModalVisible(false);setIsLogoSelected(false)};
    // Select logo for print in receta. Switches the modal view into select logo hospital/pdf recipe for print
    const [logoHospital, setLogoHospital] = useState(null)
    const [isLogoSelected, setIsLogoSelected] = useState(false)

    useEffect(() => {
        props.recetas ?
            getRecetasData()
            :
            finifhGet()
    }, [props.recetas])

    const getRecetasData = () => {
        sendDataBody('recetas/getMany', { 'ids': props.recetas }).then((response) => {
            setRecetaData(response);
            setRecetaLoading(false)
        })
        // fetch(API + 'recetas/getMany', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ 'ids': props.recetas })
        // }).then(res => res.json())
        //     .then(response => {
        //         // console.log('Recetas Received:', response);
        //         setRecetaData(response);
        //         setRecetaLoading(false)
        //     })
        //     .catch(error => console.error('Error:', error))
    }

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

    // Set Edit Receta and open modal
    const editReceta = (r) => {
        setRecetaForEdit(r)
        console.log(r);
        showEditModal();
    }
    // Send data for update Receta
    const updateReceta = (values) => {
        console.log('update', values);
        updateData(`recetas/update/${recetaForEdit._id}`, values).then((rs) => {
            // message.success(rs);
            setIsEditingModalVisible(false)
            getRecetasData()
        })
    }
    // Print Receta
    const printReceta = async (r) => {
        await setRecetaForEdit(r)
        setIsPrintingModalVisible(true)
        console.log(r);
    }


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
            
            {
                recetaLoading ? <h5>Cargando Receta...</h5> :
                    recetaData.length > 0 ?

                        recetaData.map((r) => {
                            return <><Card.Grid key={r._id} style={gridStyle}>
                                <p style={{ whiteSpace: 'pre' }}> Prescripcion : {r.prescripcion} </p>
                                <Button style={{ marginLeft: 8 }} onClick={() => editReceta(r)} size='small' type="primary" shape="circle" icon={<FormOutlined />} />
                                <Button style={{ marginLeft: 8 }} onClick={() => printReceta(r)} size='small' type="primary" shape="circle" icon={<PrinterOutlined />} />
                            </Card.Grid></>
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
            ]}>
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

        <Modal title="Editar Receta" visible={isEditingModalVisible} onOk={handleEditOk} onCancel={handleEditCancel} destroyOnClose
            footer={[
                <Button type="primary" htmlType="submit" form='update_receta_medic'>
                    Actualizar
                </Button>,
                <Button onClick={handleEditCancel}>Cancelar</Button>
            ]}>
            {
                Object.keys(recetaForEdit).map((k) => {
                    return <p>{k} : {recetaForEdit[k]}</p>
                })
            }
            <Form
                name="update_receta_medic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ prescripcion: recetaForEdit.prescripcion }}
                onFinish={updateReceta}
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

        <Modal title="Imprimir Receta" visible={isPrintingModalVisible} onOk={handlePrintOk} onCancel={handlePrintCancel} width={600}>
            {
                isLogoSelected ? // Si ya hay logo seleccionado, se pasa a la receta y se muestra en pdf
                    <RecetaDocument receta={recetaForEdit} logoHospital={logoHospital} />
                    :
                    <div>
                        <Card title='Selecciona un hospital' bordered={false}>
                            {
                                usuario.horarios.map((h) => {
                                    return <Card.Grid style={{ width: '100%' }} onClick={() => {setLogoHospital(h.sucursal.logo); setIsLogoSelected(true)}}>
                                        <Row align="middle">
                                            <Col span={6} offset={4}><img width={64} src={'https://api.recreamed.com/images/' + h.sucursal.logo} alt="Logo" /></Col>
                                            <Col span={10}>{h.sucursal.nombre} <br /> {h.horario}</Col>
                                        </Row>
                                    </Card.Grid>
                                })
                            }
                        </Card>
                    </div>
            }
        </Modal>
    </div>
}
