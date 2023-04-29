import { useRouter } from "next/router"
import { createContext, useEffect } from "react"
import { useState } from "react"
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState()
  const router = useRouter()

  useEffect(() => {
    if (router?.isReady) setAuth(JSON.parse(localStorage.getItem("user")))
  }, [router?.asPath, router?.isReady])
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
