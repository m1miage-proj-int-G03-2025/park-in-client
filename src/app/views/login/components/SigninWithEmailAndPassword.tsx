import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Form } from "@nextui-org/form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebaseConfig";

export default function SignInWithEmailAndPassword() {
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