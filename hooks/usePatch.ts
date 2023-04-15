import { AxiosError, AxiosResponse } from 'axios'
import { useContext, useState } from 'react'
import { ApiContext } from '../context/apiContext'
import { apiProps, apiResponse } from '../interfaces/app.interfaces'
import { TError } from './usePost'

type TGlobalError = {
    data: AxiosError<TError> | undefined
  }

  
export const usePatch = <T, U>(
    fn: (
        Id: String, dto: T
    ) => (
            backendApiCall: (data: apiProps) => Promise<apiResponse<AxiosResponse<U>>>
        ) => Promise<apiResponse<AxiosResponse<U>>>
) => {
    const { backendApiCall, serviceIsReady } = useContext(ApiContext)
    const [dataPatch, setDataPatch] = useState<U | null>(null)
    const [isLoadingPatch, setIsLoadingPatch] = useState(false)

    const fetchDataPatch = async (Id: String, dto: T) => {
        if (!serviceIsReady) return

        setIsLoadingPatch(true)
        const data = await fn(Id, dto)(backendApiCall)
        const petitionError = data as unknown as TGlobalError

        setDataPatch(data.data.data)
        setIsLoadingPatch(false)
   
        return {
          data: data.data.data,
          error: petitionError?.data?.response?.data
        }
    }

    return {
        dataPatch,
        isLoadingPatch,
        fetchDataPatch,
    }
}
