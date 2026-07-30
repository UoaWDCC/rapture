"use client";
import { useState } from "react";

type props= {
    className?: string;
}

export default function IncrementorButton(props: props) {
    const [counter, setCounter] = useState(0);

    const incrementor = () => {
        setCounter(counter + 1);
    }

    const decrementor = () => {
        if (counter > 0) setCounter(counter - 1);
    }

    return (
        <div className={`flex flex-row w-[35%] px-[3.5%] py-[1.5%] border-white border ${props.className}`}>
            <button
                className={`font-mono text-white rounded-sm hover:text-shadow-white hover:text-shadow-xs hover:cursor-pointer`}
                onClick={() => decrementor()}
            >-</button>
            <span className="number mx-auto">{counter}</span>
            <button
                className={`font-mono text-white rounded-sm hover:text-shadow-white hover:text-shadow-xs hover:cursor-pointer`}
                onClick={() => incrementor()}
            >+</button>
        </div>
    )
}