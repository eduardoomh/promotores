import { apiProps, apiResponse } from '../interfaces/app.interfaces'
import { AddUserDataI, EditUserDataI, LoginUserI, ModifyUserDataI } from '../interfaces/user.interfaces'

export const getUsers = async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
  return await backendApiCall({
    method: 'GET',
    endpoint: `users`
  })
}

export const addUser =
  (dto: AddUserDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'POST',
      endpoint: 'users',
      data: dto
    })
  }

export const editUser =
  (Id: String, dto: EditUserDataI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'PATCH',
      endpoint: `users/${Id}`,
      data: dto
    })
  }

export const deleteUser =
  (Id: String) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'DELETE',
      endpoint: `users/${Id}`,
      data: {},
    })
  }

  export const loginUser =
  (dto: LoginUserI) => async (backendApiCall: (data: apiProps) => Promise<apiResponse>) => {
    return await backendApiCall({
      method: 'POST',
      endpoint: 'auth/login',
      data: dto
    })
  }

