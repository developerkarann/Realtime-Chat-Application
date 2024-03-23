import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([])


    const selectMemberHandler = (id) => {
        // setMembers((prev) => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user))
        setSelectedMembers((prev) =>
            prev.includes(id) ?
                prev.filter((currentElement) => currentElement !== id)
                : [...prev, id])
    }


    const closeHandler = () => {
        setMembers([])
        setSelectedMembers([])
    }
    const addMemberSubmitHandler = () => {
         closeHandler()
    }

    return (
        <>
            <Dialog open onClose={closeHandler}>
                <Stack p={'2rem'} spacing={'2rem'} width={'20rem'}  >
                    <DialogTitle textAlign={'center'}>Add Members</DialogTitle>

                    <Stack>
                        {
                            members.length > 0 ? members.map((data, index) => {
                                return (
                                    <UserItem key={index} user={data} handler={selectMemberHandler} isAdded={selectedMembers.includes(data._id)} />
                                )
                            }) : <Typography textAlign={'center'}>No Friends</Typography>
                        }
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                        <Button color='error' onClick={closeHandler}>Cancel</Button>
                        <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMember} > Submit</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    )
}

export default AddMemberDialog