"use client";
import { auth } from "@/common/configs/firebaseConfig";
import { useError } from "@/common/contexts/errorContext";
import { Button, Form, Input, Spinner } from "@heroui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { SignUpProps } from "./SignUpWithGoogle";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ErrorMessages } from "@/common/utils/error-messages-helper";

export function SignUpWithEmailAndPassword({onSignUp}: SignUpProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const {showErrorMessage} = useError();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const InputRow1 = [
        {name: "nom", label:"Nom", type: "text", value:formData.nom, errorMessage:"Veuillez renseigner ce champ"},
        {name: "prenom", label:"Prénom", type: "text", value:formData.prenom, errorMessage:"Veuillez renseigner ce champ"}
    ];

    const InputRow2 = [
        {name: "email", label:"Email", type: "email", value:formData.email, errorMessage:"Adresse email invalide"},
        {name: "password", label:"Mot de passe", type: isPasswordVisible ? "text" : "password", value:formData.password, errorMessage:"minimum 6 caractères", isInvalid: (formData.password.length > 0 && formData.password.length < 6)}
    ]

    const classNames = {
        inputWrapper: "bg-[#E4E4E7] data-[hover=true]:bg-[#ededee] group-data-[focus=true]:bg-[#E4E4E7]"
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            onSignUp({nom: formData.nom, prenom: formData.prenom, email: formData.email});
            setIsLoading(false);
        } catch (error) {
            showErrorMessage(ErrorMessages.INSCRIPTION_ERROR);
            console.error("Erreur d'inscription", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Form validationBehavior="native" onSubmit={handleSubmit}>
                <div className="flex w-[50%] gap-2">
                        {
                            InputRow1.map(input => (
                                <div key={input.name} className="flex flex-col">
                                    <Input
                                        isRequired
                                        size="sm"
                                        className="max-w-xs w-72"
                                        classNames={classNames}
                                        onChange={handleChange}
                                        {...input}
                                    />
                                </div>
                                )
                            )
                        }
                </div>

                <div className="flex w-[50%] gap-2">
                    {
                        InputRow2.map(input => (
                            <div key={input.name} className="flex flex-col">
                                <Input
                                    isRequired
                                    className="max-w-xs w-72"
                                    size="sm"
                                    classNames={classNames}
                                    onChange={handleChange}
                                    {...input}
                                    endContent={ input.name === "password"
                                        ? (
                                            <div className="cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                {
                                                    isPasswordVisible
                                                    ? <FaRegEye size={24} />
                                                    : <FaRegEyeSlash size={24} />
                                                }
                                            </div>
                                        )
                                        : undefined
                                    }
                                />
                            </div>
                        ))
                    }
                </div>

                <div className="flex w-full justify-center mt-4">
                    <Button isDisabled={isLoading && true} type="submit" className="w-72 text-white" color="primary">
                        {
                            isLoading
                                ? <Spinner size="md" color="default" />
                                : "Créer un compte"
                        }
                    </Button>
                </div>
            </Form>
        </div>
    )
}