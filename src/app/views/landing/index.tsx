'use client';
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation'
import BlockInfo from "./components/block-info";
import { BsSendFill } from "react-icons/bs";
import WaveElement from "@/components/wave-element";

const blockInfos = [
    {icon: "recherche.png", paddingTop: 0, title:"Rechercher des parkings", text: "Plus de 200.000 places de parking disponibles dans les départements et villes de France"},
    {icon: "reservation.png", paddingTop: 10, title:"Réservez votre place", text: "Choisissez votre place, confimez votre réservation et c'est terminé !"},
    {icon: "garage.png", paddingTop: 20, title:"Arrivez et garez-vous", text: "Rendez-vous sur place, scannez et garez vous"},
]

export default function LandingView() {
    const router = useRouter();
    return (
        <div className="flex flex-col h-screen">

            <div className="flex h-screen w-screen justify-center items-center z-20">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col w-full mt-5 mb-10 justify-center items-center">
                        <div className="text-2xl font-semibold">Garez-vous sereinement, réservez instantanément</div>
                        <div>
                            <Button startContent={<BsSendFill color="white" />} onPress={() => router.push("/recherche-parking")} className="px-3 py-3 font-semibold text-lg mt-4 text-white" radius="full" color="primary">Trouver des places de parking</Button>
                        </div>
                    </div>
                    <div className="flex">
                        {
                            blockInfos.map((info, index) => 
                                <BlockInfo 
                                    key={index}
                                    title={info.title}
                                    text={info.text}
                                    order={index+1}
                                    iconName={info.icon}
                                    paddingTop={info.paddingTop} 
                                    />)
                        }
                    </div>
                </div>
            </div>

            <WaveElement />
        </div>
    );   
}