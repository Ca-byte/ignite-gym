import { ReactNode, createContext, useEffect, useState } from "react";

import { storageUserGet, storageUserSave } from "@/storage/storageUser";

import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";

export type AuthContextDataProps = {

  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>

}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContexProviderProps){
  const [ user, setUser ] = useState<UserDTO>({} as UserDTO)

  async function singIn(email: string, password: string) {
    try {
      const {data} = await api.post('/sessions', { email, password })
   
      if(data.user){
        setUser(data.user)
        storageUserSave(data.user)
      }

    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if(userLogged) {
      setUser(userLogged)
    }
  }

  useEffect(() => {
    loadUserData()
  },[])
  
  return(
    <AuthContext.Provider value={{ user, singIn }}>
      {children}
    </AuthContext.Provider>
  )
}