import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../assets/Logo.png';


export function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    window.location.href = '/';
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
              name="username"
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