'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/shadcn-ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select'

import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/components/shadcn-ui/drawer'
import { CalendarIcon, CirclePlus, Loader2, Pencil } from 'lucide-react'
import { ReactNode } from 'react'
import { UseMutationResult } from '@tanstack/react-query'
import { Textarea } from '../shadcn-ui/textarea'
import { Lesson } from '@/models/Lesson'
import { compareAsc, format, isAfter } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover'
import { Calendar } from '../shadcn-ui/calendar'
import { TimePicker } from './time-picker'

const lessonSchema = z
  .object({
    title: z.string().min(2, {
      message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
    }),
    date: z.date({
      required_error: 'A date is required.',
    }),
    startTime: z.coerce.date({
      required_error: 'Start time is required.',
    }),
    endTime: z.coerce.date({
      required_error: 'End time is required.',
    }),
    contactNumber: z.string().min(1, { message: 'Contact number is required' }),
    contactEmail: z.string().email({
      message: 'Invalid email address.',
    }),
    address: z.string().min(5, {
      message: 'Address must be at least 5 characters.',
    }),
    paymentAmount: z.number().positive(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  })
  // The following refine was adapted from youtube.com
  // Author: Leigh Halliday (https://www.youtube.com/@leighhalliday)
  // Link: https://www.youtube.com/watch?v=_K34O0NcKAM
  .refine((data) => isAfter(data.endTime, data.startTime), {
    message: "End can't be before Start",
    path: ['endTime'],
  })

interface Props {
  mode?: 'create' | 'update'
  lessonToUpdate?: Lesson
  trigger?: ReactNode
  isOpen?: boolean
  onOpenChanged?: (open: boolean) => void
  itemAction: UseMutationResult<void, Error, Lesson, unknown>
}

export default function LessonFormDrawer({
  mode = 'create',
  lessonToUpdate,
  trigger,
  isOpen,
  onOpenChanged,
  itemAction,
}: Props) {
  // const form = useForm<Lesson>({
  //   resolver: zodResolver(paymentDetailsSchema),
  //   defaultValues:
  //     mode === 'update' && paymentDetailsToUpdate
  //       ? { paymentDetails: paymentDetailsToUpdate?.paymentDetails }
  //       : { paymentDetails: '' },
  // })

  const form = useForm<Lesson>({
    resolver: zodResolver(lessonSchema),
    defaultValues:
      mode === 'update' && lessonToUpdate
        ? {
            title: lessonToUpdate.title,
            description: lessonToUpdate.description,
            date: lessonToUpdate.date,
            startTime: lessonToUpdate.startTime,
            endTime: lessonToUpdate.endTime,
            contactNumber: lessonToUpdate.contactEmail,
            contactEmail: lessonToUpdate.contactEmail,
            address: lessonToUpdate.address,
            paymentAmount: lessonToUpdate.paymentAmount,
            level: lessonToUpdate.level,
          }
        : {
            title: '',
            description: '',
            date: new Date(),
            // startTime: new Date(),
            // endTime: new Date(),
            contactNumber: '',
            contactEmail: '',
            address: '',
            paymentAmount: 0,
            level: 'Beginner',
          },
  })

  const onSubmit = (data: Lesson) => {
    data.startTime.setDate(data.date.getDate())
    data.startTime.setMonth(data.date.getMonth())
    data.startTime.setFullYear(data.date.getFullYear())

    data.endTime.setDate(data.date.getDate())
    data.endTime.setMonth(data.date.getMonth())
    data.endTime.setFullYear(data.date.getFullYear())

    console.log(data)

    if (mode === 'create') itemAction.mutate(data)
    else if (lessonToUpdate) {
      data.id = lessonToUpdate?.id
      itemAction.mutate(data)
    }

    form.reset()

    if (itemAction.isIdle && !itemAction.isError && onOpenChanged) {
      onOpenChanged(false)
    }
  }

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={onOpenChanged}>
      <DrawerTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button size="sm" className="hidden h-8 lg:flex">
            <CirclePlus className="mr-1 size-4" />
            Add a Lesson
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent
        className="fixed inset-x-auto bottom-2 left-2 top-2 mt-0 flex w-[350px] rounded-md outline-none after:!content-none"
        style={
          {
            '--initial-transform': 'calc(100% + 8px)',
          } as React.CSSProperties
        }
      >
        <DrawerHeader>
          <DrawerTitle>
            {mode === 'create' ? 'Add a' : 'Update'} Lesson
          </DrawerTitle>
          <DrawerDescription>
            Fill in the following fields to{' '}
            {mode === 'create'
              ? 'add a new lesson'
              : 'update a lessons details'}
          </DrawerDescription>
        </DrawerHeader>

        <div className="h-full overflow-auto p-5">
          <Form {...form}>
            <form className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Lesson title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the title of the lesson.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the lesson"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of the lesson.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={`w-[240px] pl-3 text-left font-normal ${
                              !field.value && 'text-muted-foreground'
                            }`}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date > new Date('2100-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the date for the lesson.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <TimePicker
                          date={field.value}
                          setDate={field.onChange}
                          {...field}
                        />

                        {/* <Input
                          type="time"
                          {...field}
                          // The "value" fix was taken from github.com
                          // Author: rafael-jordao (https://github.com/rafael-jordao)
                          // Link: https://github.com/shadcn-ui/ui/issues/2385
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split('T')[0]
                              : field.value
                          }
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <TimePicker
                          date={field.value}
                          setDate={field.onChange}
                          {...field}
                        />

                        {/* <Input
                          type="time"
                          {...field}
                          // The "value" fix was taken from github.com
                          // Author: rafael-jordao (https://github.com/rafael-jordao)
                          // Link: https://github.com/shadcn-ui/ui/issues/2385
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split('T')[0]
                              : field.value
                          }
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DrawerFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={itemAction.isPending}
          >
            {mode === 'create' ? (
              itemAction.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Adding Payment Details...</span>
                </>
              ) : (
                <>
                  <CirclePlus className="mr-1 size-4" />
                  <span>Add Payment Details</span>
                </>
              )
            ) : itemAction.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Updating Payment Details...</span>
              </>
            ) : (
              <>
                <Pencil className="mr-1 size-4" />
                <span>Update Payment Details</span>
              </>
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
