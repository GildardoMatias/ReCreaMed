import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { TeamOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons';

import Register from './register.doctor';
import Dash from './dash.doctors';

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
              <Menu.Item icon={<TeamOutlined />} key="1">
                <span>Médicos</span>
                <Link to="/doctores" />
              </Menu.Item>
              <Menu.Item icon={<UserAddOutlined />} key="2">
                <span>Registrar Médico</span>
                <Link to="/registrar" />
              </Menu.Item>
            </Menu>
            {/* <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1" href="/dash">Option 1 <Link to="/meseros" /> </Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu> */}
          </Sider>
          <Layout>

            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
              <MenuOutlined className="trigger" style={{ cursor: 'pointer' }} onClick={this.toggle} />
            </Header>

            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Route exact path="/registrar" component={Register} />
              <Route path="/doctores" component={Dash} />
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


