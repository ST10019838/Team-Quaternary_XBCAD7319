import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { toast } from 'sonner'
import { Lesson } from '@/models/Lesson'
import { format } from 'date-fns'

export default function useLessons({ selectedDate }: { selectedDate?: Date }) {
  const queryClient = useQueryClient()

  const allLessons = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const { data } = await axios.get(
        '/lesson?select=*,skillLevel(*),contactDetails(*),address(*),paymentDetails(*)'
      )
      return data as Lesson[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const lessonsForDate = useQuery({
    queryKey: ['lessons-for-date'],
    queryFn: async () => {
      if (!selectedDate) return

      const { data } = await axios.get(
        `/lesson?date=eq.(${format(selectedDate, 'yyyy-MM-dd')})&select=*,skillLevel(*),contactDetails(*),address(*),paymentDetails(*))`
      )

      //,
      return data as Lesson[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const lessonCreation = useMutation({
    mutationKey: ['create-lesson'],
    mutationFn: async (newLesson: Lesson) => {
      await axios.post('/lesson', newLesson)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })

      lessonCreation.reset()

      toast.success('Successfully Added Lesson')
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`)
    },
  })

  const lessonUpdation = useMutation({
    mutationKey: ['update-lesson'],
    mutationFn: async (lessonToUpdate: Lesson) => {
      await axios.patch(`/lesson?id=eq.${lessonToUpdate.id}`, lessonToUpdate)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })

      lessonUpdation.reset()

      toast.success('Successfully Updated Address')
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`)
    },
  })

  const lessonDeletion = useMutation({
    mutationKey: ['delete-lesson'],
    mutationFn: async (lessonToDelete: Lesson) => {
      await axios.delete(`/lesson?id=eq.${lessonToDelete.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })

      lessonDeletion.reset()

      toast.success('Successfully Deleted Lesson')
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`)
    },
  })

  return {
    allLessons,
    lessonsForDate,
    lessonCreation,
    lessonUpdation,
    lessonDeletion,
  }
}
