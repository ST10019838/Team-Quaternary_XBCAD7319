import {
  Calendar,
  ChartNoAxesColumnIncreasing,
  CircleGauge,
  Clock,
  Columns2,
  Columns3,
  DollarSign,
  Gauge,
  Mail,
  MapPin,
  Phone,
  RectangleVertical,
} from 'lucide-react'
import Image from 'next/image'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar'
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
import { Lesson } from '@/models/Lesson'
import { format } from 'date-fns'

// The following component was adapted from a v0 generation
// Link: https://v0.dev/

export default function LessonBookingCard({ lesson }: { lesson: Lesson }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/placeholder-avatar.jpg"
              alt="Coach's profile picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{lesson.title} </CardTitle>
            {/* Maybe remove the sub heading */}
            <p className="text-sm text-muted-foreground">
              Professional Tennis Coach
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(lesson.date, 'eeee, dd MMMM yyyy')}</span>
        </div>

        {/* Fix start and end times */}
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            {lesson.startTime.toLocaleTimeString()} -{' '}
            {lesson.endTime.toLocaleTimeString()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <ChartNoAxesColumnIncreasing className="h-4 w-4 text-muted-foreground" />
          <Badge variant="secondary">{lesson.level} </Badge>
        </div>

        <Separator />
        <div>
          <h3 className="font-semibold">Contact Details</h3>
          <div className="mt-2 grid gap-2">
            {/* Fix contact number display */}
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{lesson.contactNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{lesson.contactEmail}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Address</h3>
          <div className="mt-2 flex items-start space-x-2">
            <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
            <span>{lesson.address}</span>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Description</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {lesson.description}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Payment Details</h3>
          <div className="mt-2 flex items-center justify-between">
            <span>Lesson Fee:</span>
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{lesson.paymentAmount} </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Confirm Booking</Button>
      </CardFooter>
    </Card>
  )
}
