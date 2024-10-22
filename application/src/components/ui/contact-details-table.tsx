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
import { ContactDetails } from '@/models/contact-details'
import useContactDetails from '@/hooks/useContactDetails'
import { DataTableColumnHeader } from '../shadcn-ui/data-table-column-header'

const initialContacts: ContactDetails[] = [
  {
    id: '1',
    name: 'Alice',
    phone: '123-456-7890',
    email: 'alice@example.com',
  },
  {
    id: '2',
    name: 'Alice',
    phone: '987-654-3210',
    email: 'bob@example.com',
  },
]

const columns: ColumnDef<ContactDetails>[] = [
  {
    id: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
    id: 'Email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
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
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function ContactDetailsTable() {
  const {
    contactDetails,
    isFecthing,
    isFetchError,
    fetchError,
    createContactDetails,
    isCreating,
    isCreationError,
    creationError,
    updateContactDetails,
    isUpdating,
    isUpdatingError,
    updationError,
    deleteContactDetails,
    isDeleting,
    isDeletionError,
    deletionError,
  } = useContactDetails()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={initialContacts} />
    </div>
  )
}
