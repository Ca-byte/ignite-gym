import { ReactNode, createContext, useEffect, useState } from "react";

import { storageUserGet, storageUserSave } from "@/storage/storageUser";

import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>
  isLoadingUserStorageData: boolean

}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContexProviderProps){
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

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
    try {
      const userLogged = await storageUserGet();

      if(userLogged) {
        setUser(userLogged);
      } 
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData()
  },[])
  
  return(
    <AuthContext.Provider value={{ 
      user, 
      singIn,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}