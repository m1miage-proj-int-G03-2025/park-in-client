'use client';
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation';
import LogoParkin from "./logoParkin";
import LoggedUserInfo from "./loggedUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "@/common/configs/firebaseConfig";
import Link from "next/link";
import { useUserContext } from "@/common/providers/UserProvider";

const navs = [
    {name: "Accueil", link: "/", requiresLogin: false}, 
    {name: "Mes réservations", link: "/reservations", requiresLogin: true}, 
    
]

export default function NavBar() {
    const router = useRouter();
    const { addUserInfo, userInfo } = useUserContext()
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
            addUserInfo(null);

        } catch (error) {
            console.error("Erreur de déconnexion avec Google: ", error);
        }
    };

    return(
        <div className="fixed w-screen bg-white z-20 shadow-md">
            <div className="flex justify-between items-center py-2 px-6">
                <div>
                    <LogoParkin width={70} size="2xl"/>
                </div>
                <div className="flex justify-center w-2/6 font-semibold">
                    {
                        navs.filter(nav => !nav.requiresLogin || (nav.requiresLogin && userInfo != null))
                            .map((nav, index) => (
                                <div key={index} className="mx-6"><Link href={nav.link} className="text-black">{nav.name}</Link></div>
                            ))
                    }
                </div>
                <div>
                    {
                        (!userInfo && <Button onPress={() => router.push("/login")} className="px-3 py-2 font-semibold mr-20 text-white" radius="full" color="primary">Se connecter</Button>)
                    }
                    {
                        (userInfo && <LoggedUserInfo user={userInfo} onLogout={handleLogout} />)
                    }
                </div>
            </div>
        </div>
    );
}