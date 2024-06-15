import { Drawer, Grid, Skeleton } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events'
import { useErrors, useSocket, useSocketEvents } from '../../hooks/hook'
import { getOrSaveFromLocalStorage } from '../../lib/features'
import { useMyChatsQuery } from '../../redux/api/api'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat'
import { setIsDeleteMenu, setIsMobileMenu, setSelectedDeleteChat } from '../../redux/reducers/misc'
import DeleteChatMenuDialog from '../dialogs/DeleteChatMenuDialog'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'


const AppLaylout = () => (WrappedComponent) => {

    return (props) => {
        const dispatch = useDispatch()
        const { isMobileMenu } = useSelector((state) => state.misc)
        const { user } = useSelector((state) => state.auth)
        const { newMessagesAlert } = useSelector((state) => state.chat)

        const param = useParams()
        const navigate = useNavigate()
        const chatId = param.chatId;

        const deleteMenuAnchor = useRef(null)

        const [socket] = useSocket()

        const [onlineUsers, setOnlineUsers] = useState([])


        const { isLoading, data, isError, error, refetch } = useMyChatsQuery('')
        useErrors([{ isError, error }])


        const handleChatDelete = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({ chatId, groupChat }))
            deleteMenuAnchor.current = e.currentTarget;
        }

        const handleMobileClose = () => {
            dispatch(setIsMobileMenu(false))
        }

        const newMessageAlertHandler = useCallback((data) => {
            if (data.chatId === chatId) {
                return;
            }
            dispatch(setNewMessagesAlert(data))
        }, [chatId])
        const newRequestHandler = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch])


        const refetchListner = useCallback(() => {
            refetch()
            navigate('/')
        }, [refetch])

        const onlineUsersListner = useCallback((data) => {
            setOnlineUsers(data)
        }, [])

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
            [NEW_REQUEST]: newRequestHandler,
            [REFETCH_CHATS]: refetchListner,
            [ONLINE_USERS]: onlineUsersListner
        }

        useSocketEvents(socket, eventHandlers)

        useEffect(() => {
            getOrSaveFromLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])


        return (
            <>
                <Title />
                <Header />
                <DeleteChatMenuDialog dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor.current} />
                {
                    isLoading ? <Skeleton /> :
                        <Drawer open={isMobileMenu} onClose={handleMobileClose}>
                            <ChatList
                                w="70vw"
                                chats={data?.chats}
                                chatId={chatId}
                                handleChatDelete={handleChatDelete}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                        </Drawer>
                }

                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} height={'100%'} sx={{ display: { xs: 'none', sm: 'block' } }}  >

                        <ChatList chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert}
                            onlineUsers={onlineUsers}
                            handleChatDelete={handleChatDelete}
                        />

                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}  >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid item md={5} lg={3} height={'100%'} sx={{
                        display: { xs: 'none', md: 'block' },
                        padding: '2rem',
                        bgcolor: 'rgba(0,0,0,0.85)'
                    }}
                    >
                        <Profile user={user} />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default AppLaylout