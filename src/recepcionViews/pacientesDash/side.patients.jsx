import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { UserOutlined, UserAddOutlined, MenuOutlined, SwapOutlined } from '@ant-design/icons';

import Register from './register.patient';
import Dash from './dash.patients';
import MovePatients from './move.patients';
import DetallesPaciente from './detalles.paciente';

const { Header, Content, Footer, Sider } = Layout;

class SideMenu extends Component {
  handleClick = e => {
    console.log('click ', e);
  };

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            theme="light"
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item icon={ <UserOutlined /> } key="1">
                <span>Pacientes</span>
                <Link to="/pacientes" />
              </Menu.Item>
              <Menu.Item icon={ <UserAddOutlined /> } key="2">
                <span>Registrar Paciente</span>
                <Link to="/registrar" />
              </Menu.Item>
              <Menu.Item icon={ <SwapOutlined />} key="3">
                <span>Re-asignar Paciente</span>
                <Link to="/mover" />
              </Menu.Item>
              <Menu.Item icon={ <SwapOutlined />} key="4">
                <span>Detalles</span>
                <Link to="/detalles" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>

            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
              <MenuOutlined className="trigger" style={{ cursor: 'pointer' }} onClick={this.toggle} />
            </Header>

            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Route exact path="/registrar" component={Register} />
              <Route path="/pacientes" component={Dash} />
              <Route path="/detalles" component={DetallesPaciente} />
              <Route path="/mover" component={MovePatients} />
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              RECREAMED ©2021 Created by Realidad Creativa
            </Footer>
          </Layout>

        </Layout>
      </Router>
    );
  }
}

export default SideMenu


