"use client";
import SignInWithGoogle from "./components/signinWithGoogle";
import SignInWithEmailAndPassword from "./components/SigninWithEmailAndPassword";
import LogoParkin from "@/common/components/logoParkin";
import { useRouter } from "next/navigation";
import { getUserData } from "@/common/services/userService";
import { useUserContext } from "@/common/providers/UserProvider";
import Link from "next/link";
import { useError } from "@/common/contexts/errorContext";
import { useEffect } from "react";
import { ErrorMessages } from "@/common/utils/error-messages-helper";

export default function LoginView() {
    const router = useRouter();
    const { addUserInfo, userInfo } = useUserContext();
    const {showErrorMessage} = useError();

    const handleLogin = async (userEmail: string) => {
        try {
            const user = (await getUserData(userEmail)).at(0);
            addUserInfo(user!);
        } catch (error) {
            console.error(error);
            showErrorMessage(ErrorMessages.CONNEXION_ERROR);
        }
    };

    useEffect(() => {
        if (userInfo) {
            router.back();
        }        
    }, [userInfo]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex">
                <LogoParkin width={60} size={"2xl"} />
            </div>
            <div className="flex flex-col my-2">
                <SignInWithGoogle onSignIn={(userEmail) => handleLogin(userEmail)} />
            </div>
            <div className="flex justify-center items-center my-4">
                <span className="font-semibold text-lg">ou</span>
            </div>
            <div>
                <SignInWithEmailAndPassword onSignIn={(userEmail) => handleLogin(userEmail)} />
            </div>
            <div className="text-xs 2xl:text-sm mt-2">
                <span>{"Vous n'avez pas de compte ?"}</span>
                <Link href="/signup" className="text-blue-500 ml-1 font-semibold">Inscrivez-vous</Link>
            </div>
        </div>
    );
}