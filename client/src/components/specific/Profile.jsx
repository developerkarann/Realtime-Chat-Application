import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon , AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon} from '@mui/icons-material'
import moment from 'moment'
const Profile = () => {
  return (
    <>
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar sx={{
        width: 200,
        height: 200,
        objectFit: 'contain',
        marginBottom: '1rem',
        border: '3px solid white'
      }} />
    <ProfileCard heading={'Name'} text={'Karan Pal'} Icon={<FaceIcon/>} />
    <ProfileCard heading={'Username'} text={'developerkrnn'} Icon={<UsernameIcon/>} />
    <ProfileCard heading={'bio'} text={'this is a random text'}  />
    <ProfileCard heading={'Joined'} text={moment('2023-11-04t18:30:00.00Z').fromNow()} Icon={<CalendarIcon/>} />
    </Stack>
    </>
  )
}

const ProfileCard = ({text,Icon,heading}) =>{
    return(
        <>
          <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} color={'white'} textAlign={'center'}>
              {Icon && Icon}

              <Stack>
                <Typography variant='body1'>{text}</Typography>
                <Typography color={'gray'} variant='caption'>{heading}</Typography>
              </Stack>
          </Stack>
        </>
    )
}
export default Profile