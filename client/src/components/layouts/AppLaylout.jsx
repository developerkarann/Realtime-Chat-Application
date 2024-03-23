import { Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { sampleChats } from '../../constants/sampleData'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'


const AppLaylout = () => (WrappedComponent) => {
    return (props) => {
        const param = useParams()
        const chatId = param.chatId;
        // console.log(chatId)
        const handleChatDelete = (e, _id,groupChat)=>{
            e.preventDefault()
            console.log('Delete Chat', _id, groupChat)
        }

        return (
            <>
                <Title />
                <Header />
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} height={'100%'} sx={{ display: { xs: 'none', sm: 'block' } }}  >
                           <ChatList chats={sampleChats} chatId={chatId} newMessagesAlert={[
                            {
                                chatId: chatId,
                                count: '5'
                            }
                           ]} 
                           handleChatDelete={handleChatDelete}
                        //    onlineUsers={['1','2']}
                           />
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}  >
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item md={5} lg={3} height={'100%'} sx={{
                        display: { xs: 'none', md: 'block' },
                        padding: '2rem',
                        bgcolor: 'rgba(0,0,0,0.85)'
                    }}
                    >
                        <Profile/>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default AppLaylout