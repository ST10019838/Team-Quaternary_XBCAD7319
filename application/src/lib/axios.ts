import a from 'axios'

const axios = a.create({
  baseURL: 'https://kdrvzeievzbcxhjnkzwr.supabase.co/rest/v1',
  headers: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
})

export default axios
