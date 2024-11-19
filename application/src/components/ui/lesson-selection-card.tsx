import { Calendar } from '@/components/shadcn-ui/calendar'
import { formatDate } from '@/lib/utils'

import { Button } from '@/components/shadcn-ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card'
import { Separator } from '@/components/shadcn-ui/separator'
import { Badge } from '../shadcn-ui/badge'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn-ui/form'
import { Textarea } from '@/components/shadcn-ui/textarea'
import { Checkbox } from '@/components/shadcn-ui/checkbox'
// import { toast } from "@/components/ui/use-toast"

import { z } from 'zod'
import { Input } from '../shadcn-ui/input'
import { ScrollArea } from '../shadcn-ui/scroll-area'
import { useState } from 'react'
import { ChartNoAxesColumnIncreasing } from 'lucide-react'
import LessonFormDrawer from './lesson-form-drawer'
import useLessons from '@/hooks/useLessons'

export default function LessonSelectionCard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [formIsOpen, setFormIsOpen] = useState(false)
  const { lessons, lessonCreation, lessonUpdation, lessonDeletion } =
    useLessons()
  const selectedLesson = undefined

  return (
    <>
      <section className="flex h-full w-full max-w-max flex-grow flex-col gap-3 overflow-hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          // REMOVE IF ADMIN / COACH
          disabled={(date) =>
            date < new Date() || date > new Date('2100-01-01')
          }
          className="max-w-max rounded-md border"
        />

        <Card className="flex w-full max-w-md flex-grow flex-col overflow-hidden">
          <CardHeader className="flex flex-col gap-2">
            <p className="flex w-full items-center justify-center">
              {date ? (
                <span>{formatDate(date ? date?.toDateString() : '')}</span>
              ) : (
                <span>Please select a date</span>
              )}
            </p>

            <Separator className="mx-auto h-0.5 w-3/4" />
          </CardHeader>
          {date && (
            <>
              <CardContent className="flex-grow space-y-4 overflow-auto">
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-3">
                  <Badge>
                    <ChartNoAxesColumnIncreasing className="mr-2 h-4 w-4" />
                    Advanced
                  </Badge>

                  <Separator className="mx-auto w-3/5" />

                  <span className="text-sm">
                    {new Date().toLocaleTimeString()} -{' '}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </CardContent>

              {/* Add button for admins / coaches only */}
              <CardFooter className="mt-3">
                <LessonFormDrawer
                  mode={selectedLesson ? 'update' : 'create'}
                  lessonToUpdate={selectedLesson ? selectedLesson : undefined}
                  trigger={<Button className="w-full">Add Lesson</Button>}
                  isOpen={formIsOpen}
                  onOpenChanged={(newValue) => setFormIsOpen(() => newValue)}
                  itemAction={selectedLesson ? lessonUpdation : lessonCreation}
                />
              </CardFooter>
            </>
          )}
        </Card>
      </section>
    </>
  )
}
