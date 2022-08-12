import React from 'react'
import { catalogo_efectos } from './efects_catalog'
import { Form, Switch, Button } from 'antd'

export default function Efectos() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='mainContainer'>
      <h5>Efectos</h5>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={catalogo_efectos}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        {
          Object.keys(catalogo_efectos).map((efk) => {
            return <Form.Item
              label={efk}
              name={efk}
            >
              <Switch checkedChildren="Si" unCheckedChildren="No" />
            </Form.Item>
          })
        }

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
