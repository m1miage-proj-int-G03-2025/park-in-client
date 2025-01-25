import Icon from "@/common/components/icon";
import { colors } from "@/common/constants/colors";
import * as MaterialIcons from "react-icons/md";

interface InputFieldProps {
    type?: string;
    text: string;
    iconName?: keyof typeof MaterialIcons;
    iconColor?: string;
    iconSize?: number;
    label?: string;
}

const InfoField = (props: InputFieldProps) => {
    const {
        type = "text",
        text,
        iconName,
        iconColor = colors.main,
        iconSize = 30,
        label,
    } = props;

    return (
        <div className="flex items-center gap-2">
            {label && (
                <p
                    className="text-lg font-semibold"
                    style={{
                        color: "grey",
                        width: "150px", 
                        textAlign: "left",
                        marginRight: "10px",
                    }}
                >
                    {label}
                </p>
            )}
            {iconName && <Icon name={iconName} color={iconColor} size={iconSize} />}
            {type === "link" ? (
                <a
                    href={`${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-normal text-blue-600 underline leading-none align-middle flex-grow"
                >
                    Lien Parking
                </a>
            ) : (
                <p className="text-xl font-normal text-black mb-0 leading-none align-middle flex-grow">
                    {text}
                </p>
            )}
        </div>
    );
};

export default InfoField;
