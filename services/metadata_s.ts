import { apiProps, apiResponse } from '../interfaces/app.interfaces'
import { AddMetaKeysDataI, EditMetaKeysDataI } from '../interfaces/metadata.interfaces'

export const getMetadata = async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
  return await backendApiCall({
    method: 'GET',
    endpoint: `metadata`
  })
}

export const addMetadata =
  (dto: AddMetaKeysDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'POST',
      endpoint: 'metadata',
      data: dto
    })
  }

export const editMetadata =
  (Id: String, dto: EditMetaKeysDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'PATCH',
      endpoint: `metadata/${Id}`,
      data: dto
    })
  }

