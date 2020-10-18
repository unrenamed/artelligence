import { HomeOutlined, BookOutlined, AreaChartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import '../../styles/Header/Header.css'
import ProfileDropdownMenu from './ProfileDropdownMenu'

const { Header: AntHeader } = Layout
const { Item } = Menu

const Header = ({ location: { pathname } }) => {
	const currentUser = useSelector(state => state.auth.currentUser)

	let menuItems = []

	if (!!currentUser) {
		menuItems = [
			<Item key="/" title='Home'>
				<Link to="/">
					<HomeOutlined />
				</Link>
			</Item>,
			<Item key="/courses" title='My Courses'>
				<Link to="/courses">
					<BookOutlined />
				</Link>
			</Item>,
			<Item key="/stats" title='Statistic'>
				<Link to="/stats">
					<AreaChartOutlined />
				</Link>
			</Item>,
			<Item key="/orders" title='Orders'>
				<Link to="/orders">
					<ShoppingCartOutlined />
				</Link>
			</Item>,
			<Item key="/profile" className="profile-menu" title='Profile'>
				<ProfileDropdownMenu currentUser={ currentUser } />
			</Item>
		]
	} else {
		menuItems = [
			<Menu.Item key="/login" title='Login'>
				<Link to="/login">LOGIN</Link>
			</Menu.Item>,
			<Menu.Item key="/signup" title='Sign up'>
				<Link to="/signup">SIGNUP</Link>
			</Menu.Item>
		]
	}

	return (
			<AntHeader className="app-header">
				<div className="container">
					<div className="app-title">
						<Link to="/">ARTELLIGENCE</Link>
					</div>
					<Menu
							className="app-menu"
							mode="horizontal"
							selectedKeys={ [pathname] }
							style={ { lineHeight: '64px' } }>
						{ menuItems }
					</Menu>
				</div>
			</AntHeader>
	)
}

export default withRouter(Header)