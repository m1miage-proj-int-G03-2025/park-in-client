"use client";
import SignInWithGoogle from "./components/signinWithGoogle";
import SignInWithEmailAndPassword from "./components/SigninWithEmailAndPassword";
import LogoParkin from "@/components/logoParkin";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/services/userService";
import { useUserContext } from "@/providers/UserProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useLoading } from "@/contexts/loadingContext";
import { useEffect } from "react";
import { reservePlace } from "@/services/parkingsService";

export default function LoginView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const { userId, setUserId } = useUserContext()
    const {user} = useAuth()
    const {setIsLoading} = useLoading()

    console.log(searchQuery)

    const handleLogin = async () => {
        if(user?.email) {
        setIsLoading(true)
        const {idUtilisateur} = await getUserData(user.email);
        setUserId(idUtilisateur)
        setIsLoading(false)
        }
        if(searchQuery) {
            const {idPlace,date, duree, typePlace } = JSON.parse(searchQuery)
            if (userId) {
                const data = {
                    numeroPlace: idPlace,
                    idUtilisateur: userId,
                    dateDebut: date,
                    duree: duree,
                    typePlace
                }
                const { reservationId } = await reservePlace(data)
                router.push(`/reservations/${reservationId}`)
            } else {
                console.error("User ID is null");
            }
        } else {
            router.back()
        }
    } 

        useEffect(() => {
            handleLogin()
        }, [user])

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