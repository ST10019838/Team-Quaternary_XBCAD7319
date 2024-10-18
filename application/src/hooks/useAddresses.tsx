import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { Address } from '@/models/address'

export default function useAddresses() {
  const queryClient = useQueryClient()

  const addressRetrieval = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const { data } = await axios.get('')
      return data as Address[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const addressCreation = useMutation({
    mutationKey: ['create-address'],
    mutationFn: async () => {
      const response = await axios.post('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  const addressUpdation = useMutation({
    mutationKey: ['update-address'],
    mutationFn: async () => {
      const response = await axios.put('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  const addressDeletion = useMutation({
    mutationKey: ['delete-address'],
    mutationFn: async () => {
      const response = await axios.delete('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  return {
    addresss: addressRetrieval.data,
    isFecthing: addressRetrieval.isLoading,
    isFetchError: addressRetrieval.isError,
    fetchError: addressRetrieval.error,

    createAddress: addressCreation.mutate,
    isCreating: addressCreation.isPending,
    isCreationError: addressCreation.isError,
    creationError: addressCreation.error,

    updateAddress: addressUpdation.mutate,
    isUpdating: addressUpdation.isPending,
    isUpdatingError: addressUpdation.isError,
    updationError: addressUpdation.error,

    deleteAddress: addressDeletion.mutate,
    isDeleting: addressDeletion.isPending,
    isDeletionError: addressDeletion.isError,
    deletionError: addressDeletion.error,
  }
}
