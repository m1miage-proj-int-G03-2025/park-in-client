
interface DetailsInfoProps {
    title: string;
    value: string | number;
    className?: string;
    currency?: string;
}

export default function DetailsInfo({title, value, className, currency}: DetailsInfoProps) {
    return (
        <div className={"flex flex-col justify-center items-center "+className}>
            <div>
                <span className="text-slate-500 text-xl">{title}</span>
            </div>
            <div>
                <span className="text-lg">{value} {currency}</span>
            </div>
        </div>
    )
}