export enum DestinationResponseStatus {
  idle = '',
  pending = 'getAllDestination/pending',
  fulfilled = 'getAllDestination/fulfilled',
  rejected = 'getAllDestination/rejected'
}
export enum DestinationDetailResponseStatus {
  idle = '',
  pending = 'getDestinationDetailById/pending',
  fulfilled = 'getDestinationDetailById/fulfilled',
  rejected = 'getDestinationDetailById/rejected'
}