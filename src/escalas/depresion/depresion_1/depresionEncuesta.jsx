import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, message } from 'antd'
import { depresion_catalog, depresion_catalog2, disminucion_apetito, perdida_peso, aumento_apetito, aumento_peso } from './depresion_catalog'
import { Card } from 'react-bootstrap'
import { getData, sendDataBody } from '../../../resources';
import logo from "../../../assets/Logo.png";

export default function DepresionEncuesta(props) {


  const [pesoEnabled, setPesoEnabled] = useState(false)
  const [apetitoEnabled, setApetitoEnabled] = useState(false)
  // For check if the encuesta existts on db
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
    let _score = 0;
    let high1_4 = 0;
    let high6_9 = 0;
    console.log('Sintomatologia:', values);
    // El mayor de la 1 a la 4
    for (var i = 1; i < 5; i++) {
      if (values[i] > high1_4) high1_4 = values[i]
    }
    // El mayor de la 6 a la 9
    for (var j = 6; j < 10; j++) {
      if (values[j] > high6_9) high6_9 = values[j]
    }
    // console.log('6-9', high6_9)
    // Suma de la 10 a la 14
    for (var k = 10; k < 15; k++) {
      _score += values[k]
    }
    // Suma el mayor enre 15 y 16 y sumarlo
    values[15] > values[16] ? _score += values[15] : _score += values[16];

    // Sumar la 5 y el resto
    _score = _score + high1_4 + values[5] + high6_9;

    console.log('score: ', _score);
    const body = {
      usuario: props.idpaciente,
      medico: props.idmedico,
      score: _score,
      tipo: 'depresion',
      uuid: props.token
    }

    console.log('Efectos body:', body);
    sendDataBody('encuestas/add', body).then((rs) => {
      console.log(rs)
      message.success(rs.message)
    }).then(() => checkEncuesta())
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((p) => {
      return message.error('Conteste la pregunta ' + p.name)
    })
  };


  // Loading state
  if (checking) return <div style={{ paddingTop: 180 }}>
    <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
      <h3 >Cargando</h3>
    </div>
  </div>

  if (!encuestaNotExists) return <div style={{ paddingTop: 180 }}>
    <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
      <h3 >Gracias por contestar la encuesta</h3>
      <img width={256} src={logo} alt="recreamedLogo" style={{ margin: 'auto' }} />
    </div>
  </div>

  return (
    <div className='mainContainer'>
      <h4>Encuesta de sintomatologia depresiva QUIDS (QUICK INVENTORY OF DEPRESSIVE SYMPTOMATOLOGY)</h4>
      <br />
      <h5>Medico: {medicoData.name}</h5>
      <h5>Paciente: {pacienteData.name}</h5>
      <br />

      <Form
        name="basic"
        layout='vertical'
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >


        {
          depresion_catalog.map((p) => {
            return <Form.Item
              label={p.n + '. ' + p.pregunta}
              name={p.n}
              rules={[{ required: true, message: `Selecciona una opcion` }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    p.respuestas.map((r, i) => <Radio value={i}> {r} </Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          })
        }

        {/*Apetito*/}
        <Card>
          <Form.Item
          // wrapperCol={{ offset: 8, span: 16 }} 
          >
            Disminucion apetito <Switch onChange={() => setApetitoEnabled(!apetitoEnabled)} /> Aumento Apetito
          </Form.Item>
          <Row>
            <Col md={10}>
              <Form.Item
                label='Disminucion Apetito'
                name='6'
                rules={[{ required: !apetitoEnabled, message: `Selecciona una opcion` }]}
              >
                <Radio.Group disabled={apetitoEnabled}>
                  <Space direction="vertical">
                    {
                      disminucion_apetito.map((s, i) => <Radio value={i}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label='Aumento Apetito'
                name='6'
                rules={[{ required: apetitoEnabled, message: `Selecciona una opcion` }]}
              >

                <Radio.Group disabled={!apetitoEnabled}>
                  <Space direction="vertical">
                    {
                      aumento_apetito.map((s, i) => <Radio value={i}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>



        {/* Peso */}
        <Card>
          <Form.Item
          // wrapperCol={{ offset: 8, span: 16 }} 
          >
            Disminucion de Peso <Switch onChange={() => setPesoEnabled(!pesoEnabled)} /> Aumento de Peso
          </Form.Item>
          <Row>
            <Col md={10}>
              <Form.Item
                label='Perdida de Peso'
                name='8'
                rules={[{ required: !pesoEnabled, message: `Selecciona una opcion` }]}
              >
                <Radio.Group disabled={pesoEnabled}>
                  <Space direction="vertical">
                    {
                      perdida_peso.map((s, i) => <Radio value={i}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label='Aumento Peso'
                name='8'
                rules={[{ required: pesoEnabled, message: `Selecciona una opcion` }]}
              >

                <Radio.Group disabled={!pesoEnabled}>
                  <Space direction="vertical">
                    {
                      aumento_peso.map((s, i) => <Radio value={i}> {s} </Radio>)
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <br />

        {
          depresion_catalog2.map((p) => {
            return <Form.Item
              label={p.n + '. ' + p.pregunta}
              name={p.n}
              rules={[{ required: true, message: `Selecciona una opcion` }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    p.respuestas.map((r, i) => <Radio value={i}> {r} </Radio>)
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
            Enviar respuestas
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
