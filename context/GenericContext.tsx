import React, { createContext, PropsWithChildren, useState } from 'react'
import { PromoterDataI } from '../interfaces/promoter.interfaces'
import { UserDataI } from '../interfaces/user.interfaces';


interface ContextData {
    currentPromoter: PromoterDataI | undefined
    changeCurrentPromoter: (promoter: PromoterDataI) => void;
    currentUser: UserDataI | undefined
    changeCurrentUser: (user: UserDataI) => void;
}

export const GenericContext = createContext<ContextData>({
    currentPromoter: undefined,
    changeCurrentPromoter: () => {},
    currentUser: undefined,
    changeCurrentUser: () => {}
})


export const GenericContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [currentPromoter, setCurrentPromoter] = useState<PromoterDataI | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<UserDataI | undefined>(undefined)

  const changeCurrentPromoter = (promoter: PromoterDataI) =>{
    setCurrentPromoter(promoter)
  }


  const changeCurrentUser = (user: UserDataI) =>{
    setCurrentUser(user)
  }


  return (
    <GenericContext.Provider
      value={{
        currentPromoter,
        changeCurrentPromoter,
        currentUser,
        changeCurrentUser
      }}
    >
      {props.children}
    </GenericContext.Provider>
  )
}
