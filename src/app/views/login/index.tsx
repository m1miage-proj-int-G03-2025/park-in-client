import SignInWithGoogle from "./components/signinWithGoogle";
import SignInWithEmailAndPassword from "./components/SigninWithEmailAndPassword";
import LogoParkin from "@/app/components/logoParkin";

export default function LoginView() {
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
                    <SignInWithEmailAndPassword />
                </div>
        </div>
    );
}