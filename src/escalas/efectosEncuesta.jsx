import React, { useState, useEffect } from 'react'
import { catalogo_efectos, desrealizacion, despersonalizacion, amnesia } from './efects_catalog'
import { Form, Switch, Button, Radio, Space, Slider, Select, message } from 'antd'
import { getData, sendDataBody } from '../resources';
import logo from "../assets/Logo.png";
const { Option } = Select;

export default function EfectosEncuesta(props) {
  const [misPacientes, setMisPacientes] = useState([])
  const [encuestaNotExists, setEncuestaNotExists] = useState(null)
  const [checking, setChecking] = useState(true)
  const [pacienteData, setPacienteData] = useState({})
  const [medicoData, setMedicoData] = useState({})

  useEffect(() => {
    checkEncuesta()
  }, [])

  const checkEncuesta = () => {

    getData('getuser/' + props.idpaciente).then((rs) => { setPacienteData(rs) })
    getData('getuser/' + props.idmedico).then((rs) => { setMedicoData(rs) })


    getData(`encuestas/uuid/${props.token}`).then(rs => {
      console.log(rs);
      setEncuestaNotExists(rs.message === 'The survey does not exist')
    }).then(() => { setChecking(false); console.log('Not exists: ', encuestaNotExists); })
  }

  const onFinish = (values) => {

    Object.keys(values).forEach((k) => {
      const nk = k.replace(/ /g, "_")
      values[nk] = values[k];
      if (k.includes(' ')) delete values[k];
    })

    const body = {
      usuario: props.idpaciente,
      medico: props.idmedico,
      respuestas: values,
      tipo: 'efectos',
      uuid: props.token
    }

    console.log('Efectos Form:', values);
    sendDataBody('encuestas/add', body).then((rs) => {
      console.log(rs)
      message.success(rs.message)
    }).then(() => checkEncuesta())
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const marks = { 0: '0', 10: '10' };

  return (
    checking ? <div style={{ paddingTop: 180 }}>
      <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
        <h3 >Cargando</h3>

      </div>
    </div> :

      encuestaNotExists ?

        <div className='mainContainer'>
          <h4>Medico: {medicoData.name}</h4>
          <h4>Paciente: {pacienteData.name}</h4>
          <br />
          <h4>Lista de verificación para Efectos Secundarios  </h4>
          <Form
            name="efectos_form"
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

            {
              Object.keys(catalogo_efectos).map((efk, i) => {
                return <Form.Item
                  label={efk}
                  name={efk}
                  rules={[{ required: false, message: 'Selecciona una respuesta' }]}
                >
                  <Switch checkedChildren="Si" unCheckedChildren="No" defaultChecked={false} />
                </Form.Item>
              })
            }
            <h4>Escala de 6 elementos simplificada de síntomas disociativos administrada por el médico  (CADSS)</h4>

            <h5>Desrealizacion</h5>
            {
              Object.keys(desrealizacion).map((pr, index) => {
                return <Form.Item
                  label={pr}
                  name={'desrealizacion_' + index}
                  rules={[{ required: true, message: 'Selecciona una respuesta' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      {
                        desrealizacion[pr].map((rs, i) => <Radio value={i}>{rs}</Radio>)
                      }
                    </Space>
                  </Radio.Group>
                </Form.Item>
              })
            }


            <h5>Despersonalizacion</h5>
            {
              Object.keys(despersonalizacion).map((pr, index) => {
                return <Form.Item
                  label={pr}
                  name={'despersonalizacion_' + index}
                  rules={[{ required: true, message: 'Selecciona una respuesta' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      {
                        despersonalizacion[pr].map((rs, i) => <Radio value={i}>{rs}</Radio>)
                      }
                    </Space>
                  </Radio.Group>
                </Form.Item>
              })
            }

            <h5>Amnesia</h5>
            {
              Object.keys(amnesia).map((pr, i) => {
                return <Form.Item
                  label={pr}
                  name={'amnesia_' + i}
                  rules={[{ required: true, message: 'Selecciona una respuesta' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      {
                        amnesia[pr].map((rs, i) => <Radio value={i}>{rs}</Radio>)
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

        </div> : <div style={{ paddingTop: 180 }}>
          <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
            <h3 >Gracias por contestar la encuesta</h3>
            <img width={256} src={logo} alt="recreamedLogo" style={{ margin: 'auto' }} />
          </div>
        </div>
  )
}
