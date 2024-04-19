import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@/dtos/UserDTO";


export type AuthContextDataProps = {

  user: UserDTO;

}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContexProviderProps){
  const [ user, setUser ] = useState({
      id: '1',
      name: 'Caroline Vieira',
      email: 'caroline@email.com',
      avatar: 'caroline.png'
  })
  return(
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}