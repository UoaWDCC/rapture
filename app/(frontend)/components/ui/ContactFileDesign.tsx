"use client"

import { useState } from "react";

type contactFileProps = {
    title?: string
    bgColor: string
    className?: string
    classNameSide?: string
    children?: React.ReactNode;
    sideHeight?: string;
    zIndex?: number;
    mlValue?: number;
    translateValueOpen?: string;
    translateValueClosed?: string;
}

export default function ContactFile(prop: contactFileProps) {
    const [open, setOpen] = useState(false);

    return(
        <div className={`flex flex-row bg-transparent transition-transform duration-300 ${open ? prop.translateValueClosed ?? 'translate-x-[-200px]' : prop.translateValueOpen ?? '-translate-x-[100%]'} ${prop.className}`}
                style={{ zIndex: open ? 50 : prop.zIndex ?? 20, 
                         marginLeft: prop.mlValue ?? 0,
                }}>
            {/*The main part*/}
            <div className={`h-full w-full p-5 ${prop.bgColor}`}>
                {prop.children}
            </div>
            {/*The side piece*/}
            <div className={`flex flex-row relative -ml-0.5 h-fit writing-mode-vertical bg-transparent hover:cursor-pointer`}
                    style={{ marginTop: prop.sideHeight ?? '7px' }}
                    onClick={() => setOpen(!open)}>
                <div className={`h-4 w-10 skew-y-20 ${prop.bgColor} ${prop.classNameSide}`}></div>
                <p className={`-mt-1.75 -mb-11.75 py-ppx px-2.25 ${prop.bgColor} text-2xl`}>{prop.title}</p>
                <div className={`h-4 w-10 -skew-y-20 mt-10 ${prop.bgColor}`}></div>
            </div>
        </div>
    );
}
