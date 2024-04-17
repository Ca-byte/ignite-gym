import { ReactNode, createContext } from "react";

import { UserDTO } from "@/dtos/UserDTO";


export type AuthContextDataProps = {

  user: UserDTO;

}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContexProviderProps){
  return(
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Caroline Vieira',
        email: 'caroline@email.com',
        avatar: 'caroline.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}