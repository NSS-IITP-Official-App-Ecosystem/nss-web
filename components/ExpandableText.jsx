'use client'
import { useState } from "react";
import { motion } from 'framer-motion'

export const ExpandableText = ({ text, length }) => {
    if (!length) length = 140;
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = text && text.length > length;

    if (!isLongText) {
        return <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">{text}</p>;
    }

    return (
        <motion.p layout className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">
            {isExpanded ? text : `${text.slice(0, length)}...`}
            <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className="text-[#0a1128] font-bold bg-none border-none cursor-pointer p-0 ml-1.5 text-xs underline inline"
            >
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>
        </motion.p>
    );
};