import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { ContactDetails } from '@/models/contact-details'

export default function useContactDetails() {
  const queryClient = useQueryClient()

  const contactDetailsRetrieval = useQuery({
    queryKey: ['contact-details'],
    queryFn: async () => {
      const { data } = await axios.get('')
      return data as ContactDetails[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const contactDetailsCreation = useMutation({
    mutationKey: ['create-contact-details'],
    mutationFn: async () => {
      const response = await axios.post('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['create-contact-details'] })
    },
  })

  const contactDetailsUpdation = useMutation({
    mutationKey: ['update-contact-details'],
    mutationFn: async () => {
      const response = await axios.put('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['update-contact-details'] })
    },
  })

  const contactDetailsDeletion = useMutation({
    mutationKey: ['delete-contact-details'],
    mutationFn: async () => {
      const response = await axios.delete('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delete-contact-details'] })
    },
  })

  return {
    contactDetailss: contactDetailsRetrieval.data,
    isFecthing: contactDetailsRetrieval.isLoading,
    isFetchError: contactDetailsRetrieval.isError,
    fetchError: contactDetailsRetrieval.error,

    createContactDetails: contactDetailsCreation.mutate,
    isCreating: contactDetailsCreation.isPending,
    isCreationError: contactDetailsCreation.isError,
    creationError: contactDetailsCreation.error,

    updateContactDetails: contactDetailsUpdation.mutate,
    isUpdating: contactDetailsUpdation.isPending,
    isUpdatingError: contactDetailsUpdation.isError,
    updationError: contactDetailsUpdation.error,

    deleteContactDetails: contactDetailsDeletion.mutate,
    isDeleting: contactDetailsDeletion.isPending,
    isDeletionError: contactDetailsDeletion.isError,
    deletionError: contactDetailsDeletion.error,
  }
}
