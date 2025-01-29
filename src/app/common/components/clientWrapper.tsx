"use client";
import { usePathname, useSearchParams  } from "next/navigation";
import NavBar from "./NavBar";
import { useRouteHistory } from "../providers/RouteHistoryProvider";
import { Suspense, useEffect } from "react";

function Wrapper({children}: {children : React.ReactNode}) {
  const pathname = usePathname();
    
    const searchParams = useSearchParams();
    const {addRoute} = useRouteHistory();
    const pagesWithoutNavBar = ['/login', '/signup'];
    const isPageWithoutNavbar = pagesWithoutNavBar.includes(pathname);


    useEffect(() => {
        if (!isPageWithoutNavbar) {
          addRoute(`${pathname}${searchParams.size !== 0 ? "?"+searchParams : ""}`)
        }
    }, [pathname])

    return (
        <>
          {!isPageWithoutNavbar && <NavBar />}
          {children}
        </>
      );
}

export function ClientWrapper({children}: {children : React.ReactNode}) {
    
    return (
      <Suspense>
        <Wrapper>
          {children}
        </Wrapper>
      </Suspense>
    )
}