import { Professional } from 'types/models/Prof'
import { User } from 'types/models/User'

export const decodeToken = (token: string): User | Professional|null => {
  if (token) {
    const decoded = JSON.parse(atob(token.split('.')[1]))
    const { exp, iat, ...filteredDecoded } = decoded
    return filteredDecoded
  }
  return null
}
