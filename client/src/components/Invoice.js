import { Button, Table } from '@mantine/core';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { store } from '../store/store';
import { useLocation, useParams } from 'react-router-dom';
import { useDataOneCarQuery, useDataOneInvoiceQuery } from '../store/api';

const Invoice = () => {
    // Get admin
    const [admin, setAdmin] = useState("");

    useEffect(() => {
        getActualAdmin();  
    }, [])

    const getActualAdmin = async() => {
        const getAdmin = await axios.get('http://localhost:5000/api/app_facturas/admin', {
        headers: {
            Authorization: 'Bearer ' + store.getState().auth.token 
        }
        });
        setAdmin(getAdmin)
    }

    //
    const param = useParams();
    const location = useLocation();
    const data = useDataOneInvoiceQuery(param.invoiceID);
    const car = useDataOneCarQuery(location.state.message);

    return (
        <>
        <div className='grid' style={{gridTemplateColumns: '1.5fr 10fr 1.5fr', gridTemplateRows: "55px 1fr"}}>
            <div className='box' style={{padding: '0px 30px 30px 30px'}} >
                <div className='invoice-inf'>
                    <h2 style={{display: 'flex', justifyContent: 'flex-end'}} >{admin.data&&admin.data[0].name}</h2>
                    <p>{data.data&&data.data[0].surnames_name}</p>
                    <p>{data.data&&data.data[0].licensePlate}</p>
                    <p>{car.data&&car.data[0].branch} {car.data&&car.data[0].model}</p>
                </div>
                <div className='table' style={{marginTop: '50px'}} >
                    <Table striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.data&&data.data[0].item1}</td>
                                <td>{data.data&&data.data[0].price1}€</td>
                                <td>{data.data&&data.data[0].disc1}%</td>
                            </tr>
                            <tr>
                                <td>{data.data&&data.data[0].item2}</td>
                                <td>{data.data&&data.data[0].price2 === "0.00" ? "" : data.data&&data.data[0].price2 + "€"}</td>
                                <td>{data.data&&data.data[0].disc2 === 0 ? "" : data.data&&data.data[0].disc2 + "%"}</td>
                            </tr>
                            <tr>
                                <td>{data.data&&data.data[0].item3}</td>
                                <td>{data.data&&data.data[0].price3 === "0.00" ? "" : data.data&&data.data[0].price3 + "€"}</td>
                                <td>{data.data&&data.data[0].disc3 === 0 ? "" : data.data&&data.data[0].disc3 + "%"}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br/>
                    <Table striped highlightOnHover>
                        <tbody>
                            <tr>
                                <td>IVA 21%</td>
                                <td></td>
                                <td>TOTAL: {data.data&&data.data[0].total}€</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <br/>
                <Button id="printPageButton" onClick={() => window.print()} color='teal'>Imprimir</Button>
            </div>
        </div>
        </>
    )
}

export default Invoice;