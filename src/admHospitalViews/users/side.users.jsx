import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { UserOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons';

import Register from './register.user';
import Dash from './dash.users';

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
                <span>Usuarios</span>
                <Link to="/usuarios" />
              </Menu.Item>
              <Menu.Item icon={ <UserAddOutlined /> } key="2">
                <span>Registrar Usuario</span>
                <Link to="/registrar_usuario" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>

            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
              <MenuOutlined className="trigger" style={{ cursor: 'pointer' }} onClick={this.toggle} />
            </Header>

            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Route exact path="/registrar_usuario" component={Register} />
              <Route path="/usuarios" component={Dash} />
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


