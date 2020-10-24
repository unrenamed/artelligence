import { Layout } from 'antd'
import React from 'react'
import '../styles/Main.css'
import Header from './Header/Header'

const { Content, Footer } = Layout

const Main = ({ children }) => {
	return (
			<Layout className="site-layout">
				<Header />
				<Content className="site-layout-content">{ children }</Content>
				<Footer className="site-layout-footer">Artelligence ©2020 Created by N. Nazolvan & Co.</Footer>
			</Layout>
	)
}

export default Main