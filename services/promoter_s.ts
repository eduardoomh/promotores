import { apiProps, apiResponse } from '../interfaces/app.interfaces'
import { AddPromoterDataI, EditPromoterDataI, DeletePromoterDataI } from '../interfaces/promoter.interfaces'

export const getPromoters = async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
  return await backendApiCall({
    method: 'GET',
    endpoint: `promoters`
  })
}

export const addPromoter =
  (dto: AddPromoterDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'POST',
      endpoint: 'promoters',
      data: dto
    })
  }

export const editPromoter =
  (Id: String, dto: AddPromoterDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'PATCH',
      endpoint: `promoters/${Id}`,
      data: dto
    })
  }

export const deletePromoter =
  (Id: String) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'DELETE',
      endpoint: `promoters/${Id}`,
      data: {},
    })
  }
