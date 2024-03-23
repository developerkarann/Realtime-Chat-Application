import React from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import moment from 'moment'
import { CurvedButton, SearchInput } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'

const Dashboard = () => {

   const AppBar = <>
      <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0 ', borderRadius: '1rem' }}>
         <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
            <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />

            <SearchInput placeholder='Search...' />
            <CurvedButton>Search</CurvedButton>
            <Box flexGrow={1} />
            <Typography display={{ xs: 'none', lg: 'block' }} >{moment().format('MMM Do YYYY')}</Typography>
            <NotificationsIcon />
         </Stack>
      </Paper>
   </>

   const Widgets = <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'2rem'} justifyContent={'space-between'} alignItems={'center'} padding={'2rem 0'}>
         <Widget title={'Users'} value={23} icon={<PersonIcon />} />
         <Widget title={'chats'} value={23} icon={<GroupIcon />} />
         <Widget title={'Messages'} value={23} icon={<MessageIcon />} />
      </Stack>
   </>

   return (
      <>
         <AdminLayout>
            <Container component={'main'}>
               {AppBar}


               <Stack direction={{xs: 'column', lg: 'row'}}  flexWrap={'wrap'} justifyContent={'center'} alignItems={{xs: 'center',lg: 'stretch'}}
               sx={{gap: '2rem'}} >
                  <Paper elevation={3} sx={{ padding: '2rem 3.5rem', borderRadius: '1rem', width: '100%', maxWidth: '35rem',  }} >
                     <Typography variant='h4' margin={'2rem 0'} >Last Messages</Typography>

                     <LineChart value={[2,43,12,45]}/>

                  </Paper>

                  <Paper elevation={3} sx={{
                     padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
                     width: { xs: '100%', sm: '50%' }, position: 'relative' , maxWidth:'20rem' 
                  }}>

                    <DoughnutChart labels={['Total Chats VS Group Chat']} value={[23,66]} />

                     <Stack position={'absolute'} direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={'0.5rem'} width={'100%'} height={'100%'} >
                        <GroupIcon />  <Typography>VS</Typography> <PersonIcon />
                     </Stack>
                  </Paper>

               </Stack>


               {Widgets}
            </Container>
         </AdminLayout>
      </>
   )
}

const Widget = ({ title, value, icon }) => {
   return (<>
      <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem', width: '20rem' }} >
         <Stack alignItems={'center'} spacing={'1rem'} >
            <Typography sx={{ color: 'rgba(0,0,0,0.7)', borderRadius: '50%', border: '5px solid rgba(0,0,0,0.9)', width: '5rem', height: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
               {value}</Typography>
            <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} >
               {icon}
               <Typography>{title}</Typography>
            </Stack>
         </Stack>
      </Paper>
   </>)
}

export default Dashboard