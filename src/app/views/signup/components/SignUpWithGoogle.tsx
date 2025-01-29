"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { auth } from "@/common/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CreateUserParams } from "@/common/types/create-user-params";
import { useError } from "@/common/contexts/errorContext";


export interface SignUpProps {
    onSignUp: (user: CreateUserParams) => void;
}

export default function SignUpWithGoogle({onSignUp}: SignUpProps) {
    const {showErrorMessage} = useError();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const firebaseUser = await signInWithPopup(auth, provider);
            onSignUp({nom: firebaseUser.user.displayName ?? "", prenom: "", email: firebaseUser.user.email ?? ""});
        } catch (error) {
            showErrorMessage(ErrorMessages.INSCRIPTION_ERROR);
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
                        {"S'inscrire avec Google"}
                </Button>
            </div>
        </div>
    );
};