import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, Form, Input, Row, Col } from 'antd'
import { PlusOutlined, FormOutlined, PrinterOutlined } from '@ant-design/icons';
import { getData, sendDataBody, updateData, usuario } from '../../resources'
import RecetaDocument from '../expedientes/detalleRecetaForPrint';
const { TextArea } = Input;


export default function FDetalleReceta({ id_nota, paciente }) {
    const [recetasData, setRecetasData] = useState(null)
    const [recetaLoading, setRecetaLoading] = useState(true)
    const [recetaForEdit, setRecetaForEdit] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal For Add REcipe
    const [isEditingModalVisible, setIsEditingModalVisible] = useState(false); // Modal For Edit Recipe
    const [isPrintingModalVisible, setIsPrintingModalVisible] = useState(false)

    // Add Recipe Modal
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };
    // Edit Recipe Modal
    const showEditModal = () => { console.log('BeforeEdit'); setIsEditingModalVisible(true); };
    const handleEditOk = () => { setIsEditingModalVisible(false); };
    const handleEditCancel = () => { setIsEditingModalVisible(false); };
    // Print Receta Modal
    const handlePrintOk = () => { setIsPrintingModalVisible(false); setIsLogoSelected(false) };
    const handlePrintCancel = () => { setIsPrintingModalVisible(false); setIsLogoSelected(false) };
    // Select logo for print in receta. Switches the modal view into select logo hospital/pdf recipe for print
    const [logoHospital, setLogoHospital] = useState(null)
    const [nombreHospital, setNombreHospital] = useState(null)
    const [isLogoSelected, setIsLogoSelected] = useState(false)

    useEffect(() => {
        getRecetasData()
    }, [])

    const getRecetasData = () => {
        getData(`recetas/nota/${id_nota}`).then(rs => { setRecetasData(rs); setRecetaLoading(false) })
    }

    //Send and save new receta, agter getRecetas again
    const onFinish = (values) => {
        values.id_nota = id_nota;
        sendDataBody('recetas/add', values).then(rs => {
            getRecetasData()
            setIsModalVisible(false)
        })
    }

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
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // Print Receta
    const printReceta = async (r) => {
        setRecetaForEdit(r)
        setIsPrintingModalVisible(true)
        console.log(r);
    }
    return <div>
        <Card style={{ marginTop: 8 }}>
            <div className='fila' style={{ marginBottom: 8 }}>
                <h6>Recetas</h6>
                <Button className='btnIconCentered' onClick={() => setIsModalVisible(true)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
            </div>
            {
                recetaLoading ? <h5>Cargando Receta...</h5> :
                    recetasData.length > 0 ?

                        recetasData.map((r) => {
                            return <div key={r._id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ whiteSpace: 'pre' }}>{r.prescripcion} </span>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                                    <Button style={{ marginLeft: 6 }} onClick={() => editReceta(r)} size='small' type="primary" shape="circle" icon={<FormOutlined />} className='btnIconCentered' ghost />

                                    <Button style={{ marginLeft: 4 }} onClick={() => printReceta(r)} size='small' type="primary" shape="circle" icon={<PrinterOutlined />} className='btnIconCentered' ghost />
                                </div>
                            </div>
                        })
                        :
                        <h6>No hay una receta asignada</h6>
            }
        </Card >

        {/* Redundant from recetas PSIQ */}
        < Modal title="Nueva Receta" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            footer={
                [
                    <Button type="primary" htmlType="submit" form='create_receta_medic'>
                        Guardar
                    </Button>,
                    <Button onClick={handleCancel}>Cancelar</Button>
                ]} >
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
                    <TextArea rows={6} autoFocus />
                </Form.Item>

            </Form>
        </Modal >

        <Modal title="Editar Receta" open={isEditingModalVisible} onOk={handleEditOk} onCancel={handleEditCancel} destroyOnClose
            footer={[
                <Button type="primary" htmlType="submit" form='update_receta_medic'>
                    Actualizar
                </Button>,
            ]}>

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
                    <TextArea rows={6} />
                </Form.Item>

            </Form>
        </Modal>

        <Modal title="Imprimir Receta" open={isPrintingModalVisible} onOk={handlePrintOk} onCancel={handlePrintCancel} width={600}
            footer={[
                <Button onClick={handlePrintCancel}>Cancelar</Button>
            ]}
        >

            {
                isLogoSelected ? // Si ya hay logo seleccionado, se pasa a la receta y se muestra en pdf
                    <RecetaDocument receta={recetaForEdit} logoHospital={logoHospital} nombreHospital={nombreHospital} paciente={paciente} /> // receta document is legacy from PSIQ
                    :
                    <div>
                        <Card title='Selecciona un hospital' bordered={false}>
                            {
                                usuario.horarios.map((h) => {
                                    return <Card.Grid style={{ width: '100%' }} onClick={() => { console.log(h.sucursal); setLogoHospital(h.sucursal.logo); setNombreHospital(h.sucursal.nombre); setIsLogoSelected(true) }} key={h._id}>
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
    </div >
}
