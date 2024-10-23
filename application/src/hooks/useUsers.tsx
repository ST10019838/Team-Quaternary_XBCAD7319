import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { User } from '@/models/user'
import { toast } from 'sonner'

export default function useUsers() {
  const queryClient = useQueryClient()

  const userRetrieval = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('/user')
      return data as User[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const userCreation = useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: User) => {
      const response = await axios.post('/user', newUser)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })

      userDeletion.reset()

      toast.success('Successfully Added User')
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`)
    },
  })

  const userUpdation = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (userToUpdate: User) => {
      const response = await axios.patch(
        `/user?id=eq.${userToUpdate.id}`,
        userToUpdate
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })

      userDeletion.reset()

      toast.success('Successfully Updated User')
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`)
    },
  })

  const userDeletion = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (userToDelete: User) => {
      const response = await axios.delete(`/user?id=eq.${userToDelete.id}`, {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })

      userDeletion.reset()

      toast.success('Successfully Deleted User')
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`)
    },
  })

  return {
    userRetrieval,
    userCreation,
    userUpdation,
    userDeletion,

    // users: userRetrieval.data,
    // isFecthing: userRetrieval.isLoading,
    // isFetchError: userRetrieval.isError,
    // fetchError: userRetrieval.error,

    // createUser: userCreation.mutate,
    // isCreating: userCreation.isPending,
    // isCreationError: userCreation.isError,
    // creationError: userCreation.error,

    // updateUser: userUpdation.mutate,
    // isUpdating: userUpdation.isPending,
    // isUpdatingError: userUpdation.isError,
    // updationError: userUpdation.error,

    // deleteUser: userDeletion.mutate,
    // isDeleting: userDeletion.isPending,
    // isDeletionError: userDeletion.isError,
    // deletionError: userDeletion.error,
  }
}
