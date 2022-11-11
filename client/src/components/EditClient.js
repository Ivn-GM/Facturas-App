import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDataOneClientQuery, useUpdateClientMutation } from '../store/api';
import NavbarApp from './NavbarApp';

const EditClient = () => {

  const navigate = useNavigate();
  const { userID } = useParams();
  const [newClient] = useUpdateClientMutation();
  const prevDataClient = useDataOneClientQuery(userID);

  useEffect(() => {
    const retrieveData = async() => {
      setClient({
        userID: userID,
        surnames_name: prevDataClient.data[0].surnames_name,
        adress: prevDataClient.data[0].adress,
        email: prevDataClient.data[0].email,
        phoneNumber: prevDataClient.data[0].phoneNumber,
        moreInfo: prevDataClient.data[0].moreInfo
      })
    }
    retrieveData();
  }, [prevDataClient.data, userID])

  const [client, setClient] = useState({
    userID: userID,
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

  const updateClient = async(e) => {
    e.preventDefault();
    await newClient(client);
    navigate('/clientes');
  }
    
  return (
    <>
      <NavbarApp />
      <div className='grid'>      
        <div className='box'>
          <h1>Modificar Cliente</h1>
          <br/>
          <form className='form-client'>
            <label>Apellidos, Nombre</label>   
            <br/>      
            <label>Dirección</label>   
            <input name='surnames_name' onChange={onChangeClient} defaultValue={client.surnames_name}></input>
            <br/>            
            <input name='adress' onChange={onChangeClient} defaultValue={client.adress}></input>
            <label>Email</label>
            <br/>
            <label>Nº de Teléfono</label>
            <input name='email' onChange={onChangeClient} defaultValue={client.email}></input>
            <br/>
            <input name='phoneNumber' onChange={onChangeClient} defaultValue={client.phoneNumber}></input>  
            <label>Más Información</label>
            <input name='moreInfo' style={{alignSelf: 'normal', gridColumn: '2/4'}} onChange={onChangeClient} defaultValue={client.moreInfo}></input>
            <br/>
            <Button variant='light' color="teal" onClick={updateClient}>Editar Cliente</Button>
          </form>     
        </div>
      </div>
    </>    
  )
}

export default EditClient;