"use client"

import { useState } from "react";

type contactFileProps = {
    title?: string
    bgColor: string
    borderColor: string
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

    return (
        <div
            className={`flex flex-row bg-transparent transition-transform duration-300 ${open ? prop.translateValueClosed ?? '-translate-x-50' : prop.translateValueOpen ?? '-translate-x-full'} ${prop.className}`}
            style={{ zIndex: open ? prop.zIndex : prop.zIndex ?? 20, marginLeft: prop.mlValue ?? 0 }}
        >
            {/*The main part*/}
            <div
                className={`h-full w-full p-5 border-2 flex justify-end-safe ${prop.bgColor}`}
                style={{ borderColor: prop.borderColor }}
            >
                <div className={`transition-opacity duration-400 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}>{prop.children}</div>
            </div>
            {/*The side piece*/}
            <div
                className={`flex flex-row relative -ml-[2px] h-fit writing-mode-vertical bg-transparent border-t-2 hover:cursor-pointer`}
                style={{ marginTop: prop.sideHeight ?? '7px', borderColor: prop.borderColor }}
                onClick={() => setOpen(!open)}
            >
                <div className={`h-4 ${prop.bgColor} ${prop.classNameSide}`}></div>
                <p className={`relative z-1 -mt-1.75 -mb-11.75 px-2.25 ${prop.bgColor} text-sm`}>
                    <span className="inline-block h-30 select-none">{prop.title}</span>
                    <span className="absolute z-1 -top-2.5 right-0 w-0.5 h-[164px]" style={{ backgroundColor: prop.borderColor }}></span>
                </p>
                <div
                    className={`h-20 w-7 -skew-y-50 border-b-3 ${prop.bgColor}`}
                    style={{ borderColor: prop.borderColor }}
                ></div>
            </div>
        </div>
    );
}
