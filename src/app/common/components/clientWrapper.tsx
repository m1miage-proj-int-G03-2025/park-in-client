"use client";
import { usePathname, useSearchParams  } from "next/navigation";
import NavBar from "./NavBar";
import { useRouteHistory } from "../providers/RouteHistoryProvider";
import { useEffect } from "react";

export function ClientWrapper({children}: {children : React.ReactNode}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {addRoute} = useRouteHistory();
    const pagesWithoutNavBar = ['/login', '/signup'];
    const isPageWithoutNavbar = pagesWithoutNavBar.includes(pathname);


    useEffect(() => {
        if (!isPageWithoutNavbar) {
          addRoute(`${pathname}${searchParams.size !== 0 ? "?"+searchParams : ""}`)
        }
    }, [pathname, searchParams])

    return (
        <>
          {!isPageWithoutNavbar && <NavBar />}
          {children}
        </>
      );
    
}