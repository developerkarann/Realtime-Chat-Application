import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'

const Search = () => {

  const search = useInputValidation('')

  const [users, setUsers] = useState(sampleUsers);
 
  const addFriendHandler = (id) => {
    console.log(id)
  }

  let isLoadingSendFriendRequest = false


  return (
    <>
      <Dialog open>
        <Stack p={'2rem'} direction={'column'} width={'25rem'}>
          <DialogTitle textAlign={'center'}>Find People</DialogTitle>
          <TextField label='' value={search.value} onChange={search.changeHandler} variant='outlined' size='small'
            inputProps={{
              startadorment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }} />

          <List>
            {users && users.map((user) => (
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoaidng={isLoadingSendFriendRequest} />
            ))}
          </List>
        </Stack>
      </Dialog>
    </>
  )
}

export default Search