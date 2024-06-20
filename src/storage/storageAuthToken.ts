import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from './storageConfig';

type StorageAuthTokenProp = {
  token: string;
  refresh_token: string;
}
export async function storageAuthTokenSave({token, refresh_token}: StorageAuthTokenProp) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE,JSON.stringify({token, refresh_token}));
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  const {token, refresh_token}: StorageAuthTokenProp = response ? JSON.parse(response) : {};

  return {token, refresh_token};
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}