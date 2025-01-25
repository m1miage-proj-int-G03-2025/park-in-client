"use client";
import SignInWithGoogle from "./components/signinWithGoogle";
import SignInWithEmailAndPassword from "./components/SigninWithEmailAndPassword";
import LogoParkin from "@/common/components/logoParkin";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/common/services/userService";
import { useUserContext } from "@/common/providers/UserProvider";
import { useAuth } from "@/common/providers/AuthProvider";
import { useLoading } from "@/common/contexts/loadingContext";
import { useEffect } from "react";
import { reservePlace } from "@/common/services/parkingsService";

export default function LoginView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const { userId, addUser, isInitialized } = useUserContext()
    const {user} = useAuth()
    const {setIsLoading} = useLoading()

    const handleReservePlace = async (data: {numeroPlace: string, idUtilisateur: string, dateDebut: string, duree: string, typePlace: string}) => {
        console.log(data)
        await reservePlace(data).then((response) => {
            router.push(`/reservations/${response[0].id}`)
        })
    }

    const handleLogin = async () => {
        if(user?.email) {
        setIsLoading(true)
        await getUserData(user.email).then((data) => {
            console.log(data)
            addUser(data[0].idUtilisateur)
            if(searchQuery) {
                const {idPlace,date, duree, typePlace } = JSON.parse(searchQuery)
                if (isInitialized && userId) {
                    const data = {
                        numeroPlace: idPlace,
                        idUtilisateur: userId,
                        dateDebut:date,
                        duree: duree,
                        typePlace
                    }
                    handleReservePlace(data)
                } else {
                    console.error("User ID is null");
                }
            } else {
                    if(userId)
                    router.back()
            }         
        }).finally(() => {
            setIsLoading(false)
        })
        }
    } 

        useEffect(() => {
            handleLogin()
        }, [isInitialized, userId, user])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
                <div className="flex">
                    <LogoParkin width={60} size={"2xl"}/>
                </div>
                <div className="flex flex-col my-2">
                    <SignInWithGoogle />
                </div>
                <div className="flex justify-center items-center my-4">
                    <span className="font-semibold text-lg">ou</span>
                </div>
                <div>
                    <SignInWithEmailAndPassword  />
                </div>
        </div>
    );
}