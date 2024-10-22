'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/shadcn-ui/button'
import { DataTable } from '../shadcn-ui/data-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn-ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
}

//DUMMY DATA THAT NEEDS TO CHANGE
const initialUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'Coach', status: 'Inactive' },
]

export default function UsersTable() {
  const [data] = useState<User[]>(initialUsers)

  const columns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
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

  return <DataTable columns={columns} data={data} />
}
