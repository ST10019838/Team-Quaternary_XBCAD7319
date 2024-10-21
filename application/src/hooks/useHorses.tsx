import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { Horse } from '@/models/horse'

export default function useHorses() {
  const queryClient = useQueryClient()

  const horseRetrieval = useQuery({
    queryKey: ['horses'],
    queryFn: async () => {
      const { data } = await axios.get('/horse')
      return data as Horse[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const horseCreation = useMutation({
    mutationKey: ['create-horse'],
    mutationFn: async () => {
      const response = await axios.post('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horses'] })
    },
  })

  const horseUpdation = useMutation({
    mutationKey: ['update-horse'],
    mutationFn: async () => {
      const response = await axios.put('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horses'] })
    },
  })

  const horseDeletion = useMutation({
    mutationKey: ['delete-horse'],
    mutationFn: async () => {
      const response = await axios.delete('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horses'] })
    },
  })

  return {
    horses: horseRetrieval.data,
    isFecthing: horseRetrieval.isLoading,
    isFetchError: horseRetrieval.isError,
    fetchError: horseRetrieval.error,

    createHorse: horseCreation.mutate,
    isCreating: horseCreation.isPending,
    isCreationError: horseCreation.isError,
    creationError: horseCreation.error,

    updateHorse: horseUpdation.mutate,
    isUpdating: horseUpdation.isPending,
    isUpdatingError: horseUpdation.isError,
    updationError: horseUpdation.error,

    deleteHorse: horseDeletion.mutate,
    isDeleting: horseDeletion.isPending,
    isDeletionError: horseDeletion.isError,
    deletionError: horseDeletion.error,
  }
}
