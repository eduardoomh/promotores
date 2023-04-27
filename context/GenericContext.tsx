import React, { createContext, PropsWithChildren, useState } from 'react'
import { PromoterDataI } from '../interfaces/promoter.interfaces'
import { UserDataI } from '../interfaces/user.interfaces';
import { CommissionDataI } from '../interfaces/commission.interfaces';
import { MovementDataI } from '../interfaces/movement.interfaces';


interface ContextData {
    currentPromoter: PromoterDataI | undefined
    changeCurrentPromoter: (promoter: PromoterDataI) => void;
    currentUser: UserDataI | undefined
    changeCurrentUser: (user: UserDataI) => void;
    saveLoggedUser: (user: UserDataI) => void;
    loggedUser: UserDataI | undefined;
    currentComission: CommissionDataI | undefined;
    changeCurrentComission: (comission: CommissionDataI) => void;
    currentMovement: MovementDataI | undefined;
    changeCurrentMovement: (movement: MovementDataI) => void;
}

export const GenericContext = createContext<ContextData>({
    currentPromoter: undefined,
    changeCurrentPromoter: () => {},
    currentUser: undefined,
    changeCurrentUser: () => {},
    saveLoggedUser: () => {},
    loggedUser: undefined,
    currentComission: undefined,
    changeCurrentComission: () => {},
    currentMovement: undefined,
    changeCurrentMovement: () => {}
})


export const GenericContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [currentPromoter, setCurrentPromoter] = useState<PromoterDataI | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<UserDataI | undefined>(undefined)
  const [currentComission, setCurrentComission] = useState<CommissionDataI | undefined>(undefined)
  const [currentMovement, setCurrentMovement] = useState<MovementDataI | undefined>(undefined)
  const [loggedUser, setLoggedUser] = useState<UserDataI | undefined>(undefined)

  const changeCurrentPromoter = (promoter: PromoterDataI) =>{
    setCurrentPromoter(promoter)
  }
  const changeCurrentUser = (user: UserDataI) =>{
    setCurrentUser(user)
  }
  const changeCurrentComission = (comission: CommissionDataI) =>{
    setCurrentComission(comission)
  }
  const changeCurrentMovement = (movement: MovementDataI) =>{
    setCurrentMovement(movement)
  }

  const saveLoggedUser = (user: UserDataI) =>{
    console.log(user, "llega el context")
    setLoggedUser(user)
  }


  return (
    <GenericContext.Provider
      value={{
        currentPromoter,
        changeCurrentPromoter,
        currentUser,
        changeCurrentUser,
        currentComission,
        changeCurrentComission,
        saveLoggedUser,
        loggedUser,
        currentMovement,
        changeCurrentMovement
      }}
    >
      {props.children}
    </GenericContext.Provider>
  )
}
