export interface Lesson {
  id: number
  title: string
  description: string
  date: Date
  // Fix start and end times types
  startTime: Date
  endTime: Date
  contactNumber: string
  contactEmail: string
  address: string
  // Add more payment details
  paymentAmount: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface LessonBooking {
  id: number
  lessonId: number
  userId: number
  horseId?: number

  paymentConfirmed: boolean
  usingPersonalHorse: boolean

  messageForCoach?: string
  proofOfPayment?: string

  // lesson?: Lesson
  // horse?: Horse
  // user?: User
}
