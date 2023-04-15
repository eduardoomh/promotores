import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import axios from 'axios'
import { apiProps, apiResponse } from '../interfaces/app.interfaces'

interface apiData {
  userToken: string
  backendURL: string
  backendApiCall: (data: apiProps) => Promise<apiResponse>
  serviceIsReady: boolean
}

export const ApiContext = createContext<apiData>({
  userToken: 'fetching..',
  backendURL: process.env.REACT_APP_NOT_BACKEND_URL || '',
  backendApiCall: () => {
    return new Promise(() => {})
  },
  serviceIsReady: false
})

export const ApiContextProvider: React.FC<PropsWithChildren> = (props) => {
  const backendURL = '/api/'
  const [userToken, setuserToken] = useState('')
  const [serviceIsReady, setserviceIsReady] = useState(false)

  const backendApiCall = async (data: apiProps): Promise<apiResponse> => {
    return new Promise((resolve) => {
      const returnData: apiResponse = { data: 'awaiting', status: 'fetching' }
      axios({
        data: data.method === 'GET' ? undefined : data.data,
        method: data.method,
        url: `${backendURL}${data.endpoint}`,
        headers: {
          Authorization: `Bearer `
        }
      })
        .then((res) => {
          returnData.status = 'success'
          returnData.data = res
          resolve(returnData)
        })
        .catch((err) => {
          console.log(err)

          returnData.status = 'error'
          returnData.data = err
          resolve(returnData)
        })
    })
  }

  useEffect(() => {
        setserviceIsReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <ApiContext.Provider value={{ backendApiCall, userToken, backendURL, serviceIsReady }}>
      {props.children}
    </ApiContext.Provider>
  )
}


