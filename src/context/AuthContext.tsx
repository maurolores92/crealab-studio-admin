// ** React Imports
import { createContext, useEffect, useState, ReactNode, useCallback } from 'react'

// ** Next Import
import { useRouter } from 'next/router'


// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import apiConnector from 'src/services/api.service'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  onMe: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const router = useRouter()
  const initAuth = useCallback(async() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    
    if (storedToken) {
      setLoading(true);
      try {
        const response: any = await apiConnector.get('/auth/me');
        setUser({ ...response })
      } catch (error) {
        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken');
        setUser(null)
        setLoading(false)
        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
          router.replace('/login')
        }
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [router]);
  
  useEffect(() => {
    
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initAuth])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    apiConnector
      .post(authConfig.loginEndpoint, params)
      .then(async (response: any) => {
        
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.accessToken)
       
        const returnUrl = router.query.returnUrl?.toString()

        setUser({ ...response })
        window.localStorage.setItem('userData', JSON.stringify(response))
        window.localStorage.setItem('role', JSON.stringify(response.role))

        const redirectURL: string = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        window.location.href = redirectURL;
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = async () => {
    await apiConnector.remove('/auth/logout');
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    onMe: initAuth,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
