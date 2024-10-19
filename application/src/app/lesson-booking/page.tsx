'use client'

import React, { useState } from 'react'
import { Calendar } from '@/components/shadcn-ui/calendar'
import { formatDate } from '@/lib/utils'
import { Separator } from '@/components/shadcn-ui/separator'
import { Button } from '@/components/shadcn-ui/button'
import LessonBookingCard from '@/components/ui/lesson-booking-card'
import { Lesson } from '@/models/Lesson'

const exampleLesson: Lesson = {
  id: 1,
  title: 'Tennis Lesson with Coach Nick',
  description:
    'Improve your tennis skills with personalized coaching. This lesson focuses on perfecting your serve and backhand techniques. Suitable for intermediate players.',
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  // Fix contact number
  contactNumber: 1234567890,
  contactEmail: 'coach.nick@example.com',
  address: '123 Tennis Court Lane, Sportsville, SP 12345',
  paymentAmount: 75.0,
  level: 'Intermediate',
}

export default function page() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex h-screen gap-5">
      {/* Calendar and Lessons Column */}
      <section className="flex max-w-max flex-col gap-3 overflow-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="max-w-max rounded-md border"
        />
        <div className="flex h-full max-w-sm flex-col gap-2 rounded-md border p-4">
          {date ? (
            <>
              <p className="mx-auto">
                {formatDate(date ? date?.toDateString() : '')}
              </p>

              <Separator className="mx-auto h-0.5 w-3/4" />

              <div className="flex max-h-fit grow flex-col gap-20 overflow-auto bg-rose-500">
                {/* Come back to */}
                {/* <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div> */}
              </div>

              <Button>Add Lesson</Button>
            </>
          ) : (
            <p>Please select a date</p>
          )}
        </div>
      </section>

      <Separator className="my-auto h-3/4 w-0.5" />

      <LessonBookingCard lesson={exampleLesson} />

      <Separator className="my-auto h-3/4 w-0.5" />

      {/* Upcoming Lessons Section */}
      <div className="flex h-full w-72 max-w-xs flex-col gap-2 rounded-md border p-4">
        <p className="mx-auto">Your Upcoming Lessons</p>

        <Separator className="mx-auto h-0.5 w-3/4" />

        <div className="flex max-h-fit grow flex-col gap-20 overflow-auto bg-rose-500">
          {/* Come back to */}
          {/* <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div>
              <div className="bg-blue-500">Item 1</div> */}
        </div>
      </div>
    </div>
  )
}
