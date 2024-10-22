'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/shadcn-ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { DataTable } from '../shadcn-ui/data-table'
import { useState } from 'react'
import { Horse } from '@/models/horse'
import useHorses from '@/hooks/useHorses'
import { DataTableColumnHeader } from '../shadcn-ui/data-table-column-header'

// Sample data for horses
const initialData: Horse[] = [
  {
    id: 'horse1',
    name: 'Thunder',
    age: 7,
    breed: 'Arabian',
    yearsWorked: 3,
    skillLevel: 'Advanced',
    createdBy: 'John Doe',
  },
  {
    id: 'horse2',
    name: 'Lightning',
    age: 5,
    breed: 'Thoroughbred',
    yearsWorked: 2,
    skillLevel: 'Intermediate',
    createdBy: 'Jane Smith',
  },
  {
    id: 'horse3',
    name: 'Shadow',
    age: 8,
    breed: 'Quarter Horse',
    yearsWorked: 4,
    skillLevel: 'Beginner',
    createdBy: 'Tom Johnson',
  },
]

const columns: ColumnDef<Horse>[] = [
  {
    id: 'Created By',
    accessorKey: 'createdBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    id: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: 'Breed',
    accessorKey: 'breed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Breed" />
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
    cell: ({ row }) => <div className="text-center">{row.original.age}</div>,
  },
  {
    id: 'Years Worked',
    accessorKey: 'yearsWorked',
    // The accessor function is used to convert the data to string to enable better filtering
    accessorFn: (row) => `${row.yearsWorked.toString()}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Years Worked" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.yearsWorked}</div>
    ),
  },
  {
    id: 'Skill Level',
    accessorKey: 'skillLevel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Level" />
    ),
    cell: ({ row }) => {
      const horse = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {horse.skillLevel}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
            // onClick={() => handleSkillChange(horse.id, 'Beginner')}
            >
              Beginner
            </DropdownMenuItem>
            <DropdownMenuItem
            // onClick={() => handleSkillChange(horse.id, 'Intermediate')}
            >
              Intermediate
            </DropdownMenuItem>
            <DropdownMenuItem
            // onClick={() => handleSkillChange(horse.id, 'Advanced')}
            >
              Advanced
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const horse = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(horse.id)}
            >
              Copy horse ID
            </DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Contact owner</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function HorsesTable() {
  const [data, setData] = useState<Horse[]>(initialData)

  const {
    horses,
    isFecthing,
    isFetchError,
    fetchError,
    createHorse,
    isCreating,
    isCreationError,
    creationError,
    updateHorse,
    isUpdating,
    isUpdatingError,
    updationError,
    deleteHorse,
    isDeleting,
    isDeletionError,
    deletionError,
  } = useHorses()

  const handleSkillChange = (id: string, newSkill: Horse['skillLevel']) => {
    setData((prevData) =>
      prevData.map((horse) =>
        horse.id === id ? { ...horse, skillLevel: newSkill } : horse
      )
    )
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={initialData} />
    </div>
  )
}
