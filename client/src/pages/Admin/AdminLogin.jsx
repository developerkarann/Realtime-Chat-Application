import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AdminLogin = () => {

    const isAdmin = false;

    const secretKey = useInputValidation('')

    const submitHandler = (e) => {
        e.preventDefault()
    }

    if(isAdmin) return (<Navigate to='/admin/dashboard' />)
      
     
    return (
        <>
            <Container component={'main'} maxWidth="xs"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }} >
                    <>
                        <Typography variant='h5'>Admin Panel</Typography>
                        <form onSubmit={submitHandler}>
                            <TextField value={secretKey.value} onChange={secretKey.changeHandler} required fullWidth label="Secret Key" margin='normal' type='password' variant='outlined' />
                            <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }} fullWidth>Login</Button>
                        </form>
                    </>
                </Paper>

            </Container>
        </>
    )
}

export default AdminLogin