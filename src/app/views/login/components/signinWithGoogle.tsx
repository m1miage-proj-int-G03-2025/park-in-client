"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { auth } from "@/common/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export interface SignInProps {
    onSignIn: (userEmail: string) => void;
}

export default function SignInWithGoogle({onSignIn}: SignInProps) {
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const firebaseUser = await signInWithPopup(auth, provider);
            onSignIn(firebaseUser.user.email!);
        } catch (error) {
            console.error("Erreur de connexion avec Google: ", error);
        }
    };

    return (
        <div className="flex flex-col">
            <div>
                <Button
                    className="max-w-xs w-72 font-medium border-slate-400" 
                    variant="bordered"
                    size="lg"
                    onPress={handleLogin}
                    startContent={<Image alt="google image" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"/>}>
                        Se connecter avec Google
                </Button>
            </div>
        </div>
    );
};