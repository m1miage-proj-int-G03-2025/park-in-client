"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Form } from "@heroui/form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

interface SignInWithEmailAndPasswordProps {
    onLogin: () => void;
}

export default function SignInWithEmailAndPassword({onLogin}: SignInWithEmailAndPasswordProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [invalid, setInvalid] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setInvalid(false);
        } catch (error) {
            setInvalid(true);
            console.error("Erreur de connexion", error);
        }
        onLogin();
      };

    return (
        <div className="flex justify-center items-center">
            <Form validationBehavior="aria" onSubmit={handleSubmit}>
                <div className="flex flex-col my-2">
                    <Input
                        isRequired
                        className="max-w-xs w-72"
                        errorMessage="Adresse email invalide"
                        isInvalid={invalid}
                        label="Email"
                        type="email"
                        variant="bordered"
                        value={email} onValueChange={setEmail}
                    />
                </div>

                <div className="flex flex-col my-2">
                    <Input
                        isRequired
                        className="max-w-xs w-72"
                        errorMessage="Mot de passe invalide"
                        isInvalid={invalid}
                        label="Mot de passe"
                        type={isPasswordVisible ? "text" : "password"}
                        variant="bordered"
                        value={password} onValueChange={setPassword}
                        endContent={
                            <Image 
                                alt="password visibility"
                                className="cursor-pointer"
                                src={isPasswordVisible ? "/eye.png": "/eyeoff.png"} 
                                width={24} 
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
                        }
                    />
                </div>

                <div>
                    <Button type="submit" className="w-72" color="primary">Connexion</Button>
                </div>
            </Form>
        </div>
    );
}