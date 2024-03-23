import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import Table from '../../components/specific/Table'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import { transformImage } from '../../lib/features'

const UserManagement = () => {
  const [rows, setRows] = useState([])
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'table-header',
      width: 200
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      headerClassName: 'table-header',
      width: 100,
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.row.avatar} />
      )
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'table-header',
      width: 150
    },
    {
      field: 'username',
      headerName: 'Username',
      headerClassName: 'table-header',
      width: 200
    },
    {
      field: 'friends',
      headerName: 'Friends',
      headerClassName: 'table-header',
      width: 150
    },
    {
      field: 'groups',
      headerName: 'Groups',
      headerClassName: 'table-header',
      width: 200
    },
  ]

  useEffect(() => {
    setRows(dashboardData.users.map((i) => ({ ...i, id: i._id , avatar: transformImage(i.avatar,50)})))
  }, [])

  return (
    <AdminLayout>
      <Table columns={columns} rows={rows} heading={'All Users'} />
    </AdminLayout>
  )
}

export default UserManagement