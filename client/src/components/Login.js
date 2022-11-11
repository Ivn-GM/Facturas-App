import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/api';
import { setCredentials } from '../store/authSlice';
import { store } from '../store/store';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState(null)

  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <div className='login-grid'>
      <div className='login-box'>
        <h1>Login</h1>
        <form id='login-form'>
            <label>Email</label>
            <input onChange={handleChange} name="email"></input>
            <label>Contraseña</label>
            <input type="password" onChange={handleChange} name="password"></input>
            <br/>
            <Button variant="light" size="md" onClick={async (e) => {
              try {
                e.preventDefault();
                const user = await login(form).unwrap();
                dispatch(setCredentials(user))
                if (store.getState().auth.token) {
                  return navigate("/principal")
                } else {
                  return setError(user.message);
                }
              } catch (err) {
                console.error(err);
              }
            }}>Iniciar Sesión</Button>
            
        {error ? <p>{error}</p> : null}
        </form>
      </div>      
    </div>
  )
}

export default Login