import React, { useEffect } from 'react';
import { useState } from 'react';
import { AppShell, Burger, Button, Navbar } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/api';
import { setCredentials } from '../store/authSlice';
import {store} from '../store/store';
import axios from 'axios'

const NavbarApp = () => {
  const [opened, setOpened] = useState(false);  
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
  
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    const user = await login("").unwrap();
    dispatch(setCredentials(user));
    navigate('/')
  }

  const burger = (
    <Burger
      className='burger'
      opened={opened}
      onClick={() => setOpened((o) => !o)}
    />
  );
  return (
    <div>
      { burger }
      { opened === true && (
        <AppShell >
            <Navbar height={850} p="md" width={{ sm: 200, lg: 300, base: 150 }}>
              <Navbar.Section ><Link style={{textDecoration: "none", color: "#c1c2c5"}} to={"/clientes"}>Clientes</Link></Navbar.Section>
              <Navbar.Section grow mt="lg"><Link style={{textDecoration: "none", color: "#c1c2c5"}} to={"/principal"}>Facturas</Link></Navbar.Section>
              <Navbar.Section>{admin&&admin.data.map(a => a.name)}</Navbar.Section>
              <Navbar.Section><Button size='xs' onClick={handleLogout} variant="outline" color="red" uppercase style={{marginTop: '10px'}} >Cerrar sesión</Button></Navbar.Section>
            </Navbar>
        </AppShell>        
      )}
    </div>
  )
}

export default NavbarApp