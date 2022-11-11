import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataApi = createApi({
    reducerPath: "data",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/app_facturas",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }         
            return headers
        },
    }), 
    tagTypes: ['Usuarios'],  
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
              url: '/acceder',
              method: 'POST',
              body: credentials
            }),
        }),
        dataInvoices: builder.query({ 
            query: () => ({ 
                url: "/facturas",
                method: 'GET'
            }),
            providesTags: ['Usuarios']
        }),
        dataClients: builder.query({
            query: () => ({
                url: '/usuarios',
                method: 'GET'
            }),
            providesTags: ['Usuarios']
        }),
        dataAllCars: builder.query({
            query: (userId) => ({
                url: `/coche?userID=${userId}`,
                method: 'GET'
            })
        }),
        dataOneClient: builder.query({
            query: (userId) => ({
                url: `/usuario?userID=${userId}`,
                method: 'GET'
            }),
            providesTags: ['Usuarios']
        }),
        dataOneCar: builder.query({
            query: (licensePlate) => ({
                url: `/ind-coche?licensePlate=${licensePlate}`,
                method: 'GET'
            })
        }),
        dataOneInvoice: builder.query({
            query: (invoiceID) => ({
                url: `/ind-factura?invoiceID=${invoiceID}`,
                method: 'GET'
            })
        }),
        postInvoice: builder.mutation({
            query: (invoice) => ({
                url: '/facturas',
                method: 'POST',
                body: invoice
            }),
            invalidatesTags: ['Usuarios']
        }),
        postClient: builder.mutation({
            query: (client) => ({
                url: '/usuarios',
                method: 'POST',
                body: client
            }),
            invalidatesTags: ['Usuarios']
        }),
        postCar: builder.mutation({
            query: (car) => ({
                url: '/coches',
                method: 'POST',
                body: car
            }),
            invalidatesTags: ['Usuarios']
        }),
        updateClient: builder.mutation({
            query: (data) => {
                const id = Object.entries(data)[0][1];
                const cliente = Object.entries(data).slice(1).reduce((a, v) => ({...a, [v[0]]: v[1]}), {});
                return {
                    url: `/usuarios/${id}`,
                    method: 'PUT',
                    body: cliente
                }                
            },
            invalidatesTags: ['Usuarios']
        }),
        deleteInvoice: builder.mutation({
            query: (id) => ({
                url: `/facturas/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Usuarios']
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/usuarios/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Usuarios']
        }),
        deleteCar: builder.mutation({
            query: (lp) => ({
                url: `/coches/${lp}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Usuarios']
        })
    })
})


//validateStatus: (response, result) => response.status === 200 && !result.isError --- DEBAJO DE METHOD O URL


export const { useLoginMutation, useDataInvoicesQuery, 
    useDataClientsQuery, useDataAllCarsQuery, usePostInvoiceMutation,
    useDeleteInvoiceMutation, useDataOneClientQuery, usePostClientMutation,
    usePostCarMutation, useDeleteCarMutation, useDeleteClientMutation, 
    useDataOneInvoiceQuery, useUpdateClientMutation, useDataOneCarQuery } = dataApi;
