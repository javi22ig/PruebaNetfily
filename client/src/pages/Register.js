import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Alert } from '../components';
import { useAppContext } from '../context/appContext';

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
export const Register = () => {

  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser, setupUser } = useAppContext();
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState);


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return

    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({ currentUser, endPoint: 'login', alertText: 'Login Successful! Redirecting...' });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }

  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }

  }, [user, navigate])

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>


        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}>
        </FormRow>

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}>
        </FormRow>

        <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )

}
