import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
    console.log('Received values of form: ', values);
    //{username: 'admin@recreamed.com', password: 'medicalAccess2017#', remember: true}
    // Set Dummy User Type
    setUserType(values.username);

    // Inicio de sesion
    const body = {
      email: values.username,
      password: values.password
    }

    // Api de sesion
    // const response = fetch("https://recreamed.com/api/v1/auth/login", {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(body) // body data type must match "Content-Type" header
    // })
    //   .then((data) => { console.log("data", data); return data.json() })
    //   .then(res => { console.log("resp", res) })
    //   .catch(err => window.alert("Error: ", err))

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