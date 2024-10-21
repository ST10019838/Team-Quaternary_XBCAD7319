'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/shadcn-ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { DataTable } from '../shadcn-ui/data-table'
import { Address } from '@/models/address'
import useAddresses from '@/hooks/useAddresses'

// Sample data for addresses in Pretoria, South Africa
const data: Address[] = [
  { id: 1, address: '123 Le Roux Avenue, Midrand, Gauteng' },
  { id: 2, address: '456 Old Pretoria Main Road, Midrand, Gauteng' },
  { id: 3, address: '789 New Road, Midrand, Gauteng' },
  { id: 4, address: '101 Main Road, Midrand, Gauteng' },
  { id: 5, address: '202 Allandale Road, Midrand, Gauteng' },
]

export const columns: ColumnDef<Address>[] = [
  {
    accessorKey: 'id',
    header: 'Number',
    cell: ({ row }) => <div className="text-left">{row.original.id}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit address</DropdownMenuItem>
            <DropdownMenuItem>Delete address</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function AddressesTable() {
  const {
    address,
    isFecthing,
    isFetchError,
    fetchError,
    createAddress,
    isCreating,
    isCreationError,
    creationError,
    updateAddress,
    isUpdating,
    isUpdatingError,
    updationError,
    deleteAddress,
    isDeleting,
    isDeletionError,
    deletionError,
  } = useAddresses()

  console.log(address)
  console.log(isFecthing)
  console.log(isFetchError)
  console.log(fetchError)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
