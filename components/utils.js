import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {dynamic} from 'next/dynamic'
import Icons from 'react-icons'

export function cn(...inputs){
    return twMerge(clsx(inputs));
}

export const DynamicIcon = ({ name, ...props }) => {
    const prefix = String(name).substring(0,2).toLowerCase();
    const Icons = import('react-icons/'+prefix);
    const Icon = Icons[name] ;
    return Icon ? <Icon {...props} /> : <></>;
}