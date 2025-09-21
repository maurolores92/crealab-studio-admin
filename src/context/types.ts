export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: {
    id: number;
    slug: string;
    name: string;
  }
  email: string
  phone?: string
  name: string
  lastName: string
  username: string
  photo?: string | null
  companies?: any
  planId?: number;
  createdAt: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  onMe: () => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
