import { Button, Table } from '@mantine/core';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDataAllCarsQuery, useDataOneClientQuery, useDeleteCarMutation } from '../store/api';
import NavbarApp from './NavbarApp';

const OneClient = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [deleteCar] = useDeleteCarMutation();
  const data = useDataOneClientQuery(param.userID);
  const car = useDataAllCarsQuery(param.userID);

  const deletingCar = async(e) => {
    await deleteCar(e);
    navigate(`/cliente/${param.userID}`)
  }

  return (
    <>
        <NavbarApp />
        <div className='grid'>
            <div className='box'>
                <h1 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
                    Cliente
                </h1>
                <br/>
                <div id='info' style={{marginLeft: '15px'}}>
                  {data.data&&data.data.map((info) => { return (
                      <>
                      <div id='info-flex'>
                        <h5>Nombre y Apellidos</h5>
                        <h5>Nº Teléfono</h5>  
                        <p>{info.surnames_name}</p>                         
                        <p>{info.phoneNumber}</p>
                        <h5>Dirección</h5>
                        <h5>Email</h5>
                        <p>{info.adress}</p>  
                        <p>{info.email}</p>
                      </div> 
                      <h5 style={{marginTop: '30px'}} >Más Información</h5>
                      <p>{info.moreInfo ? info.moreInfo : 'Información no aportada'}</p>
                      </>
                    )})
                  }
                </div>                
                <br/>
                <Table style={{marginTop: '50px'}} striped highlightOnHover horizontalSpacing="xl">
                  <caption><h2 style={{margin: '0px'}} >Coches</h2></caption>
                  <thead>
                    <tr>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Matrícula</th>
                      <th>Motor</th>
                      <th>Año</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody> {car.data&&car.data.map((dato) => { return (                    
                    <tr  key={dato.licensePlate}>
                      <td>{dato.branch}</td>
                      <td>{dato.model}</td>
                      <td>{dato.licensePlate}</td>
                      <td>{dato.motor}</td>
                      <td>{dato.year}</td>
                      <td><Button onClick={() => deletingCar(dato.licensePlate)} size="xs" variant='gradient' gradient={{from: "#7a2828", to: "#7a2828"}} style={{color: "#C1C2C5"}}>Eliminar</Button></td>
                    </tr>                  
                  )})}
                  </tbody>
                </Table>
            </div>
        </div>
    </>    
  )
}

export default OneClient;