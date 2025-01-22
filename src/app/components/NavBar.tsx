'use client';
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useRouter } from 'next/navigation';
import LogoParkin from "./logoParkin";
import { useAuth } from "@/providers/AuthProvider";
import LoggedUserInfo from "./loggedUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

const navs = [
    {name: "Accueil", link: "/", requiresLogin: false}, 
    {name: "Mes réservations", link: "/reservations", requiresLogin: true}, 
    {name: "Abonnement", link: "/abonnement", requiresLogin: false},
]

export default function NavBar() {
    const router = useRouter();
    const { user } = useAuth();
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erreur de déconnexion avec Google: ", error);
        }
    };

    return(
        <div className="fixed w-screen bg-white">
            <div className="flex justify-between items-center py-2 px-6 shadow-xl">
                <div>
                    <LogoParkin width={70} size="2xl"/>
                </div>
                <div className="flex justify-center w-2/6 font-semibold">
                    {
                        navs.filter(nav => !nav.requiresLogin || (nav.requiresLogin && user != null))
                            .map((nav, index) => (
                                <div key={index} className="mx-6"><Link color="foreground" href={`/${nav.link}`}>{nav.name}</Link></div>
                            ))
                    }
                </div>
                <div>
                    {
                        (!user && <Button onPress={() => router.push("/login")} className="px-3 py-2 font-semibold mr-20 text-white" radius="full" color="primary">Se connecter</Button>)
                    }
                    {
                        (user && <LoggedUserInfo user={user} onLogout={handleLogout} />)
                    }
                </div>
            </div>
        </div>
    );
}