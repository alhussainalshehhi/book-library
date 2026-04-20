import { createContext, useContext, useState } from 'react'

const Login = createContext()

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev)
  }

  return (
    <Login.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </Login.Provider>
  )
}

export function useLogin() {
  return useContext(Login)
}