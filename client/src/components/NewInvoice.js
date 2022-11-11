import { Button } from '@mantine/core';
import React , { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarApp from './NavbarApp';
import { useDataAllCarsQuery, usePostInvoiceMutation } from '../store/api';

const NewInvoice = () => {
    const navigate = useNavigate();
    const param = useParams();
    const oneCar = useDataAllCarsQuery(param.userID);
    const [postInvoice] = usePostInvoiceMutation();    

    const [article, setArticle] = useState({
        item1: "",
        price1: 0,
        disc1: 0,
        item2: "",
        price2: 0,
        disc2: 0,
        item3: "",
        price3: 0,
        disc3: 0,
        iva: 21,
        total: 0,
        userID: param.userID,
        licensePlate: ""
    })   

    const [total, setTotal] = useState({
        total: 0
    }) 

    useEffect(() => {
        setTotal({
            total: (((article.price1 - ((article.price1 * article.disc1) / 100)) + (article.price2 - ((article.price2 * article.disc2) / 100)) + (article.price3 - ((article.price3 * article.disc3) / 100))) * 0.21) + ((article.price1 - ((article.price1 * article.disc1) / 100)) + (article.price2 - ((article.price2 * article.disc2) / 100)) + (article.price3 - ((article.price3 * article.disc3) / 100)))
        })
    }, [article])

    const onChangeTotal = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitInvoice = async(e) => {
        e.preventDefault();
        const invoice = Object.assign({}, article, total);
        await postInvoice(invoice);
        navigate('/principal');
    }

    return (
        <>
        <NavbarApp />
        <div className='grid'>      
            <div className='box'>
            <h1>Nueva Factura</h1>
            <br/>
            <form className='form-invoice'>
                <label>Cliente</label>
                <br/>
                <label id='matr'>Matrícula</label>
                <input value={param.userID}></input>
                <br/>
                <input onChange={onChangeTotal} name='licensePlate' list='carList'></input>
                <datalist id='carList'>
                    {oneCar.data&&oneCar.data.map((car) => (
                        <option key={car.licensePlate}>{car.licensePlate}</option>
                    ))}
                </datalist>
                <label>Concepto</label>
                <label>Precio (€)</label>
                <label>Descuento (%)</label>
                <input name='item1' onChange={onChangeTotal} ></input>
                <input name='price1' onChange={onChangeTotal} ></input>
                <input name='disc1' onChange={onChangeTotal} ></input>
                <input name='item2' onChange={onChangeTotal} ></input>
                <input name='price2' onChange={onChangeTotal} ></input>
                <input name='disc2' onChange={onChangeTotal} ></input>
                <input name='item3' onChange={onChangeTotal} ></input>
                <input name='price3' onChange={onChangeTotal} ></input>
                <input name='disc3' onChange={onChangeTotal} ></input>
                <label>IVA (%)</label>
                <br/>
                <label>TOTAL (€)</label>
                <input name='iva' onChange={onChangeTotal} value={21}></input>
                <br/>
                <input value={total.total.toFixed(2)} name='total'></input>
                <Button variant='light' color="teal" onClick={onSubmitInvoice} >Guardar Factura</Button>
            </form>     
            </div>
        </div>
        </>
    )
}

export default NewInvoice