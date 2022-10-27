import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message } from 'antd'
import { catalogo_sintomatologia, catalogo_sintomatologia2, disminucion_apetito, perdida_peso, aumento_apetito, aumento_peso } from './depresion_catalog'
import { Card } from 'react-bootstrap'
import { getData, sendDataBody } from '../../resources';
import logo from "../../assets/Logo.png";
const { Option } = Select;

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
    let score = 0;
    console.log('Sintomatologia:', values);

    const body = {
      usuario: props.idpaciente,
      medico: props.idmedico,
      score: score,
      tipo: 'depresion',
      uuid: props.token
    }

    console.log('Efectos body:', body);
    // sendDataBody('encuestas/add', body).then((rs) => {
    //   console.log(rs)
    //   message.success(rs.message)
    // }).then(() => checkEncuesta())
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
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
      <h4>Sintomatologia de Depresion</h4>
      <br />
      <h5>Medico: {medicoData.name}</h5>
      <h5>Paciente: {pacienteData.name}</h5>
      <br />

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
                    catalogo_sintomatologia[sk].map((s, i) => <Radio value={i}> {s} </Radio>)
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
                      disminucion_apetito.map((s, i) => <Radio value={i}> {s} </Radio>)
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
                      perdida_peso.map((s, i) => <Radio value={i}> {s} </Radio>)
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
          Object.keys(catalogo_sintomatologia2).map((sk) => {
            return <Form.Item
              label={sk}
              name={sk}
              rules={[{ required: true, message: `Selecciona una opcion` }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {
                    catalogo_sintomatologia2[sk].map((s, i) => <Radio value={i}> {s} </Radio>)
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
