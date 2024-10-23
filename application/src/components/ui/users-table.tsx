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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { User } from '@/models/user'
import useUsers from '@/hooks/useUsers'
import { DataTableColumnHeader } from '../shadcn-ui/data-table-column-header'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer'

import { Separator } from '../shadcn-ui/separator'
import UserFormDrawer from './user-form-drawer'
import DeletionDialog from './deletion-dialog'

import { toast } from 'sonner'

// import { Drawer } from 'vaul'

export default function UsersTable() {
  const [isTableFormOpen, setIsTableFormOpen] = useState(false)

  const {
    userRetrieval,
    userCreation,
    userUpdation,
    userDeletion,
    // users,
    // isFecthing,
    // isFetchError,
    // fetchError,
    // createUser,
    // isCreating,
    // isCreationError,
    // creationError,
    // updateUser,
    // isUpdating,
    // isUpdatingError,
    // updationError,
    // deleteUser,
    // isDeleting,
    // isDeletionError,
    // deletionError,
  } = useUsers()

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
      cell: ({ row }) => {
        const [formIsOpen, setFormIsOpen] = useState(false)
        const [deletionDialogIsOpen, setDeletionDialogIsOpen] = useState(false)

        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setFormIsOpen(() => true)}>
                  <Pencil className="mr-1 size-4" />
                  Update User
                </DropdownMenuItem>
                {/* </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={() => setDeletionDialogIsOpen(() => true)}
                >
                  <Trash2 className="mr-1 size-4" />
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DeletionDialog
              nameOfData="user"
              dataToDelete={row.original}
              dialogTrigger={<p></p>}
              isOpen={deletionDialogIsOpen}
              onOpenChanged={setDeletionDialogIsOpen}
              itemDeletion={userDeletion}
            />

            <UserFormDrawer
              mode="update"
              userToUpdate={row.original}
              trigger={<p></p>}
              isOpen={formIsOpen}
              onOpenChanged={(newValue) => setFormIsOpen(() => newValue)}
              itemAction={userUpdation}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="py-10">
      <Card>
        <CardHeader className="flex w-full items-center justify-center">
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage all of your users here</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mx-auto my-2 w-1/4" />

          <div className="container mx-auto">
            <DataTable
              columns={columns}
              data={
                typeof userRetrieval.data === 'undefined'
                  ? []
                  : userRetrieval.data
              }
              isLoading={userRetrieval.isLoading}
              isError={userRetrieval.isError}
              error={userRetrieval.error}
              addItemForm={
                <UserFormDrawer
                  itemAction={userCreation}
                  isOpen={isTableFormOpen}
                  onOpenChanged={(newValue) =>
                    setIsTableFormOpen(() => newValue)
                  }
                />
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
