import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import '../styles/Main.css'

const { Header, Sider, Content, Footer } = Layout

const Main = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false)

	const toggle = () => {
		setCollapsed(!collapsed)
	}

	return (
			<Layout>
				<Sider trigger={ null } collapsible collapsed={ collapsed }>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={ ['1'] }>
						<Menu.Item key="1">
							Nav 1
						</Menu.Item>
						<Menu.Item key="2">
							Nav 2
						</Menu.Item>
						<Menu.Item key="3">
							Nav 3
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-header" style={ { padding: 0 } }>
						{ React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: toggle,
						}) }
					</Header>
					<Content className="site-layout-content">
						{ children }
					</Content>
					<Footer style={ { textAlign: 'center' } }>Artelligence ©2020 Created by N. Nazolvan & Co.</Footer>
				</Layout>
			</Layout>
	)
}

export default Main