"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/common/configs/firebaseConfig";
import { SignInProps } from "./signinWithGoogle";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Spinner } from "@heroui/react";

export default function SignInWithEmailAndPassword({ onSignIn }: SignInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
            setInvalid(false);
            onSignIn(firebaseUser.user.email!);
            setIsLoading(false);
        } catch (error) {
            setInvalid(true);
            console.error("Erreur de connexion", error);
        }
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
                        className="max-w-xs w-72 border-slate-400"
                        errorMessage="Mot de passe invalide"
                        isInvalid={invalid}
                        label="Mot de passe"
                        type={isPasswordVisible ? "text" : "password"}
                        variant="bordered"
                        value={password} onValueChange={setPassword}
                        endContent={
                            <div className="cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {
                                    isPasswordVisible
                                        ? <FaRegEye size={24} />
                                        : <FaRegEyeSlash size={24} />
                                }
                            </div>
                        }
                    />
                </div>

                <div>
                    <Button isDisabled={isLoading && true} type="submit" className="w-72 text-white" color="primary">
                        {
                            isLoading
                                ? <Spinner size="md" color="default" />
                                : "Connexion"
                        }
                    </Button>
                </div>
            </Form>
        </div>
    );
}