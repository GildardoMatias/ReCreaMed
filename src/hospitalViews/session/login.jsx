import { Form, Input, Button, Checkbox, Row, Col, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { S_API } from '../../resources'
import logo from '../assets/Logo.png';

export function Login() {


  const setUserType = (usr) => {
    localStorage.setItem('sessionToken', 'trl8358');
    switch (usr) {
      case 'admin@recreamed.com':
        console.log("admin")
        localStorage.setItem("userType", "admin");
        return 'admin';
      case 'medico@recreamed.com':
        console.log("medic")
        localStorage.setItem("userType", "medic");
        return 'medic';
      case 'paciente@recreamed.com':
        console.log("admin")
        localStorage.setItem("userType", "patient");
        return 'patient';
      default:
        return 'user';
    }
  }

  const onFinish = (values) => {
    delete values.remember;
    console.log('Received values of form: ', values);

    // Inicio de sesion
    const response = fetch(S_API + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((data) => { console.log("data", data); return data.json() })
      .then(res => {
        console.log("resp", res);
        if (res.message === "Bienvenido") {
          localStorage.setItem("userType", res.user.rol);
          localStorage.setItem('sessionToken', res.data.token);
          window.location.href = '/';
        } else (message.info(res.error || res.message))
      })
      .catch(err => window.alert("Error: ", err))

  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <br />
        <br />
        <Card hoverable>
          <br />
          <Row justify="center"> <img src={logo} alt="Logo" width={160} /></Row>
          <br />
          <Row justify="center">
            <h3>Inicio de Sesion</h3>
          </Row>
          <br />
          <br />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa el correo de tu cuenta!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu contraseña!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Mantener la sesion</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Recuperar contraseña
              </a>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className="login-form-button">
                Iniciar Sesion
              </Button>
            </Form.Item>
            <Form.Item>
              <Row justify="center"> O <a href="register">Registrarse</a></Row>

            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>

  );
};