import React, { useRef } from 'react'
import AppLaylout from '../../components/layouts/AppLaylout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../../components/styles/StyledComponents'
import { grayColor, orange } from '../../constants/color'
import FileMenu from '../../components/dialogs/FileMenu'
import MessageComponent from '../../components/shared/MessageComponent'
import { sampleMessage } from '../../constants/sampleData'

const Chat = () => {
  const containerRef = useRef(null)

  const user = {
    _id: '123',
    name:'Laman'
  }

  return (
    <>
      <Stack ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
        {/* Message render   */}
 
        {
          sampleMessage.map((i,n)=>(
            <MessageComponent message={i} user={user} key={n}/>
          ))
        }


      </Stack>

      <form style={{ height: '10%' }}>

        <Stack direction={'row'} height={'100%'} padding={'0.5rem'} alignItems={'center'} position={'relative'}>
          <IconButton
            sx={{
              position: 'absolute',
              left: '1.5rem',
              rotate: '30deg',
            }} >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type a message' />

          <IconButton type='submit' sx={{
            rotate: '-30deg',
            backgroundColor: orange,
            color: 'white',
            marginLeft: '1rem',
            padding: '0.5rem',
            "&:hover": { bgcolor: "error.dark" }
          }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  )
}

export default AppLaylout()(Chat)