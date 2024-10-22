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
import { DataTableColumnHeader } from '../shadcn-ui/data-table-column-header'

const columns: ColumnDef<User>[] = [
  {
    id: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: 'Email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: 'Role',
    accessorKey: 'userRole',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    id: 'Skill Level',
    accessorKey: 'skillLevel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Level" />
    ),
  },
  {
    id: 'Age',
    accessorKey: 'age',
    // The accessor function is used to convert the data to string to enable better filtering
    accessorFn: (row) => `${row.age.toString()}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
  {
    id: 'Phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
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
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={users as User[]} />
        </div>
      )}
    </>
  )
}
