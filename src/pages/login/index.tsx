// ** React Imports
import {  ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import LoginView from 'src/views/auth/login/LoginView';


const LoginPage = () => {

  return (
    <LoginView />
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
