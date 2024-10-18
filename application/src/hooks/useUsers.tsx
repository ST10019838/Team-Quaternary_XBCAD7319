import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { User } from '@/app/models/user'

export default function useUsers() {
  const queryClient = useQueryClient()

  const userRetrieval = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('')
      return data as User[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const userCreation = useMutation({
    mutationKey: ['create-user'],
    mutationFn: async () => {
      const response = await axios.post('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['create-user'] })
    },
  })

  const userUpdation = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async () => {
      const response = await axios.put('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['update-user'] })
    },
  })

  const userDeletion = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async () => {
      const response = await axios.delete('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delete-user'] })
    },
  })

  return {
    users: userRetrieval.data,
    isFecthing: userRetrieval.isLoading,
    isFetchError: userRetrieval.isError,
    fetchError: userRetrieval.error,

    createUser: userCreation.mutate,
    isCreating: userCreation.isPending,
    isCreationError: userCreation.isError,
    creationError: userCreation.error,

    updateUser: userUpdation.mutate,
    isUpdating: userUpdation.isPending,
    isUpdatingError: userUpdation.isError,
    updationError: userUpdation.error,

    deleteUser: userDeletion.mutate,
    isDeleting: userDeletion.isPending,
    isDeletionError: userDeletion.isError,
    deletionError: userDeletion.error,
  }
}
