"use client";
import { usePathname  } from "next/navigation";
import NavBar from "./NavBar";

export function ClientWrapper({children}: {children : React.ReactNode}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <>
          {!isLoginPage && <NavBar />}
          {children}
        </>
      );
    
}