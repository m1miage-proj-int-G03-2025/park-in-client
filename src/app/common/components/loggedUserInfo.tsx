
import { Avatar, AvatarIcon } from "@heroui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { UserDetails } from "../types/user-details";

interface LoggedUserInfo {
    user: UserDetails
    onLogout: () => void;
}

export default function LoggedUserInfo({user, onLogout}: LoggedUserInfo) {
    return (
        <Popover placement="bottom">
        <PopoverTrigger>
            <div className="flex flex-col justify-center items-center mr-20 cursor-pointer">
                <div>
                    <Avatar 
                        classNames={{
                            base: "bg-[#2b77c4]",
                            icon: "text-black/80",
                            }}
                    icon={<AvatarIcon />} />
                </div>
                <div>
                    <span className="text-xs italic">{user.prenom+" "+user.nom}</span>
                </div>
            </div>
        </PopoverTrigger>
        <PopoverContent>
            <Button
                onPress={() => onLogout()}
                className="px-4 py-2"
                variant="light"
                startContent={<AiOutlineLogout size={25} />}>
                    Déconnexion
            </Button>
        </PopoverContent>
        </Popover>
    )
}