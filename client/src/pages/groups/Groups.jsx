import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Grid, IconButton, Tooltip, Box, Drawer, Stack, Typography, TextField, Button, Backdrop } from "@mui/material";
import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon, Edit as EditIcon, Done as DoneIcon, Delete, Add, TurnLeft } from '@mui/icons-material'
import { mateBlack } from '../../constants/color';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../../components/styles/StyledComponents'
import AvatarCard from '../../components/shared/AvatarCard';
import { sampleChats, sampleUsers } from '../../constants/sampleData'
import UserItem from '../../components/shared/UserItem';

const DeleteDialog = lazy(() => import('../../components/dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../../components/dialogs/AddMemberDialog'))


export default function Groups() {

  const [isMobileMenu, setMobileMenu] = useState(false)
  const [isEdit, setisEdit] = useState(false);
  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)


  const navigate = useNavigate()
  const chatId = useSearchParams()[0].get('group')


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
    console.log("Group deleted")
  }
  const openAddMember = () => {
    console.log('add member')
  }

  const removeMemberHandler = (id) => {
    console.log('Member Removed')
  }

  // Add member
  const isAddMember = false;

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
    console.log(groupNameUpdatedValue)
  }

  const GroupNameComponent = <>

    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} padding={'3rem'}>
      {isEdit ?
        <>
          <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupNameHandler}> <DoneIcon /> </IconButton>
        </>
        :
        <>
          <Typography variant='h4'> {groupName}</Typography>
          <IconButton onClick={() => setisEdit(true)}> <EditIcon />  </IconButton>
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


  return (
    <>
      {/* Left Container  */}
      <Grid container height={'100vh'}>

        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={4} bgcolor={'bisque'}>

          <GroupsList myGroups={sampleChats} chatId={chatId} />

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
                sampleUsers.map((data, index) => (
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
          <GroupsList w={'50vw'} myGroups={sampleChats} chatId={chatId} />

        </Drawer>


        {confirmDeleteDialog && <Suspense fallback={<Backdrop open />} ><DeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeletehandler} deleteHandler={deleteHandler} /></Suspense>}

        {isAddMember && <Suspense fallback={<Backdrop open />}>  <AddMemberDialog />   </Suspense>}

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