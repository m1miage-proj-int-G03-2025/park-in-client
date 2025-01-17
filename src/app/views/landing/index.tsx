'use client';
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation'
import BlockInfo from "./components/block-info";
import { BsSendFill } from "react-icons/bs";

const blockInfos = [
    {icon: "recherche.png", title:"Rechercher des parkings", text: "Plus de 200.000 places de parking disponibles dans les départements et villes de France"},
    {icon: "reservation.png", title:"Réservez votre place", text: "Choisissez votre place, confimez votre réservation et c'est terminé !"},
    {icon: "garage.png", title:"Arrivez et garez-vous", text: "Rendez-vous sur place, scannez et garez vous"},
]

export default function LandingView() {
    const router = useRouter();
    return (
        <div className="flex flex-col h-screen bg-[#2B77C4]">
            <div className="flex h-2/3 mt-16 bg-[url('/parking-reims.jpg')] bg-no-repeat bg-cover bg-center">
                <div className="flex flex-col w-full h-full bg-[#2b78c46c] justify-center items-center text-white">
                    <div className="flex items-center">
                        <span className="bg-white w-6 h-px"></span>
                        <span className="text-large mx-1">Parking en ligne</span>
                        <span className="bg-white w-6 h-px"></span>
                    </div> 
                    <div className="text-3xl font-semibold">Garez-vous sereinement, réservez instantanément</div>
                    <div>
                        <Button startContent={<BsSendFill color="white" />} onPress={() => router.push("/")} className="px-3 py-3 font-semibold text-lg mt-4" radius="full" color="primary">Trouver des places de parking</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly my-[-80px]">
                {
                    blockInfos.map((info, index) => <BlockInfo key={index} title={info.title} text={info.text} order={index+1} iconName={info.icon}/>)
                }
            </div>
        </div>
    );   
}