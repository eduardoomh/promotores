import { apiProps, apiResponse } from '../interfaces/app.interfaces'
import { AddCommissionDataI } from '../interfaces/commission.interfaces'

export const getCommissions = async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
  return await backendApiCall({
    method: 'GET',
    endpoint: `commissions`
  })
}

export const getCommissionsByUser = 
(dto: string) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
  return await backendApiCall({
    method: 'POST',
    endpoint: `commissions/${dto}`
  })
}

export const addCommission =
  (dto: AddCommissionDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'POST',
      endpoint: 'commissions',
      data: dto
    })
  }

export const editCommission =
  (Id: String, dto: AddCommissionDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'PATCH',
      endpoint: `commissions/${Id}`,
      data: dto
    })
  }

export const deleteCommission =
  (Id: String) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'DELETE',
      endpoint: `commissions/${Id}`,
      data: {},
    })
  }
