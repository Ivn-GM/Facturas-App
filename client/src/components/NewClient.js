import { Button } from '@mantine/core'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { usePostClientMutation } from '../store/api';
import NavbarApp from './NavbarApp'

const NewClient = () => {
  
  const navigate = useNavigate();
  const param = useParams();
  const [newClient] = usePostClientMutation();

  const [client, setClient] = useState({
    surnames_name: "",
    adress: "",
    email: "",
    phoneNumber: "",
    moreInfo: ""
  })

  const onChangeClient = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitClient = async(e) => {
    e.preventDefault();
    await newClient(client);
    navigate('/clientes');
  }

  return (
    <>
      <NavbarApp />
      <div className='grid'>      
        <div className='box'>
          <h1>Nuevo Cliente</h1>
          <br/>
          <form className='form-client'>
            <label>Apellidos, Nombre</label> 
            <br/>
            <label>Dirección</label>
            <input name='surnames_name' onChange={onChangeClient} ></input>
            <br/>
            <input name='adress' onChange={onChangeClient} ></input>
            <label>Email</label>
            <br/>
            <label>Nº de Teléfono</label>
            <input name='email' onChange={onChangeClient} ></input>
            <br/>
            <input name='phoneNumber' onChange={onChangeClient} ></input>
            <label>Más Información</label>
            <input name='moreInfo' style={{alignSelf: 'normal', gridColumn: '2/4'}} onChange={onChangeClient} ></input>
            <br/>
            <Button variant='light' color="teal" onClick={onSubmitClient} >Guardar Cliente</Button>
          </form>     
        </div>
      </div>
    </>    
  )
}

export default NewClient