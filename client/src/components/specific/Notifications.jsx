import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAcceptRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc';

const Notifications = () => {

  const { isLoading, data, error, isError } = useGetNotificationsQuery()
  const { isNotification } = useSelector((state) => state.misc)
  const disptach = useDispatch()

  const [acceptRequest] = useAsyncMutation(useAcceptRequestMutation)

  const friendRequesthandler = async ({ _id, accept }) => {
    //Add friend request handler
    disptach(setIsNotification(false))

    await acceptRequest('Accepting..', { requestId: _id, accept })

  }

  const closeHandler = () => {
    disptach(setIsNotification(false))
  }


  useErrors([{ isError, error }])



  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '3rem' }} maxWidth={'50rem'}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? <Skeleton /> :
            <>
              {
                data?.allRequests?.length > 0 ? (
                  data?.allRequests?.map((i) => <NotificationItem sender={i.sender} _id={i._id} handler={friendRequesthandler} key={i._id} />)
                )
                  :
                  (<Typography textAlign={'center'}>0 Notifications</Typography>)
              }
            </>
        }
      </Stack>
    </Dialog>
  )
};


const NotificationItem = memo(({ sender, _id, handler }) => {

  const { name, avatar } = sender

  return (
    <>
      <ListItem >
        <Stack direction={'row'} alignContent={'center'} spacing={'1rem'} width={'100%'} >
          <Avatar src={avatar} />
          <Typography variant='body1' sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '1005'
          }}>{`${name} send you a friend request`}</Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <Button onClick={() => handler({ _id, accept: true })} > Accept </Button>
            <Button color='error' onClick={() => handler({ _id, accept: false })}> Reject </Button>
          </Stack>


        </Stack>
      </ListItem>
    </>
  )
})

export default Notifications