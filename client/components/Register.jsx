import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginError, registerUserRequest } from '../actions/auth'

function Register() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((redux) => redux.auth)

  const [formData, setFormData] = useState({
    username: '',
    email_address: '',
    password: '',
    confirm_password: '',
  })

  useEffect(() => {
    dispatch(loginError(''))
  }, [])

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset()

    const { password, confirm_password } = formData

    if (confirm_password != password) {
      dispatch(loginError("Passwords don't match"))
    } else {
      const confirmSuccess = () => navigateTo('/')
      const userInfo = { ...formData }
      delete userInfo.confirm_password
      dispatch(registerUserRequest(userInfo, confirmSuccess))
    }
  }

  return (
    <>
      <div className="register-title">
        <h2>Register</h2>
      </div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          {auth.errorMessage && <span>{auth.errorMessage}</span>}

          <label>
            Username:
            <input
              required
              placeholder="User Name"
              type="text"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              value={formData.username}
            />
          </label>
          <label>
            Email Address:
            <input
              required
              placeholder="Email Adress"
              type="text"
              name="email_address"
              onChange={handleChange}
              value={formData.email_address}
            />
          </label>
          <label>
            Password:
            <input
              required
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={handleChange}
              value={formData.password}
            />
          </label>
          <label>
            Confirm Password:
            <input
              required
              type="password"
              name="confirm_password"
              autoComplete="new-password"
              onChange={handleChange}
              value={formData.confirm_password}
            />
          </label>
          <input value="Register" type="submit" />
        </form>
      </div>
    </>
  )
}

export default Register
