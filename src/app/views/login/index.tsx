"use client";
import SignInWithGoogle from "./components/signinWithGoogle";
import SignInWithEmailAndPassword from "./components/SigninWithEmailAndPassword";
import LogoParkin from "@/components/logoParkin";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    console.log(searchQuery)
    const handleLogin = () => {
        if(searchQuery) {
            //send post request to backend
            //navigate to reservation confirmed page
        } else {
            router.back()
        }};

    return (
        <div className="flex flex-col justify-center items-center h-screen">
                <div className="flex">
                    <LogoParkin width={60} size={"2xl"}/>
                </div>
                <div className="flex flex-col my-2">
                    <SignInWithGoogle onLogin={handleLogin} />
                </div>
                <div className="flex justify-center items-center my-4">
                    <span className="font-semibold text-lg">ou</span>
                </div>
                <div>
                    <SignInWithEmailAndPassword onLogin={handleLogin} />
                </div>
        </div>
    );
}