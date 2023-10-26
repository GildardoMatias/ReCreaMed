import React from 'react'
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function CreateCorte({ isModalOpen, handleOk, handleCancel }) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
            <Button onClick={handleCancel}>
                Cancelar
            </Button>,
            <Button type="primary" htmlType="submit" form='create_corte_medic'>
                Guardar
            </Button>
        ]}
    >
        <Form
            name="create_corte_medic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                fecha_cierre: dayjs(new Date()),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Comentario"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
                label="Fecha Inicio"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <DatePicker />
            </Form.Item> */}

            <Form.Item
                label="Fecha Cierre"
                name="fecha_cierre"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <DatePicker defaultValue={dayjs()}/>
            </Form.Item>

        </Form>
    </Modal>
}
