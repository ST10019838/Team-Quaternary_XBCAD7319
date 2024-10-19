export interface Lesson {
  id: number
  title: string
  description: string
  date: Date
  // Fix start and end times types
  startTime: Date
  endTime: Date
  contactNumber: number
  contactEmail: string
  address: string
  // Add more payment details
  paymentAmount: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}
