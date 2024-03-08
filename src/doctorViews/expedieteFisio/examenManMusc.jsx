import React, { useState } from 'react'
import { InputNumber, Table, Modal, Button, Form, Input, Radio, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { updateData } from '../../resources';

export default function ExamenManMusc({ id_expediente, examenes, getExpedienteData }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'grupo',
            dataIndex: 'grupo',
            key: 'grupo',
        },
        {
            title: 'referencia',
            dataIndex: 'referencia',
            key: 'referencia',
        },
        {
            title: 'dolor',
            dataIndex: 'dolor',
            key: 'dolor',
            render: (dolor) => <span>{dolor ? 'Si' : 'No'}</span>
        },
        {
            title: 'dinamometro',
            dataIndex: 'dinamometro',
            key: 'dinamometro',
        },
    ];

    const AddExamenform = () => {

        const onFinish = (values) => {
            console.log('new Data', values)
            const newExamenes = [...examenes, values]
            console.log('allNewData ', newExamenes)
            updateData(`fexpedientes/update/${id_expediente}`, { examenes: newExamenes }).then((rs) => {
                if (rs.message && rs.message === 'Datos actualizados correctamente') {
                    getExpedienteData()
                    setIsModalOpen(false)
                } else message.error(rs.error)
            })
        }
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return <Form
            name="add_examen_man_musc_medic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label='grupo'
                name='grupo'
                rules={[{ required: true, message: 'Missing grupo' }]}
            >
                <Input placeholder="grupo" />
            </Form.Item>
            <Form.Item
                label='referencia'
                name='referencia'
                rules={[{ required: true, message: 'Missing referencia' }]}
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label='dolor'
                name='dolor'
                rules={[{ required: true, message: 'Missing dolor' }]}
            >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label='dinamometro'
                name='dinamometro'
                rules={[{ required: true, message: 'Missing dinamometro' }]}
            >
                <Input placeholder="dinamometro" />
            </Form.Item>

        </Form>
    }

    return <div>

        <Table columns={columns} dataSource={examenes} size='small' bordered pagination={false} title={() => <span className='desc' style={{ display: 'flex', alignContent: 'center',gap: 6 }}>Examen manual muscular  <PlusCircleOutlined onClick={showModal} /></span>}  />
      

        <Modal title='Agregar examen manual muscular' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <Button>Cancelar</Button>,
                <Button type='primary' htmlType='submit' form='add_examen_man_musc_medic'>Guardar</Button>
            ]}
        >
            <AddExamenform />
        </Modal>
    </div>

}