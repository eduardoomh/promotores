import { apiProps, apiResponse } from '../interfaces/app.interfaces'
import { AddMovementDataI } from '../interfaces/movement.interfaces'

export const addMovement =
  (dto: AddMovementDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'POST',
      endpoint: 'movements',
      data: dto
    })
  }

  export const deleteMovement =
  (Id: String) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'DELETE',
      endpoint: `movements/${Id}`,
      data: {},
    })
  }