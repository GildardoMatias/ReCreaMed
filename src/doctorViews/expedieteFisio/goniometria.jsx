import React, { useState } from 'react'
import { Button, Card, Table, Form, Input, Radio, InputNumber, Modal, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { updateData } from '../../resources';

export default function Goniometria({ id_expediente, goniometria, getExpedienteData }) {

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
            title: 'articulacion',
            dataIndex: 'articulacion',
            key: 'articulacion',
        },
        {
            title: 'movimiento',
            dataIndex: 'movimiento',
            key: 'movimiento',
        },
        {
            title: 'completa',
            dataIndex: 'completa',
            key: 'completa',
            render: (completa) => <span>{completa ? 'Si' : 'No'}</span>
        },
        {
            title: 'ayuda',
            dataIndex: 'ayuda',
            key: 'ayuda',
            render: (ayuda) => <span>{ayuda ? 'Si' : 'No'}</span>
        },
        {
            title: 'dolor',
            dataIndex: 'dolor',
            key: 'dolor',
            render: (dolor) => <span>{dolor ? 'Si' : 'No'}</span>
        },
        {
            title: 'grados',
            dataIndex: 'grados',
            key: 'grados',
        },
    ];

    const AddGoniometriaForm = () => {
        const onFinish = (values) => {
            console.log('new Data', values)
            const newGoniometria = [...goniometria, values]
            console.log('allData Data', newGoniometria)
            updateData(`fexpedientes/update/${id_expediente}`, { goniometria: newGoniometria }).then((rs) => {
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
            name="add_goniometria_medic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label='articulacion'
                name='articulacion'
                rules={[{ required: true, message: 'Missing first name' }]}
            >
                <Input placeholder="articulacion" />
            </Form.Item>

            <Form.Item
                label='movimiento'
                name='movimiento'
                rules={[{ required: true, message: 'Missing last name' }]}
            >
                <Input placeholder="movimiento" />
            </Form.Item>

            <Form.Item
                label='completa'
                name='completa'
                rules={[{ required: true, message: 'Missing first name' }]}
            >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label='ayuda'
                name='ayuda'
                rules={[{ required: true, message: 'Missing last name' }]}
            >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Necesita ayuda</Radio>
                    <Radio value={false}>Solo</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label='dolor'
                name='dolor'
                rules={[{ required: true, message: 'Missing first name' }]}
            >
                <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                    <Radio value={true}>Si</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label='grados'
                name='grados'
                rules={[{ required: true, message: 'Missing last name' }]}
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>

        </Form>
    }

    return <div >

        <Table dataSource={goniometria} columns={columns} size='small' bordered pagination={false} title={() => <span className='desc' style={{ display: 'flex', alignContent: 'center',gap: 6 }}>Rangos de movimiento/goniometria <PlusCircleOutlined onClick={showModal} /></span>} />

        <Modal title='Agregar Goniometria' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>,
                <Button type='primary' htmlType='submit' form='add_goniometria_medic'>Guardar</Button>
            ]}
        >
            <AddGoniometriaForm />
        </Modal>
    </div>

}
