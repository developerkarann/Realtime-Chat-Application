import React, { useCallback, useRef, useState } from 'react'
import AppLaylout from '../../components/layouts/AppLaylout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../../components/styles/StyledComponents'
import { grayColor, orange } from '../../constants/color'
import FileMenu from '../../components/dialogs/FileMenu'
import MessageComponent from '../../components/shared/MessageComponent'
import { sampleMessage } from '../../constants/sampleData'
import { useErrors, useSocket, useSocketEvents } from '../../hooks/hook'
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS, START_TYPING, STOP_TYPING } from '../../constants/events'
import { useChatDetailsQuery, useGetOldMessagesQuery, useMyChatsQuery } from '../../redux/api/api'
import { useEffect } from 'react'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu } from '../../redux/reducers/misc'
import { incrementNotification, removeNewMessagesAlert, setNewMessagesAlert } from '../../redux/reducers/chat'
import { getOrSaveFromLocalStorage } from '../../lib/features'
import { TypingLoader } from '../../components/layouts/Loaders'
import { useNavigate } from 'react-router-dom'

const Chat = ({ chatId, user }) => {

  const containerRef = useRef(null)
  const bottomRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [socket] = useSocket()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [page, setpage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [IamTyping, setIamTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)

  const typingTimeOut = useRef(null)



  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })

  const oldMessageChunks = useGetOldMessagesQuery({ chatId, page })

  const { refetch } = useMyChatsQuery('')

  const { newMessagesAlert } = useSelector((state) => state.chat)


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunks.data?.totalPages,
    page,
    setpage,
    oldMessageChunks.data?.message
  )

  const errors = [
    {
      isError: chatDetails.isError,
      error: chatDetails.error
    },
    {
      isError: oldMessageChunks.isError,
      error: oldMessageChunks.error
    },
  ]


  const members = chatDetails?.data?.chat?.members


  const messageOnChange = (e) => {
    setMessage(e.target.value)

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId })
      setIamTyping(true)
    }

    if (typingTimeOut.current) clearTimeout(typingTimeOut.current)

    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIamTyping(false)
    }, 1000);

  }

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  //Emiting mesasge to members and server
  const submitHandler = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage('')
  }


  const newMessageHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages(prev => [...prev, data.message])
  }, [chatId])


  const newRequestHandler = useCallback(() => {
    dispatch(incrementNotification())

  }, [dispatch])

  const newMessageAlertHandler = useCallback((data) => {
    if (data.chatId === chatId) {
      return;
    }
    dispatch(setNewMessagesAlert(data))
  }, [])

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(true)
  }, [chatId])

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(false)
  }, [chatId])

  const alertListener = useCallback((data) => {

    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "123456789012",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date()
    }
    setMessages(prev => [...prev, messageForAlert])
  }, [chatId])

  const refetchListner = useCallback(() => {
    refetch()
    navigate('/')
  }, [refetch])

  const eventHandlers = {
    [NEW_MESSAGE]: newMessageHandler,
    [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT]: alertListener,
    [REFETCH_CHATS]: refetchListner,
  }

  useSocketEvents(socket, eventHandlers)

  useErrors(errors)

  const allMessages = [...oldMessages, ...messages]


  useEffect(() => {
    socket.emit(CHAT_JOINED, {userId: user?.data?._id, members})
    dispatch(removeNewMessagesAlert({ chatId }))
    return () => {
      setMessage('');
      setMessages([]);
      setOldMessages([]);
      setpage(1);
      socket.emit(CHAT_LEAVED, {userId: user?.data?._id, members})
    }
  }, [chatId, socket])

  useEffect(() => {
    if (chatDetails.isError) {
      navigate('/')
    }
  }, [chatDetails.isError])

  useEffect(() => {
    getOrSaveFromLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
  }, [newMessagesAlert])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])


  return chatDetails.isLoading ? <Skeleton /> : (
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
          allMessages.map((i, n) => (
            <MessageComponent message={i} user={user.data} key={n} />
          ))
        }

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />


      </Stack>

      <form style={{ height: '10%' }} onSubmit={submitHandler}>

        <Stack direction={'row'} height={'100%'} padding={'0.5rem'} alignItems={'center'} position={'relative'}>
          <IconButton
            sx={{
              position: 'absolute',
              left: '1.5rem',
              rotate: '30deg',
            }} onClick={handleFileOpen} >
            <AttachFileIcon o />
          </IconButton>

          <InputBox placeholder='Type a message...' value={message} onChange={messageOnChange} />

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

      <FileMenu ancherE1={fileMenuAnchor} chatId={chatId} />
    </>
  )
}

export default AppLaylout()(Chat)