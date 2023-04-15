import { AxiosResponse } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../context/apiContext'
import { apiProps, apiResponse } from '../interfaces/app.interfaces'

export const useGet = <T>(
  fn: (
    backendApiCall: (data: apiProps) => Promise<apiResponse<AxiosResponse<T>>>
  ) => Promise<apiResponse<AxiosResponse<T>>>
) => {
  const { backendApiCall, serviceIsReady, userToken } = useContext(ApiContext)
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refetch, setRefetch] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fn(backendApiCall)
        setData(data.data?.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    if (serviceIsReady) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, serviceIsReady, userToken])

  const refetchFn = () => {
    setRefetch(refetch + 1)
  }

  return {
    data,
    isLoading,
    refetch: refetchFn
  }
}
