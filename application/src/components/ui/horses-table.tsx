"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/shadcn-ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import { Input } from "@/components/shadcn-ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table"

// Sample data for horses
const initialData: Horse[] = [
  {
    id: "horse1",
    name: "Thunder",
    age: 7,
    breed: "Arabian",
    yearsWorked: 3,
    skillLevel: "Advanced",
    createdBy: "John Doe",
  },
  {
    id: "horse2",
    name: "Lightning",
    age: 5,
    breed: "Thoroughbred",
    yearsWorked: 2,
    skillLevel: "Intermediate",
    createdBy: "Jane Smith",
  },
  {
    id: "horse3",
    name: "Shadow",
    age: 8,
    breed: "Quarter Horse",
    yearsWorked: 4,
    skillLevel: "Beginner",
    createdBy: "Tom Johnson",
  },
]

export type Horse = {
  id: string
  name: string
  age: number
  breed: string
  yearsWorked: number
  skillLevel: "Beginner" | "Intermediate" | "Advanced"
  createdBy: string
}

export default function HorsesTable() {
  const [data, setData] = React.useState<Horse[]>(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Function to update the skill level of a horse
  const handleSkillChange = (id: string, newSkill: Horse["skillLevel"]) => {
    setData((prevData) =>
      prevData.map((horse) =>
        horse.id === id ? { ...horse, skillLevel: newSkill } : horse
      )
    )
  }

  const columns: ColumnDef<Horse>[] = [
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "breed",
      header: "Breed",
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => <div className="text-center">{row.getValue("age")}</div>,
    },
    {
      accessorKey: "yearsWorked",
      header: "Years Worked",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("yearsWorked")}</div>
      ),
    },
    {
      accessorKey: "skillLevel",
      header: "Skill Level",
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
              <DropdownMenuItem onClick={() => handleSkillChange(horse.id, "Beginner")}>
                Beginner
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSkillChange(horse.id, "Intermediate")}>
                Intermediate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSkillChange(horse.id, "Advanced")}>
                Advanced
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
    {
      id: "actions",
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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-4">
      <div className="border rounded-md p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4 py-4">
          <h2 className="font-bold text-lg">Horses</h2>
          <Input
            placeholder="Filter by creator..."
            value={(table.getColumn("createdBy")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("createdBy")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto flex space-x-2">
            <Button variant="outline">Search</Button>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Add Horse</Button>
          </div>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table className="w-full min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="flex-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="flex-1">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>
      </div>
    </div>
  )
}
