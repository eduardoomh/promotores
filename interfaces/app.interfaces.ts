// interface formats {
// eslint-disable-line
// fedex: string
// dhl: string
// }

export enum UserRoles {
    common = 'COMMON',
    admin = 'ADMIN',
    dev = 'DEV'
  }
  
  export enum AppCountry {
    mx = 'MX',
    col = 'COL',
    undefined = 'UNDEFINED'
  }
  export interface UserData {
    user: string
    balance: number
    roles: [UserRoles]
    security: {
      senders: [string]
      senders_verified: boolean
      identity_verified: boolean
    }
    app_country: string
    metadata: any
    app_version: number
    currency: string
  }
  
  export interface ProfileData {
    user?: string
    email?: string
    phone: string
    company?: string
    shipments_per_month?: string
    off_platform?: boolean
    material?: string
    name?: string
    another_provider?: string
  }
  
  
  export interface apiResponse<T = any> {
    status: 'success' | 'error' | 'fetching'
    data: T
  }
  
  export type apiProps = {
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'GET'
    endpoint: string
    data?: any
  }
  
  export interface OTPVerificationResponse {
    success: Boolean
    error?: any
  }
  