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
        <div className={`flex flex-row bg-transparent transition-transform duration-300 ${open ? prop.translateValueClosed ?? '-translate-x-50' : prop.translateValueOpen ?? '-translate-x-full'} ${prop.className}`}
                style={{ zIndex: open ? prop.zIndex : prop.zIndex ?? 20, 
                         marginLeft: prop.mlValue ?? 0,
                }}>
            {/*The main part*/}
            <div className={`h-full w-full p-5 flex justify-end-safe shadow-black shadow-xl ${prop.bgColor}`}>
                <div className={`transition-opacity duration-400 ease-in-out ${open ? 'opacity-100' : 'opacity-0' }`}>{prop.children}</div>
            </div>
            {/*The side piece*/}
            <div className={`flex flex-row relative -ml-0.5 h-fit writing-mode-vertical bg-transparent hover:cursor-pointer`}
                    style={{ marginTop: prop.sideHeight ?? '7px' }}
                    onClick={() => setOpen(!open)}>
                <div className={`h-4 w-5.125 md:w-10 skew-y-20 ${prop.bgColor} ${prop.classNameSide}`}></div>
                <p className={`-mt-1.75 -mb-11.75 w-5 md:w-10 py-ppx px-2.25 ${prop.bgColor} text-sm md:text-xl `}>{prop.title}</p>
                <div className={`h-4 w-5 md:w-10 -skew-y-20 mt-10 ${prop.bgColor}`}></div>
            </div>
        </div>
    );
}
