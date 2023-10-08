export enum LoginResponseStatus {
  idle = '',
  pending = 'loginAction/pending',
  fulfilled = 'loginAction/fulfilled',
  rejected = 'loginAction/rejected'
}
export enum RegisterResponseStatus {
  idle = '',
  pending = 'registerAction/pending',
  fulfilled = 'registerAction/fulfilled',
  rejected = 'registerAction/rejected'
}

export enum LocalStorageKey {
  token = 'token',
  authorized = 'authorized',
  username = 'username',
  email = 'email',
  userId = 'userId',
  userData = 'userData'
}