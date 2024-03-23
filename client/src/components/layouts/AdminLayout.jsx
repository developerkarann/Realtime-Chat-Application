import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { grayColor, mateBlack } from '../../constants/color'
import {
    Close as CloseIcon,
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    ManageAccounts as ManageAccountsIcon,
    Groups as GroupsIcon,
    Message as MessageIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material'
import { Navigate, useLocation } from 'react-router-dom'
import { Link } from '../styles/StyledComponents'


const Sidebar = ({ w = '100%' }) => {
    const location = useLocation()

    const adminTabs = [
        {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: <DashboardIcon />
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: <ManageAccountsIcon />
        },
        {
            name: 'Chats',
            path: '/admin/chats',
            icon: <GroupsIcon />
        },
        {
            name: 'Messages',
            path: '/admin/messages',
            icon: <MessageIcon />
        },
    ]

    const logoutHandler = () => {
        console.log("Logged out successfully")
    }

   

    return (
        <>
            <Stack direction={'column'} p={'3rem'} spacing={'3rem'} width={w}>
                <Typography variant='h4' textTransform={'uppercase'}> Admin </Typography>

                <Stack spacing={'1rem'}>
                    {
                        adminTabs.map((tab) => (
                            <Link key={tab.path} to={tab.path} sx={
                                location.pathname === tab.path && { bgcolor: mateBlack, color: 'white', ":hover": { bgcolor: mateBlack } }
                            } >
                                <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                                    {tab.icon}
                                    <Typography>{tab.name}</Typography>
                                </Stack>
                            </Link>
                        ))
                    }

                    <Link onClick={logoutHandler}>
                        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                            <ExitToAppIcon />
                            <Typography>Logout</Typography>
                        </Stack>
                    </Link>
                </Stack>
            </Stack>
        </>
    )
}

const AdminLayout = ({ children }) => {

    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => {
        setIsMobile(!isMobile)
    }

    const handleClose = () => {
        setIsMobile(false)
    }

    const isAdmin = true;

    if(!isAdmin) return <Navigate to='/admin' />

    return (
        <>
            <Grid container minHeight={'100vh'}>

                <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', right: '1rem', top: '1rem' }}>
                    <IconButton onClick={handleMobile}>
                        {
                            isMobile ? <CloseIcon /> : <MenuIcon />
                        }
                    </IconButton>
                </Box>

                <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }} >
                    <Sidebar />
                </Grid>

                <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: grayColor }}>
                    {children}
                </Grid>

                <Drawer open={isMobile} onClick={handleClose}>
                    <Sidebar w='50vw' />
                </Drawer>

            </Grid>
        </>
    )
}

export default AdminLayout