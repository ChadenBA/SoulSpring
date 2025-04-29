export interface ItemDetailsResponse<T> {
  message: string
  user?: T | null; // Allowing null
  data?: T | null; // Allowing null

}
