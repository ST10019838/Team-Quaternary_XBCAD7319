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
import { PaymentDetails } from '@/models/payment-details'
import usePaymentDetails from '@/hooks/usePaymentDetails'
import { DataTableColumnHeader } from '../shadcn-ui/data-table-column-header'

//DUMMY DATA THAT NEEDS TO CHANGE
// const initialPayments: PaymentDetails[] = [
//   { id: '1', user: 'Alice', amount: 100, date: '2024-10-20', status: 'Paid' },
//   { id: '2', user: 'Bob', amount: 200, date: '2024-10-21', status: 'Pending' },
// ]

const columns: ColumnDef<PaymentDetails>[] = [
  // { accessorKey: 'user', header: 'User' },
  // { accessorKey: 'amount', header: 'Amount' },
  // { accessorKey: 'date', header: 'Date' },
  // { accessorKey: 'status', header: 'Status' },
  {
    id: 'Payment Details',
    accessorKey: 'paymentDetails',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Details" />
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
          <DropdownMenuItem>Edit Payment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function PaymentDetailsTable() {
  const {
    paymentDetails,
    isFetching,
    isFetchError,
    fetchError,
    createPaymentDetails,
    isCreating,
    isCreationError,
    creationError,
    updatePaymentDetails,
    isUpdating,
    isUpdatingError,
    updationError,
    deletePaymentDetails,
    isDeleting,
    isDeletionError,
    deletionError,
  } = usePaymentDetails()

  console.log(paymentDetails)

  return (
    <>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={paymentDetails as PaymentDetails[]}
          />
        </div>
      )}
    </>
  )
}
