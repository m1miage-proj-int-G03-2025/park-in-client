import React from 'react';
import * as MaterialIcons from 'react-icons/md'; 
import { colors } from '../constants/colors';

interface IconProps {
  name: keyof typeof MaterialIcons; 
  size?: number; 
  color?: string; 
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
  const { name, size = 24, color = colors.main, style } = props;

  const IconComponent = MaterialIcons[name]; 

  if (!IconComponent) {
    console.error(`Icon "${name}" does not exist in Material Community Icons.`);
    return <MaterialIcons.MdQuestionMark size={size} color={color} style={style} />
  }

  return <IconComponent size={size} color={color} style={style}/>;
};

export default Icon;