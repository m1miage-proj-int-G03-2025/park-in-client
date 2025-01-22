import { Image } from "@heroui/image";

interface BlockInfoProps {
    title: string;
    text: string;
    order: number;
    iconName: string;
    paddingTop: number;
}

export default function BlockInfo(props: BlockInfoProps) {
    const {paddingTop} = props;
    return (
        <div className={`flex flex-col w-[220px] h-[240px] bg-white rounded-xl py-4 px-2 text-center shadow-2xl mx-8 mt-${paddingTop}`}>
            <div className="flex">
                 <div className="w-1/2 pl-4"><Image src={"/"+props.iconName} radius="none" height={60} alt="block icon"/></div>
                 <div className="grow text-6xl font-bold text-gray-300">0{ props.order }</div>
            </div>
            <div className="flex flex-col grow items-center justify-center">
                <div>
                    <span className="font-extrabold text-sm text-slate-900 text-[#2b77c4]">{props.title}</span>
                </div>
                <div>
                <svg width="50" height="20" viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50 Q 33 100, 66 50 T 132 50 T 198 50 T 264 50 T 330 50 T 396 50 T 462 50" stroke="#2b77c4" fill="transparent" stroke-width="30"/>
                </svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-400">
                        { props.text }
                    </p>
                </div>
            </div>
        </div>
    );
}