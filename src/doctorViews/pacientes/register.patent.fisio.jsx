import React from 'react'
import { Button, Select, Form, Input, InputNumber, Divider } from 'antd';
const { Option } = Select;
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function RegisterFisio() {
    return <Form
        name="basic"
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
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item label="Nombre y Apellidos" name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item name="sexo" label="sexo" rules={[{ required: false, message: 'Selecciona una opcion' }]}>
            <Select placeholder="Elije el sexo" >
                <Option value="H">H</Option>
                <Option value="M">M</Option>
                <Option value="Otro">Otro</Option>
            </Select>
        </Form.Item>

        <Form.Item name="edad" label="Edad" rules={[{ required: false, message: 'Ingresa edad' }]} >
            <InputNumber min={1} max={120} />
        </Form.Item>

        <Form.Item label="nacionalidad" name="nacionalidad"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="telefono"
            label="Telefono"
            rules={[{ required: true, message: 'Ingresa tu numero de telefono' }]}
        >
            <InputNumber
                // addonBefore={prefixSelector}
                style={{ width: '100%' }}
            />
        </Form.Item>

        <Form.Item name="estado_civil" label="Estado Civil" rules={[{ required: false, message: 'Ingresa estado civil' }]} >
            <Select placeholder="Elije el estado civil" >
                <Option value="Soltero">Soltero</Option>
                <Option value="Casado">Casado</Option>
                <Option value="Divorciado">Divorciado</Option>
                <Option value="Separación en proceso judicial">Separación en proceso judicial</Option>
                <Option value="Viudo">Viudo</Option>
                <Option value="Concubinato">Concubinato</Option>
            </Select>
        </Form.Item>

        <Form.Item name="ocupacion" label="Ocupacion" rules={[{ required: false, message: 'Ingresa ocupacion' }]} >
            <Input />
        </Form.Item>

        <Divider >Antecedentes Personales</Divider>

        <Form.Item name="drogas" label="Padece usted alguna enfermedad?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
            <Select placeholder="Elije una opcion" >
                <Option value="Antes">Si</Option>
                <Option value="Ahora">No</Option>
            </Select>
        </Form.Item>

        <Form.Item name="med" label="Toma algún medcamento?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
            <Select placeholder="Elije una opcion" >
                <Option value="Antes">Si</Option>
                <Option value="Ahora">No</Option>
            </Select>
        </Form.Item>

        <Form.Item name="qur" label="Ha sdo intervendo quirurgicamente?" rules={[{ required: false, message: 'Selecciona una opcion' }]} >
            <Select placeholder="Elije una opcion" >
                <Option value="Antes">Si</Option>
                <Option value="Ahora">No</Option>
            </Select>
        </Form.Item>




    </Form>
}