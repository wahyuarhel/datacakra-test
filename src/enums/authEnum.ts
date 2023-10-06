export enum LoginResponseStatus {
  idle = '',
  pending = 'loginAction/pending',
  fulfilled = 'loginAction/fulfilled',
  rejected = 'loginAction/rejected'
}

export enum LocalStorageType {
  token = 'token'
}