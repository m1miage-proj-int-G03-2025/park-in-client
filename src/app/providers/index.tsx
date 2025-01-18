'use client'
import {HeroUIProvider} from "@heroui/react"
import  AuthProvider  from './AuthProvider'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </HeroUIProvider>
  )
}