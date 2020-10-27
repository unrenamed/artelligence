import { UserOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Divider } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../../actions/auth.actions'
import '../../styles/Header/ProfileDropdownMenu.scss'

const { Item } = Menu

const ProfileDropdownMenu = ({ currentUser }) => {
	const dispatch = useDispatch()

	const handleMenuClick = ({ key }) => {
		switch (key) {
			case 'logout':
				dispatch(authActions.logout())
				break
			default:
				break
		}
	}

	const dropdownMenu = (
			<Menu onClick={ handleMenuClick } className="profile-dropdown-menu" theme='dark'>
				<Item key="user-info" className="dropdown-header ">
					<div className="user-full-name-info">
						{ currentUser.name || 'My name xD' }
					</div>
					<div className="username-info">
						{ currentUser.email }
					</div>
					<Divider className='profile-menu-divider' />
				</Item>
				<Item key="profile" className="dropdown-item">
					<Link to='/my-profile'>Profile</Link>
				</Item>
				<Item key="logout" className="dropdown-item">
					Logout
				</Item>
			</Menu>
	)

	return (
			<Dropdown
					overlay={ dropdownMenu }
					trigger={ ['click'] }
					getPopupContainer={ () => document.getElementsByClassName('profile-menu')[0] }>
				<Link to='#' className="ant-dropdown-link">
					<UserOutlined />
					<CaretDownOutlined />
				</Link>
			</Dropdown>
	)
}

export default ProfileDropdownMenu