"use client"

import { createContext, useContext, type ReactNode } from "react"

interface UserContextType {
  userName: string
  firstName: string
}

const UserContext = createContext<UserContextType>({
  userName: "",
  firstName: "",
})

export const useUser = () => useContext(UserContext)

interface UserProviderProps {
  children: ReactNode
  userName?: string
}

export function UserProvider({ children, userName = "" }: UserProviderProps) {
  // Safely extract first name with proper validation
  const firstName = userName && typeof userName === "string" && userName.trim() ? userName.trim().split(" ")[0] : ""

  return (
    <UserContext.Provider
      value={{
        userName: userName || "",
        firstName,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
