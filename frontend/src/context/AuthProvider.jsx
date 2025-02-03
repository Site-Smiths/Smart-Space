import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/data'

export const AuthContext = createContext()


const AuthProvider = ({children}) => {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const {student, mentor } = getLocalStorage()
    setUserData(student, mentor)
  }, [])
  

  return (
    <div>
      <AuthContext.Provider value={userData}>
        {children}
      </AuthContext.Provider>
      
    </div>
  )
}

export default AuthProvider