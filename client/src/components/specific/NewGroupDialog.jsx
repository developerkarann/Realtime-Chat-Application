import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp';



const NewGroupDialog = () => {

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([])

  const groupName = useInputValidation('')

  const selectMemberHandler = (id) => {

    // setMembers((prev) => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user))

    setSelectedMembers((prev) =>
      prev.includes(id) ?
        prev.filter((currentElement) => currentElement !== id)
        : [...prev, id])
  }
  //console.log(selectedMembers)
  const submitHandler = () => {

  }
  const closeHandler= ()=>{
    
  }
  return (
    <>
      <Dialog open>
        <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'}>
          <DialogTitle textAlign={'center'} variant='h4'  >New Group</DialogTitle>
          <Stack>
            <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler} />
            <Typography variant='body1' sx={{ margin: '1rem 0' }} >Members</Typography>
            {sampleUsers && sampleUsers.map((user) => (
              <UserItem user={user} key={user._id} handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)} />
            ))}
          </Stack>

          <Stack justifyContent={'space-evenly'} direction={'row'}>
            <Button variant='text' color='error'>Cancel</Button>
            <Button variant='contained' onClick={submitHandler}>Create</Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
}

export default NewGroupDialog