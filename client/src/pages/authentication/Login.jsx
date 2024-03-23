import React, { useState } from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { CameraAlt as CameraAltIcon, NearMe } from "@mui/icons-material";
import { VisuallyHiddenInput } from '../../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../../utils/Validators'

export default function Login() {

  const [isLogin, setIsLogin] = useState(true)

  const name = useInputValidation('');
  const bio = useInputValidation('');
  const username = useInputValidation('', usernameValidator);
  const password = useInputValidation('');
  // const password = useStrongPassword();

  const avatar = useFileHandler('single')


  const toggleLogin = () => {
    setIsLogin((prev) => !prev)
  }

  const handleLogin = (e) => {
    e.preventDefault()
  }
  const handleSignup = (e) => {
    e.preventDefault()
  }

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
          {
            isLogin ?
              // Login Section 

              <>
                <Typography variant='h5'>Login</Typography>
                <form onSubmit={handleLogin}>
                  <TextField required fullWidth label="username" margin='normal' variant='outlined' />
                  <TextField required fullWidth label="Password" margin='normal' type='password' variant='outlined' />
                  <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }} fullWidth>Login</Button>
                  <Typography textAlign={'center'} m={'1rem'}>Don't have an account?</Typography>

                  <Button variant='text' onClick={toggleLogin} fullWidth>Sign up</Button>
                </form>
              </>
              //
              :
              // Registeration Section 
              <>
                <Typography variant='h5'>Register</Typography>
                <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleSignup}>
                  <Stack position={'relative'} width={'10rem'} margin={'auto'} >
                    <Avatar
                      sx={{
                        width: '10rem',
                        height: '10rem',
                        objectFit: 'contain'
                      }}
                      src={avatar.preview} />
                    <IconButton sx={{ position: 'absolute', bottom: '0', right: '0', bgcolor: 'rgba(255,255,255,0.5)' }} component="label">
                      <>
                        <CameraAltIcon />
                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} ></VisuallyHiddenInput>
                      </>
                    </IconButton>
                  </Stack>
                  {
                    avatar.error && (
                      <Typography margin={'1rem'} width={'fit-content'} display={'block'} color='error' variant='caption'>
                        {avatar.error}
                      </Typography>
                    )
                  }
                  <TextField value={name.value} onChange={name.changeHandler} required fullWidth label="Name" margin='normal' variant='outlined' />
                  <TextField value={username.value} onChange={username.changeHandler} required fullWidth label="Username" margin='normal' variant='outlined' />
                  {
                    username.error && (
                      <Typography color='error' variant='caption'>
                        {username.error}
                      </Typography>
                    )
                  }
                  <TextField value={bio.value} onChange={bio.changeHandler} required fullWidth label="Bio" margin='normal' variant='outlined' />
                  <TextField value={password.value} onChange={password.changeHandler} required fullWidth label="Password" margin='normal' type='password' variant='outlined' />
                  {/* {
                            password.error && (
                              <Typography color='error' variant='caption'>
                                    {password.error}
                              </Typography>
                            )
                          } */}
                  <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }} fullWidth>Sign Up</Button>
                  <Typography textAlign={'center'} m={'1rem'}>Already have an account?</Typography>

                  <Button variant='text' onClick={toggleLogin} fullWidth>Login</Button>
                </form>
              </>
          }
        </Paper>

      </Container>
    </>
  )
}
