import { Image } from "@nextui-org/image";

interface LogoParkinProps {
    width: number
    size: string
}

export default function LogoParkin(props: LogoParkinProps) {
    return (
        <div className="flex items-center">
            <Image 
                src="/parkin-logo.png" 
                width={props.width}
                alt="Logo parkin"/>
            <span className={"text-[#2b77c4ff] font-semibold text-"+props.size}>Park</span>
            <span className={"text-[#449A1D] font-semibold text-"+props.size}>In</span>
        </div>
    )
}