import Icon from "@/components/icon";
import { colors } from "@/constants/colors";
import * as MaterialIcons from "react-icons/md";

interface InputFieldProps {
    type?: string;
    text: string;
    iconName: keyof typeof MaterialIcons;
    iconColor?: string;
    iconSize?: number;
}

const InfoField = (props: InputFieldProps) => {
    const {type = 'text', text, iconName, iconColor = colors.main, iconSize = 30} = props;
    return (
        <div className="flex items-center gap-1">
        <Icon name={iconName} color={iconColor} size={iconSize} />
       { type == 'link'? <a
        href={`https://${text}`}
        target="_blank"
        rel="noopener noreferrer"
       className="text-xl font-normal text-blue-600 underline leading-none align-middle"
       >
{text}
</a>:
 <p className="text-xl font-normal text-black mb-0 leading-none align-middle">
           {text}
        </p>
    
        }
      </div>

    )
}
export default InfoField;