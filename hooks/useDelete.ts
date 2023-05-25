import { AxiosResponse } from 'axios'
import { useContext, useState } from 'react'
import { ApiContext } from '../context/apiContext'
import { apiProps, apiResponse } from '../interfaces/app.interfaces'

export const useDelete = <U>(
    fn: (
        Id: String
    ) => (
            backendApiCall: (data: apiProps) => Promise<apiResponse<AxiosResponse<U>>>
        ) => Promise<apiResponse<AxiosResponse<U>>>
) => {
    const { backendApiCall, serviceIsReady } = useContext(ApiContext)
    const [dataDelete, setDataDelete] = useState<U | null>(null)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const fetchDataDelete = async (Id: String) => {
        if (!serviceIsReady) return

        setIsLoadingDelete(true)
        const data = await fn(Id)(backendApiCall)
        setDataDelete(data.data.data)
        setIsLoadingDelete(false)
        return data
    }

    return {
        dataDelete,
        isLoadingDelete,
        fetchDataDelete,
    }
}
