'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/shadcn-ui/button'
import { DataTable } from '../shadcn-ui/data-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn-ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

type Contact = {
  id: string
  name: string
  phone: string
  email: string
  address: string
}

//DUMMY DATA THAT NEEDS TO CHANGE
const initialContacts: Contact[] = [
  { id: '1', name: 'Alice', phone: '123-456-7890', email: 'alice@example.com', address: '123 Elm St' },
  { id: '2', name: 'Bob', phone: '987-654-3210', email: 'bob@example.com', address: '456 Oak St' },
]

export default function ContactDetailsTable() {
  const [data] = useState<Contact[]>(initialContacts)

  const columns: ColumnDef<Contact>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'address', header: 'Address' },
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
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return <DataTable columns={columns} data={data} />
}
