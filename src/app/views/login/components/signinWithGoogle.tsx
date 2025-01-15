"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { auth } from "../../../../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignInWithGoogle() {
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Erreur de connexion avec Google: ", error);
        }
    };

    return (
        <div className="flex flex-col">
            <div>
                <Button 
                    className="max-w-xs w-72 font-medium" 
                    variant="bordered" 
                    size="lg"
                    onPress={handleLogin}
                    startContent={<Image alt="google logo" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"/>}>
                        Se connecter avec Google
                </Button>
            </div>
        </div>
    );
};