import { Image } from "@heroui/image";

interface BlockInfoProps {
    title: string;
    text: string;
    order: number;
    iconName: string;
}

export default function BlockInfo(props: BlockInfoProps) {
    return (
        <div className="flex flex-col w-[180px] h-[190px] bg-white rounded-xl py-2 px-2 text-center">
            <div className="flex">
                 <div className="w-1/2 pl-4"><Image src={"/"+props.iconName} radius="none" height={50} alt="block icon"/></div>
                 <div className="grow text-5xl font-bold text-gray-300 font-mono">0{ props.order }</div>
            </div>
            <div className="flex flex-col grow items-center justify-center">
                <div>
                    <span className="font-extrabold text-xs text-slate-900">{props.title}</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-400">
                        { props.text }
                    </p>
                </div>
            </div>
        </div>
    );
}