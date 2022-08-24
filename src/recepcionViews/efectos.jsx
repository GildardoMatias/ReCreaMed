import React, { useState, useEffect } from 'react'
import { catalogo_efectos, desrealizacion, despersonalizacion, amnesia } from './efects_catalog'
import { Form, Switch, Button, Radio, Space, Slider, Select } from 'antd'
import { getData } from '../resources'
const { Option } = Select;

export default function Efectos() {
  const [misPacientes, setMisPacientes] = useState([])

  useEffect(() => {
    getData(`users_by_rol/Paciente`).then(rs => { setMisPacientes(rs); console.log(rs); })
  }, [])
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const marks = { 0: '0', 10: '10' };
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
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
        initialValues={{ ...catalogo_efectos, ketamina: 0, ketaminaiv: 0, ketaminaivb: 0 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]} >
          <Select
            onChange={handleChange}
          >
            {
              misPacientes.map((p) => {
                return <Option value={p._id}>{p.name}</Option>
              })
            }
          </Select>
        </Form.Item>

        {
          Object.keys(catalogo_efectos).map((efk) => {
            return <Form.Item
              label={efk}
              name={efk}
              rules={[{ required: true, message: 'Selecciona una respuesta' }]}
            >
              <Switch checkedChildren="Si" unCheckedChildren="No" />
            </Form.Item>
          })
        }

        <h5>Desrealizacion</h5>
        {
          Object.keys(desrealizacion).map((pr) => {
            return <Form.Item
              label={pr}
              name={pr}
              rules={[{ required: true, message: 'Selecciona una respuesta' }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    desrealizacion[pr].map((rs) => <Radio value={rs}>{rs}</Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          })
        }


        <h5>Despersonalizacion</h5>
        {
          Object.keys(despersonalizacion).map((pr) => {
            return <Form.Item
              label={pr}
              name={pr}
              rules={[{ required: true, message: 'Selecciona una respuesta' }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    despersonalizacion[pr].map((rs) => <Radio value={rs}>{rs}</Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          })
        }

        <h5>Amnesia</h5>
        {
          Object.keys(amnesia).map((pr) => {
            return <Form.Item
              label={pr}
              name={pr}
              rules={[{ required: true, message: 'Selecciona una respuesta' }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    amnesia[pr].map((rs) => <Radio value={rs}>{rs}</Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          })
        }

        <Form.Item
          label="a)	En general mi gusto por la ketamina IV es:"
          name="ketamina"

        // rules={[{ required: true, message: 'Selecciona una opcion' }]}
        >
          <Slider min={0} max={10} marks={marks} dots defaultValue={0} />
        </Form.Item>

        <Form.Item
          label="a.)	En general, cuánto anhela, apetece el tratamiento de la ketamina IV para otros efectos además de los efectos antidepresivos? "
          name="ketaminaiv"
        // rules={[{ required: true, message: 'Selecciona una opcion' }]}
        >
          <Slider min={0} max={10} marks={marks} dots defaultValue='0' />
        </Form.Item>

        <Form.Item
          label="b.)	Cuánto desea usar la ketamina IV en cantidades mayores con más frecuencia de lo que su psiquiatra le esta prescribiendo por razones distintas a esperar más efecto antidepresivo?  "
          name="ketaminaivb"
        // rules={[{ required: true, message: 'Selecciona una opcion' }]}
        >
          <Slider min={0} max={10} marks={marks} dots />
        </Form.Item>

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
