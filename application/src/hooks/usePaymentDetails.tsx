import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { PaymentDetails } from '@/models/payment-details'

export default function usePaymentDetails() {
  const queryClient = useQueryClient()

  const paymentDetailsRetrieval = useQuery({
    queryKey: ['payment-details'],
    queryFn: async () => {
      const { data } = await axios.get('/paymentdetails')
      return data as PaymentDetails[]
    },
    refetchInterval: 1000 * 60 * 2, // refetch every 2 mins
    refetchIntervalInBackground: false,
  })

  const paymentDetailsCreation = useMutation({
    mutationKey: ['create-payment-details'],
    mutationFn: async () => {
      const response = await axios.post('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-details'] })
    },
  })

  const paymentDetailsUpdation = useMutation({
    mutationKey: ['update-paymentDetails'],
    mutationFn: async () => {
      const response = await axios.put('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-details'] })
    },
  })

  const paymentDetailsDeletion = useMutation({
    mutationKey: ['delete-paymentDetails'],
    mutationFn: async () => {
      const response = await axios.delete('', {})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-details'] })
    },
  })

  return {
    paymentDetails: paymentDetailsRetrieval.data,
    isFetching: paymentDetailsRetrieval.isLoading,
    isFetchError: paymentDetailsRetrieval.isError,
    fetchError: paymentDetailsRetrieval.error,

    createPaymentDetails: paymentDetailsCreation.mutate,
    isCreating: paymentDetailsCreation.isPending,
    isCreationError: paymentDetailsCreation.isError,
    creationError: paymentDetailsCreation.error,

    updatePaymentDetails: paymentDetailsUpdation.mutate,
    isUpdating: paymentDetailsUpdation.isPending,
    isUpdatingError: paymentDetailsUpdation.isError,
    updationError: paymentDetailsUpdation.error,

    deletePaymentDetails: paymentDetailsDeletion.mutate,
    isDeleting: paymentDetailsDeletion.isPending,
    isDeletionError: paymentDetailsDeletion.isError,
    deletionError: paymentDetailsDeletion.error,
  }
}
