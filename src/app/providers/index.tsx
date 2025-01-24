'use client'
import {HeroUIProvider} from "@heroui/react"
import  AuthProvider  from './AuthProvider'
import { useEffect } from "react"
import { setupInterceptor} from "@/configs/axios"
import { LoadingProvider } from "@/contexts/loadingContext"
import { UserProvider } from "./UserProvider"
import { ErrorProvider } from "@/contexts/errorContext"

export function Providers({children}: { children: React.ReactNode }) {
  useEffect(() => {
    setupInterceptor()
  }, [])
  return (
    <HeroUIProvider>
      <ErrorProvider>
      <LoadingProvider>
      <AuthProvider>
        <UserProvider>
        {children}
        </UserProvider>
      </AuthProvider>
      </LoadingProvider>
      </ErrorProvider>
    </HeroUIProvider>
  )
}