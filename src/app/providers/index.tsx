'use client'
import {HeroUIProvider} from "@heroui/react"
import  AuthProvider  from './AuthProvider'
import { useEffect } from "react"
import { setupInterceptor} from "@/configs/axios"

export function Providers({children}: { children: React.ReactNode }) {
  useEffect(() => {
    setupInterceptor()
  }, [])
  return (
    <HeroUIProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </HeroUIProvider>
  )
}