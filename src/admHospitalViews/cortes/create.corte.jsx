import React from 'react'
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

import { getData, sendDataBody, usuario, ids_hospitales } from '../../resources'


export default function CreateCorte({ isModalOpen, handleOk, handleCancel, onFinish }) {
    // const onFinish = (values) => {
    //     const newCorte = {
    //         // medico: medico,
    //         medico: usuario._id,
    //         fecha_inicio: cortesData.length === 0 ? new Date() : cortesData.at(0).fecha_cierre,
    //         fecha_cierre: new Date(),
    //         comentario: ''
    //     }
    //     console.log('ready to send ', newCorte)
    //     sendDataBody('cortes/add', newCorte).then((rs) => {
    //         console.log(rs);
    //         getCortesData(medico)
    //     })
    // };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <Modal title="Generar Corte" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ fecha_cierre: dayjs(new Date()) }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Comentario"
                name="comentario"
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
                <DatePicker defaultValue={dayjs()} />
            </Form.Item>

        </Form>
    </Modal>
}
