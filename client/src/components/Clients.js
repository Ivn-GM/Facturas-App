import { Button, Table, Pagination } from '@mantine/core';
import React,  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataClientsQuery } from '../store/api';
import NavbarApp from './NavbarApp';

const Clients = () => {

  const data = useDataClientsQuery();  
  const navigate = useNavigate();

  
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  const paginate = pgn => setCurrentPage(pgn);


  useEffect(() => {
    const hlp = async() => {
      const indexOfLastPost = currentPage * 2;
      const indexOfFirstPost = indexOfLastPost - 2;
      setTotalData(await data.data);
      setCurrentData(totalData.slice(indexOfFirstPost, indexOfLastPost));

      for (let i = 1; i <= Math.ceil(totalData.length / 2 /*dataPerPage*/); i++) {
        setPageNumbers(i);
      } 
    } 
    hlp();
  }, [totalData, currentPage, data.data])

  return (
    <>
    <NavbarApp />  
      <div className='grid'>    
        <div className="box">
          <h1 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
            Clientes
            <Button onClick={() => navigate('/nuevo_cliente')} size="md" variant='subtle' color='dark' style={{fontSize: "30px", color: "white"}}>+</Button>
          </h1>
          <br/>
          <div className='table'>
            <Table striped highlightOnHover horizontalSpacing="xl">
              <thead>
                <tr>
                  <th>Nº Cliente</th>
                  <th>Cliente</th>
                  <th>Nº Teléfono</th>
                  <th></th> 
                  <th></th>                 
                </tr>
              </thead>
              <tbody>{currentData&&currentData.map((dato) => { return (
                  <tr key={dato.userID}>
                    <td style={{width: '0px'}}>{dato.userID}</td>
                    <td >{dato.surnames_name}</td>
                    <td>{dato.phoneNumber}</td>
                    <td >
                      <Button style={{marginBottom: '3px', marginRight: '10px'}} size="xs" variant='light' color="teal" onClick={() => navigate(`/nueva_factura/${dato.userID}`)}>Nueva Factura</Button>
                      <Button size="xs" variant='light' color="teal" onClick={() => navigate(`/nuevo_coche/${dato.userID}`)}>Nuevo Coche</Button>
                    </td>
                    <td id="td-botones" style={{display: "flex", justifyContent: "space-evenly", gap: "2px"}}>
                      <Button  onClick={() => navigate(`/cliente/${dato.userID}`)} size="xs" variant='default' style={{color: "#C1C2C5"}}>Ver</Button>
                      <Button onClick={() => navigate(`/editar-cliente/${dato.userID}`)} size="xs" variant='default' style={{color: "#C1C2C5"}}>Editar</Button>
                      <Button size="xs" variant='gradient' gradient={{from: "#7a2828", to: "#7a2828"}} style={{color: "#C1C2C5"}}>Eliminar</Button>
                    </td>
              </tr>)})}</tbody>
            </Table>
          </div>   
          <Pagination color='gray' total={pageNumbers} onChange={e => paginate(e)} withControls={false} withEdges position='center' />
        </div>
      </div>
    </>
  )
}

export default Clients