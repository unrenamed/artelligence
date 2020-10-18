import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { authActions } from '../../actions/auth.actions'
import withTitle from '../../helpers/withTitle'
import '../../styles/Auth/Login.css'

const { Item } = Form
const { Password } = Input

const Login = () => {
	const { currentUser, signingIn } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	if (currentUser) {
		return <Redirect to="/" />
	}

	const onFinish = values => {
		const { email, password, remember } = values
		dispatch(authActions.login({ email, password, remember }))
	}

	return (
			<Row>
				<Col xs={ { span: 24 } }
						 sm={ { span: 18, offset: 3 } }
						 md={ { span: 16, offset: 4 } }
						 lg={ { span: 12, offset: 6 } }
						 xl={ { span: 6, offset: 9 } }
						 className='login-form'>
					<div className="login-form-header">
						<h3>Sign in to Artelligence</h3>
					</div>
					<LoginForm onFormSubmit={ onFinish } signingIn={ signingIn } />
					<div className="login-form-footer">
						<p>New to Artelligence?</p>
						<Link to="/signup">Create an account.</Link>
					</div>
				</Col>
			</Row>
	)
}

const LoginForm = ({ onFormSubmit, signingIn }) => (
		<Form
				className="login-form-body"
				initialValues={ { remember: true } }
				onFinish={ onFormSubmit }
		>
			<Item
					name="email"
					rules={ [
						{ required: true, message: 'Please input your user E-Mail!' },
						{ type: 'email', message: 'The input is not valid E-mail!' }
					] }
			>
				<Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="User email" />
			</Item>
			<Item
					name="password"
					rules={ [{ required: true, message: 'Please input your Password!' }] }
			>
				<Password
						prefix={ <LockOutlined className="site-form-item-icon" /> }
						type="password"
						placeholder="Password"
				/>
			</Item>
			<Item>
				<Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Keep me logged in</Checkbox>
				</Item>

				<Link className="login-form-forgot" href="">
					Forgot password
				</Link>
			</Item>

			<Item>
				<Button type="primary" htmlType="submit" className="login-form-button" loading={ signingIn }>
					{ signingIn ? 'Logging in' : 'Login' }
				</Button>
			</Item>

		</Form>
)

export default withTitle(Login, 'Login')