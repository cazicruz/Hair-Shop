'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import Orders from '@/components/admin/Orders';
import Users from '@/components/admin/Customers';
import Dashboard from '@/components/admin/Dashboard';
// import Products from '@/components/admin/Products'; // Add your components
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { AiOutlineDashboard } from "react-icons/ai";
import { LuPackageOpen } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUsersGear } from "react-icons/fa6";
import { Button, Layout, Menu, theme } from 'antd';
import Cookies from 'js-cookie';


const { Header, Sider, Content } = Layout;

const FullHeightLayout = styled(Layout)`
  height: 100vh;
  overflow: hidden;
`;

const FixedSider = styled(Sider)`
  position: fixed !important;
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  // display:flex;
  // // justify-content:center;
  // // align-items:center;
  // flex-direction:column;
  h2{
  padding:10px 30px;
  color:#fff;
  align-self:center;
  }
`;

const MainLayout = styled(Layout)`
  margin-left: ${(props) => (props.collapsed ? '80px' : '200px')};
  transition: margin-left 0.2s ease;
  height: 100vh;
  overflow: hidden;
`;

const StyledHeader = styled(Header)`
  padding: 0;
  background: ${(props) => props.bg};
`;

const ScrollableContent = styled(Content)`
  padding: 4px;
  height: calc(100vh - 64px); /* subtract header height */
  overflow-y: auto;
  background: ${(props) => props.bg};
  border-radius: ${(props) => props.radius};

  @media (max-width: 768px) {
    padding: 1px;
  }
`;

const ToggleButton = styled(Button)`
  font-size: 16px;
  width: 64px;
  height: 64px;
`;
const LogoContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:colunm;
`

const AdminLayout = () => {
  const user = Cookies.get('user');
  console.log("User:", user);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('2'); // Default to Orders
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  if (!user || !JSON.parse(user).isAdmin) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
    </div>;
  }
  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Dashboard />;
      case '2':
        return <Users />;
      case '3':
        return <Orders />;
      case '4':
        return <div>Select a menu item</div>; //placeholder for products
      default:
        return <Dashboard />;
    }
  };

  return (
        <FullHeightLayout>
          <FixedSider trigger={null} collapsible collapsed={collapsed}>
              <LogoContainer>
                <h2>B-Classy</h2>
              </LogoContainer>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={({ key }) => setSelectedKey(key)}
              items={[
                { key: '1', icon: <AiOutlineDashboard />, label:'Dashboard' },
                { key: '2', icon: <FaUsersGear />, label: 'Users' },
                { key: '3', icon: <LuPackageOpen />, label: 'Orders' },
                { key: '4', icon: <AiOutlineProduct />, label: 'Products' },
              ]}
            />
          </FixedSider>

          <MainLayout collapsed={collapsed}>
            <StyledHeader bg={colorBgContainer}>
              <ToggleButton
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            </StyledHeader>

            <ScrollableContent bg={colorBgContainer} radius={borderRadiusLG}>
              {renderContent()}
            </ScrollableContent>
          </MainLayout>
        </FullHeightLayout>
  );
};

export default AdminLayout;
