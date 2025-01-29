'use client'
import { HeroUIProvider } from "@heroui/react"
import AuthProvider from './AuthProvider'
import { useEffect } from "react"
import { setupInterceptor } from "@/common/configs/axios"
import { LoadingProvider } from "@/common/contexts/loadingContext"
import { UserProvider } from "./UserProvider"
import { ErrorProvider } from "@/common/contexts/errorContext"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RouteHistoryProvider from "./RouteHistoryProvider"
import ReservationDataProvider from "./ReservationDataProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupInterceptor()
  }, [])
  return (
    <HeroUIProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouteHistoryProvider>
          <ErrorProvider>
            <LoadingProvider>
              <AuthProvider>
                <UserProvider>
                  <ReservationDataProvider>
                    {children}
                  </ReservationDataProvider>
                </UserProvider>
              </AuthProvider>
            </LoadingProvider>
          </ErrorProvider>
        </RouteHistoryProvider>
      </LocalizationProvider>
    </HeroUIProvider>
  )
}