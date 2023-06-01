import React from 'react'
import Togglable from './Togglable'
import proptypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = ({ handleSubmit, handleUsernameChange, password, handlePasswordChange, username }) => {
  return (
    <Togglable btnText='show login'>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={handleUsernameChange}
            name='username'
            placeholder='username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='password'
            name='password'
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button id='form-login-button' variant='contained' type='submit'>login</Button>
      </Form>

    </Togglable>
  )
}

LoginForm.proptypes = {
  handleSubmit: proptypes.func.isRequired,
  handlePasswordChange: proptypes.func.isRequired,
  handleUsernameChange: proptypes.func.isRequired,
  password: proptypes.string,
  username: proptypes.string
}

export default LoginForm
