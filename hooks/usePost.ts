import { AxiosResponse, AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { ApiContext } from '../context/apiContext'
import { apiProps, apiResponse } from '../interfaces/app.interfaces'

export const usePost = <T, U>(
  fn: (
    dto: T
  ) => (
    backendApiCall: (data: apiProps) => Promise<apiResponse<AxiosResponse<U>>>
  ) => Promise<apiResponse<AxiosResponse<U>>>
) => {
  const { backendApiCall, serviceIsReady } = useContext(ApiContext)
  const [data, setData] = useState<U | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async (dto: T) => {
    if (!serviceIsReady) {
      return {
        data: null,
        error: null
      }
    }

    setIsLoading(true)
    const data = await fn(dto)(backendApiCall)
    const petitionError = data as unknown as TGlobalError

    setData(data.data.data)
    setIsLoading(false)

    return {
      data: data.data.data,
      error: petitionError?.data?.response?.data
    }
  }

  return {
    data,
    isLoading,
    fetchData
  }
}

export type TError = {
  success: boolean
  code: number
  error: {
    msg: string
  }
}

type TGlobalError = {
  data: AxiosError<TError> | undefined
}
