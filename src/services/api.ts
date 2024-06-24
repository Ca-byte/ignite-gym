import { storageAuthTokenGet, storageAuthTokenSave } from "@/storage/storageAuthToken";
import { AppError } from "@/utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({

  baseURL: 'http://192.168.100.17:3333'

})as APIInstanceProps;

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;
api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    if(requestError.response?.status === 401) {
      const { refresh_token } = await storageAuthTokenGet();

      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {

        if(!refresh_token)
          singOut();
        return Promise.reject(requestError);

      }
      const originalRequestConfig = requestError.config;

      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueued.push({
            onSuccess: (token: string) => { 
              originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
              resolve(api(originalRequestConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            },
          })
        })
      }

      isRefreshing = true
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.post('/sessions/refresh-token', { refresh_token });

          await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token });
          console.log("TOKEN UPDATED =>", data);

        } catch (error: any) {
          failedQueued.forEach(request => {
            request.onFailure(error);
          })

          singOut();
          reject(error);
        } finally {
          isRefreshing = false;
          failedQueued = []
        }
      })

    }

    singOut();

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}


export { api };
