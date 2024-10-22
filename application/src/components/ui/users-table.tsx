'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/shadcn-ui/button'
import { DataTable } from '../shadcn-ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { User } from '@/models/user'
import useUsers from '@/hooks/useUsers'



const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'userRole', header: 'Role' },
  { accessorKey: 'skillLevel', header: 'Skill Level' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'phone', header: 'Phone' },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Deactivate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function UsersTable() {
  const {
    users,
    isFecthing,
    isFetchError,
    fetchError,
    createUser,
    isCreating,
    isCreationError,
    creationError,
    updateUser,
    isUpdating,
    isUpdatingError,
    updationError,
    deleteUser,
    isDeleting,
    isDeletionError,
    deletionError,
  } = useUsers()

  return (
    <>
      {isFecthing ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={users as User[]} />
      )}
    </>
  )
}
