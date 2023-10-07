export type ErrorType = {
  statusCode: number
  message: string,
}
export const InitialError: ErrorType = {
  statusCode: 0,
  message: ''
}