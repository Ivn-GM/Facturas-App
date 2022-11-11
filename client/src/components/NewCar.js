import { Button } from '@mantine/core'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePostCarMutation } from '../store/api'
import NavbarApp from './NavbarApp'

const NewCar = () => {

  const navigate = useNavigate();
  const [newCar] = usePostCarMutation();  
  const param = useParams();
  const [coche, setCoche] = useState({
    licensePlate: "",
    branch: "",
    model: "",
    motor: "",
    year: "",
    userID: param.userID
  })

  const onChangeCar = (e) => {
    setCoche({
      ...coche,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitCar = async(e) => {
    e.preventDefault();
    await newCar(coche);
    navigate('/clientes');
  }

  return (
    <>
      <NavbarApp />
      <div className='grid'>      
        <div className='box'>
          <h1>Nuevo Coche</h1>
          <br/>
          <form className='form-client' style={{margin: '30px 30px 0px 30px'}} >
            <label>Cliente</label> 
            <br/>
            <label>Matrícula</label>
            <input name='userID' value={param.userID} ></input>
            <br/>
            <input name='licensePlate' onChange={onChangeCar} ></input>
            <label>Marca</label>
            <br/>
            <label>Modelo</label>
            <input name='branch' onChange={onChangeCar} ></input>
            <br/>
            <input name='model' onChange={onChangeCar} ></input>
            <label>Motor</label>
            <br/>
            <label>Año</label>
            <input name='motor' onChange={onChangeCar} ></input>
            <br/>            
            <input name='year' onChange={onChangeCar} ></input>
            <Button variant='light' color="teal" onClick={onSubmitCar} >Guardar Coche</Button>
          </form>     
        </div>
      </div>
    </>    
  )
}

export default NewCar;