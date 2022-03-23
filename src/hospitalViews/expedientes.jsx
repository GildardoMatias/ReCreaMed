import React,{useState} from 'react';
import { Table, Row, Col, Button, Modal, Form, Input } from 'antd';


export function Expedientes() {
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
    const dataSource = [
        {
            key: '1',
            Paciente: 'Mike',
            historiaClinica: 'historial',
            notasMedicas: 'Notas del paciente',
            receta: 'Paracetamol cada 20 minutos',
        },
        {
            key: '2',
            Paciente: 'John Doe',
            historiaClinica: 'historial',
            notasMedicas: 'Notas del paciente',
            receta: 'Bicarbonato de sodio',
        },
        {
            key: '3',
            Paciente: 'Jane Dioe',
            historiaClinica: 'historial',
            notasMedicas: 'Notas del paciente',
            receta: 'Cloruro de sodio',
        },
    ];

    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'Paciente',
            key: 'Paciente',
        },
        {
            title: 'Historia Clinica',
            dataIndex: 'historiaClinica',
            key: 'historiaClinica',
            render: text => <a href='/historial_clinico'>{text}</a>,
        },
        {
            title: 'Notas Medicas',
            dataIndex: 'notasMedicas',
            key: 'notasMedicas',
            render: text => <a href='/notas'>{text}</a>,

        },
        {
            title: 'Receta', 
            dataIndex: 'receta',
            key: 'receta', 
        }
    ];

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return <div className="mainContainer">
        <Row>
            <Col span={8}><h4>Expedientes</h4></Col>
            {/* <Col>
                <Button type="primary" onClick={showModal}>
                    Nuevo expediente
                </Button>
            </Col> */}
        </Row>
        <br />

        <Table dataSource={dataSource} columns={columns} />

        <Modal title="Nuevo expediente" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                <Form.Item label="Paciente" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Historia Clinica" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Notas Medicas" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Receta" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
      </Modal>
    </div>;
}
