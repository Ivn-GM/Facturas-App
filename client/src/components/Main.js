import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table } from '@mantine/core';
import NavbarApp from './NavbarApp';
import { useDataInvoicesQuery, useDeleteInvoiceMutation } from '../store/api';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const data = useDataInvoicesQuery();
  const [deleteInvoice, {isLoading}] = useDeleteInvoiceMutation();

  // Searching part  
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState()
 
  const onChangeSearch = (e) => {
    const searchName = e.target.value;
    setSearch(searchName);
  }

  useEffect(() => {
    const sf = async() => {
      const filteringNames = await data.data.filter((name) => name.surnames_name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      setFilters(filteringNames)
    }
    sf();
  }, [data.data, search]);

  // Pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  const paginate = pgn => setCurrentPage(pgn);

  useEffect(() => {
    const hlp = async() => {
      const indexOfLastPost = currentPage * 5;
      const indexOfFirstPost = indexOfLastPost - 5;
      setTotalData(await data.data);
      setCurrentData(totalData.slice(indexOfFirstPost, indexOfLastPost));

      for (let i = 1; i <= Math.ceil(totalData.length / 5 /*dataPerPage*/); i++) {
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
            Facturas
          </h1>
          <br/>
          <div style={{display: 'grid', justifyItems: 'center'}}>
            <input onChange={onChangeSearch} placeholder='Búsqueda por Apellidos, Nombre' style={{fontSize: '11px', borderRadius: '5px', width: '200px', backgroundColor: '#ffffff81', textAlign: 'center'}}></input>
          </div>
          <br/>
          <div className='table'>
            <Table striped highlightOnHover horizontalSpacing="xl">
              <thead>
                <tr>
                  <th>Nº Factura</th>
                  <th>Cliente</th>
                  <th>Matrícula</th>
                  <th>TOTAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{search ? filters.map((dato) => { return (
                  <tr key={dato.invoiceID}>
                    <td>{dato.invoiceID}</td>
                    <td>{dato.surnames_name}</td>
                    <td>{dato.licensePlate}</td>
                    <td>{dato.total}€</td>
                    <td id="td-botones" style={{display: "flex", justifyContent: "space-evenly", gap: "2px"}}>
                      <Button onClick={() => navigate(`/ver-factura/${dato.invoiceID}`, {state: {message: dato.licensePlate}})} size="xs" variant='default' style={{color: "#C1C2C5"}} >Ver</Button>
                      <Button onClick={() => deleteInvoice(dato.invoiceID).then(navigate('/principal'))} size="xs" variant='gradient' gradient={{from: "#7a2828", to: "#7a2828"}} style={{color: "#C1C2C5"}}>Eliminar</Button>
                    </td>
              </tr>)}) : currentData && currentData.map((dato) => { return (
                  <tr key={dato.invoiceID}>
                    <td>{dato.invoiceID}</td>
                    <td>{dato.surnames_name}</td>
                    <td>{dato.licensePlate}</td>
                    <td>{dato.total}€</td>
                    <td id="td-botones" style={{display: "flex", justifyContent: "space-evenly", gap: "2px"}}>
                      <Button onClick={() => navigate(`/ver-factura/${dato.invoiceID}`, {state: {message: dato.licensePlate}})} size="xs" variant='default' style={{color: "#C1C2C5"}} >Ver</Button>
                      <Button onClick={() => deleteInvoice(dato.invoiceID).then(navigate('/principal'))} size="xs" variant='gradient' gradient={{from: "#7a2828", to: "#7a2828"}} style={{color: "#C1C2C5"}}>Eliminar</Button>
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

export default Main