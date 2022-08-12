import React, { useState } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col } from 'antd'
import { catalogo_sintomatologia, catalogo_sintomatologia2, disminucion_apetito, perdida_peso, aumento_apetito, aumento_peso } from './sintomatologia_catalog'
import { Card } from 'react-bootstrap'

export default function Sintomatologia() {
  const [pesoEnabled, setPesoEnabled] = useState(false)
  const [apetitoEnabled, setApetitoEnabled] = useState(false)
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <h4>Sintomatologia</h4>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        {
          Object.keys(catalogo_sintomatologia).map((sk) => {
            return <Form.Item
              label={sk}
              name={sk}
              rules={[{ required: true, message: `Selecciona una opcion` }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    catalogo_sintomatologia[sk].map((s) => <Radio value={s}> {s} </Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          })
        }

        {/*Apetito*/}
        <Card>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
            Disminucion apetito <Switch onChange={() => setApetitoEnabled(!apetitoEnabled)} /> Aumento Apetito
          </Form.Item>
          <Row>
            <Col span={10}>
              <Form.Item
                label='Disminucion Apetito'
                name='disminucion_apetito'
                rules={[{ required: !apetitoEnabled, message: `Selecciona una opcion` }]}
              >
                <Radio.Group disabled={apetitoEnabled}>
                  <Space direction="vertical">
                    {
                      disminucion_apetito.map((s) => <Radio value={s}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label='Aumento Apetito'
                name='aumento_apetito'
                rules={[{ required: apetitoEnabled, message: `Selecciona una opcion` }]}
              >

                <Radio.Group disabled={!apetitoEnabled}>
                  <Space direction="vertical">
                    {
                      aumento_apetito.map((s) => <Radio value={s}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>



        {/* Peso */}
        <Card>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
            Disminucion de Peso <Switch onChange={() => setPesoEnabled(!pesoEnabled)} /> Aumento de Peso
          </Form.Item>
          <Row>
            <Col span={10}>
              <Form.Item
                label='Perdida de Peso'
                name='perdida_peso'
                rules={[{ required: !pesoEnabled, message: `Selecciona una opcion` }]}
              >
                <Radio.Group disabled={pesoEnabled}>
                  <Space direction="vertical">
                    {
                      perdida_peso.map((s) => <Radio value={s}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            
            <Col>
              <Form.Item
                label='Aumento Peso'
                name='aumento_peso'
                rules={[{ required: pesoEnabled, message: `Selecciona una opcion` }]}
              >

                <Radio.Group disabled={!pesoEnabled}>
                  <Space direction="vertical">
                    {
                      aumento_peso.map((s) => <Radio value={s}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <br />



        {
          Object.keys(catalogo_sintomatologia2).map((sk) => {
            return <Form.Item
              label={sk}
              name={sk}
              rules={[{ required: true, message: `Selecciona una opcion` }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    catalogo_sintomatologia2[sk].map((s) => <Radio value={s}> {s} </Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          })
        }



        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
