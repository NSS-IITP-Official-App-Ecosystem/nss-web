"use client"
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ value, duration = 1 }) {

    const ref = useRef();

    const [currentValue, setCurrentValue] = useState(0);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        const timeInterval = Math.floor((duration * 1000) / value);
        let count = 0;

        let timer = setInterval(() => {
            count++;
            setCurrentValue(Math.floor((timeInterval * count) / (duration * 1000) * value))
            if ((timeInterval * count) / (duration * 1000) >= 1) clearInterval(timer);
        }, timeInterval)

        return () => clearInterval(timer);
    }, [inView, value, duration]);

    return <span ref={ref}>{currentValue}</span>

}