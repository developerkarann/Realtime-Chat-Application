import { Add, Delete, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutLoader } from "../../components/layouts/Loaders";
import AvatarCard from '../../components/shared/AvatarCard';
import UserItem from '../../components/shared/UserItem';
import { Link } from '../../components/styles/StyledComponents';
import { mateBlack } from '../../constants/color';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../../redux/api/api';
import { setIsAddMember } from '../../redux/reducers/misc';

const DeleteDialog = lazy(() => import('../../components/dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../../components/dialogs/AddMemberDialog'))


export default function Groups() {
  const chatId = useSearchParams()[0].get('group')
  const dispatch = useDispatch()


  const { isAddMember } = useSelector((state) => state.misc)

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

  const [renameGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)


  const [isMobileMenu, setMobileMenu] = useState(false)
  const [isEdit, setisEdit] = useState(false);
  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [members, setMembers] = useState([])


  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error
    }
  ]

  useErrors(errors)


  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name)
      setMembers(groupDetails.data.chat.members)
    }

    return () => {
      setGroupName('');
      setGroupNameUpdatedValue('')
      setMembers([])
      setisEdit(false)
    }
  }, [groupDetails.data])



  const navigate = useNavigate()


  const navigateBack = () => {
    navigate('/')
  }
  const handleMobile = () => {
    setMobileMenu((prev) => !prev);
  }
  const handleMobileClose = () => {
    setMobileMenu(false)
  }
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeletehandler = () => {
    setConfirmDeleteDialog(false)
  }
  const deleteHandler = () => {
    deleteGroup('Deleteing group...', chatId)
    closeConfirmDeletehandler()
    navigate('/groups')
  }
  const openAddMember = () => {
    dispatch(setIsAddMember(true))
  }

  const removeMemberHandler = (userId) => {
    removeMember('Removing members', { chatId, userId })
  }


  const IconsButtons = <>
    <Box sx={{ display: { xs: 'block', sm: 'none', position: 'fixed', right: '1rem', top: '1rem' } }}>

      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>

    </Box>

    <Tooltip title="back">
      <IconButton sx={{ position: 'absolute', top: '2rem', left: "2rem", bgcolor: mateBlack, "&:hover": { bgcolor: 'rgba(0,0,0,0.7)' }, color: 'white' }} onClick={navigateBack}>
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>

  const updateGroupNameHandler = () => {
    setisEdit(false)
    renameGroup('Updating group name...', { chatId, name: groupNameUpdatedValue })
  }

  const GroupNameComponent = <>

    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} padding={'3rem'}>
      {isEdit ?
        <>
          <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupNameHandler} disabled={isLoadingGroupName} > <DoneIcon /> </IconButton>
        </>
        :
        <>
          <Typography variant='h4'> {groupName}</Typography>
          <IconButton onClick={() => setisEdit(true)} disabled={isLoadingGroupName} > <EditIcon />  </IconButton>
        </>}
    </Stack>
  </>

  const ButtonGroup = <>
    <Stack direction={{ sx: 'column-reverse', sm: 'row' }} p={{ xs: '0', sm: '1rem', md: '1rem 4rem' }}>
      <Button size='large' color='error' startIcon={<Delete />} onClick={openConfirmDeleteHandler} >Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<Add />} onClick={openAddMember} >Add Members</Button>
    </Stack>
  </>


  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue('')
      setisEdit(false);
    }
  }, [chatId])


  return myGroups.isLoading ? <LayoutLoader /> : (
    <>
      {/* Left Container  */}
      <Grid container height={'100vh'}>

        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={4} bgcolor={'bisque'}>

          <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />

        </Grid>

        {/* Right Container  */}

        <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', padding: '1rem 3rem', }}>

          {IconsButtons}

          {groupName && <>
            {GroupNameComponent}
            <Typography margin={'2rem'} alignSelf={'flex-start'} variant='body1' >Members</Typography>

            <Stack maxWidth={'45rem'} width={'100%'} boxSizing={'border-box'} spacing={'2rem'} height={'50vh'} overflow={'auto'} padding={{ sm: '1rem', xs: '0', md: '1rem, 4rem', }}>

              {/* Group Members  */}

              {
                isLoadingRemoveMember ? (<CircularProgress />) : members.map((data, index) => (
                  <UserItem user={data} isAdded key={index} handler={removeMemberHandler}
                    styling={{
                      boxShadow: '0 0 0.2rem rgba(0,0,0.2)',
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                    }} />
                ))
              }


            </Stack>

            {ButtonGroup}
          </>}



        </Grid>

        <Drawer sx={{ display: { xs: 'block', sm: 'none' } }} open={isMobileMenu} onClose={handleMobileClose}>
          <GroupsList w={'50vw'} myGroups={myGroups?.data?.groups} chatId={chatId} />

        </Drawer>


        {confirmDeleteDialog && <Suspense fallback={<Backdrop open />} ><DeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeletehandler} deleteHandler={deleteHandler} /></Suspense>}

        {isAddMember && <Suspense fallback={<Backdrop open />}>  <AddMemberDialog chatId={chatId} />   </Suspense>}

      </Grid>

    </>
  )
}


const GroupsList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <>
      <Stack width={w} height={'100vh'} overflow={'auto'}>
        {
          myGroups.length > 0 ? myGroups.map((group) => (
            <GroupListItem group={group} chatId={chatId} key={group._id} />
          )) : <Typography textAlign={'center'} padding={'1rem'} >No Groups</Typography>
        }
      </Stack>
    </>
  )
}


const GroupListItem = memo(({ group, chatId }) => {

  const { name, avatar, _id } = group;

  return (
    <>
      <Link to={`?group=${_id}`} onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault()
        }
      }} >
        <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
          <AvatarCard avatar={avatar} />
          <Typography>{name}</Typography>
        </Stack>
      </Link>
    </>
  )

})