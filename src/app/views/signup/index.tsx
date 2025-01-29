"use client";
import LogoParkin from "@/common/components/logoParkin";
import SignUpWithGoogle from "./components/SignUpWithGoogle";
import { SignUpWithEmailAndPassword } from "./components/SignUpWithEmailAndPassword";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/common/providers/UserProvider";
import { CreateUserParams } from "@/common/types/create-user-params";
import { createUser } from "@/common/services/userService";
import { useRouteHistory } from "@/common/providers/RouteHistoryProvider";

export default function SignupView() {
    const router = useRouter();
    const {addUserInfo} = useUserContext();
    const {previousRoute} = useRouteHistory();

    const handleSignUp = async (createUserParams: CreateUserParams) => {
        const user = await createUser(createUserParams);
        addUserInfo(user);
                
        if (!previousRoute) {
            router.push("/");
        } else {
            router.push(previousRoute!);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex">
                <LogoParkin width={60} size={"2xl"}/>
            </div>
            <div className="flex flex-col my-2">
                <SignUpWithGoogle onSignUp={handleSignUp} />
            </div>
            <div className="flex justify-center items-center my-4">
                <span className="font-semibold text-lg">ou</span>
            </div>
            <div>
                <SignUpWithEmailAndPassword onSignUp={(user) => handleSignUp(user)}/>
            </div>
        </div>
    )
}