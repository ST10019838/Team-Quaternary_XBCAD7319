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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

// The following component was adapted from a v0 generation
// Link: https://v0.dev/

const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4MB

const lessonBookingSchema = z.object({
  // lessonId: z.number().int().positive(),
  // userId: z.number().int().positive(),
  horseId: z.number().int().positive().optional(),
  paymentConfirmed: z.boolean(),
  usingPersonalHorse: z.boolean(),
  messageForCoach: z.string().max(500).optional(),

  // The following file validation was adapted from dev.to
  // Author: Prodipta Banerjee (https://dev.to/banerjeeprodipta)
  // Link: https://dev.to/banerjeeprodipta/validate-file-with-zod-20o
  proofOfPayment: z
    .instanceof(File)
    // .refine((file: File) => file?.length !== 0, "File is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      'Only .jpg, .png, and .pdf files are accepted.'
    ),
})

type LessonBookingFormData = z.infer<typeof lessonBookingSchema>

export default function LessonBookingCard({ lesson }: { lesson: Lesson }) {
  const form = useForm<LessonBookingFormData>({
    resolver: zodResolver(lessonBookingSchema),
    defaultValues: {
      // lessonId: 0,
      // userId: 0,
      paymentConfirmed: false,
      usingPersonalHorse: true,
    },
  })

  async function onSubmit(data: LessonBookingFormData) {
    // setIsSubmitting(true)
    try {
      // Here you would typically send the data to your API
      console.log(data)
      // toast({
      //   title: "Booking submitted",
      //   description: "Your lesson booking has been submitted successfully.",
      // })
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "There was a problem submitting your booking.",
      //   variant: "destructive",
      // })
    } finally {
      // setIsSubmitting(false)
    }
  }

  return (
    <Card className="flex h-full w-full max-w-md flex-grow flex-col">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex w-full items-center justify-center">
          Book A Slot
        </CardTitle>

        <Separator className="mx-auto h-0.5 w-3/4" />
      </CardHeader>

      <CardContent
        /* className="grid gap-4 overflow-hidden"  */ className="flex flex-grow overflow-auto"
      >
        <Form {...form}>
          <form
            id="booking-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* <ScrollArea className="w-full space-y-8"> */}

            {/* <div className="flex-grow space-y-8 overflow-auto"> */}
            <FormField
              control={form.control}
              name="horseId"
              render={({ field }) => (
                // Update following form field to show and select horses
                <FormItem>
                  <FormLabel>Horse To Use</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Select the horse you'll be using (if applicable).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usingPersonalHorse"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormLabel className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Using Personal Horse</FormLabel>
                      <FormDescription>
                        Check this box if you'll be using your personal horse.
                      </FormDescription>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Show the following for admins / coaches */}
            {/* <FormField
              control={form.control}
              name="paymentConfirmed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormLabel className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Payment Confirmed</FormLabel>
                      <FormDescription>
                        Check this box if you have confirmed your payment.
                      </FormDescription>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            /> */}

            <Separator className="mx-auto w-3/4" />

            <FormField
              control={form.control}
              name="messageForCoach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message for Coach</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave a message for your coach (max 500 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="mx-auto w-3/4" />

            <FormField
              control={form.control}
              name="proofOfPayment"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>
                    Proof Of Payment <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.png,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange(file)
                        }
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your file here. Accepted formats: .jpg, .png, .pdf.
                    Max size: 4MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a
                veniam blanditiis eius fugit dolore sequi accusantium corporis
                molestias quasi aliquid, consectetur mollitia quia quas ea,
                provident perspiciatis eaque sapiente at laudantium quod
                dignissimos. Id sapiente quisquam temporibus hic itaque libero,
                iure minima quia iusto distinctio expedita quidem. Molestiae
                voluptates eligendi dolor qui quos optio placeat ea dolore enim
                ab, impedit beatae quibusdam ex, veritatis animi nesciunt
                dolorem aliquam excepturi at officiis fugit provident, iste
                ullam? Laborum, quod. Reiciendis repellat repudiandae et vel
                architecto accusamus sit neque, modi itaque necessitatibus a
                dolores natus enim quia nihil distinctio incidunt laborum
                assumenda.
              </div>

              <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a
                veniam blanditiis eius fugit dolore sequi accusantium corporis
                molestias quasi aliquid, consectetur mollitia quia quas ea,
                provident perspiciatis eaque sapiente at laudantium quod
                dignissimos. Id sapiente quisquam temporibus hic itaque libero,
                iure minima quia iusto distinctio expedita quidem. Molestiae
                voluptates eligendi dolor qui quos optio placeat ea dolore enim
                ab, impedit beatae quibusdam ex, veritatis animi nesciunt
                dolorem aliquam excepturi at officiis fugit provident, iste
                ullam? Laborum, quod. Reiciendis repellat repudiandae et vel
                architecto accusamus sit neque, modi itaque necessitatibus a
                dolores natus enim quia nihil distinctio incidunt laborum
                assumenda.
              </div> */}
            {/* </ScrollArea> */}
            {/* </div> */}

            {/* <Button className="w-full">Confirm Booking</Button> */}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="mt-3">
        {/* 
        The following button was adapted from stackoverflow.com  
        Author: Slidein (https://stackoverflow.com/users/15000290/slidein)
        Link: https://stackoverflow.com/questions/70103266/submiting-form-using-a-button-outside-the-form
        
        */}
        <Button className="w-full" form="booking-form">
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  )
}
