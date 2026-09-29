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
    mlVw?: number;
    mlClassName?: string;
    translateValueOpen?: string;
    translateValueClosed?: string;
    closedWidthClass?: string;
    closedWidthPercent?: number;
    openWidthClass?: string;
    openWidthPercent?: number;
    widthOffsetPx?: number;
}

export default function ContactFile(prop: contactFileProps) {
    const [open, setOpen] = useState(false);
    const widthPercent = open ? prop.openWidthPercent : prop.closedWidthPercent;
    const offsetPx = prop.widthOffsetPx ?? 0;

    return (
        <div
            className={`flex flex-row bg-transparent w-full pointer-events-none transition-transform duration-300 ${open ? prop.translateValueClosed ?? '' : prop.translateValueOpen ?? ''} ${prop.className}`}
            style={{ zIndex: open ? prop.zIndex : prop.zIndex ?? 20 }}
        >
            {/*The main part*/}
            <div
                className={`h-full pointer-events-auto overflow-hidden ${open ? (prop.openWidthClass ?? 'w-full') : (prop.closedWidthClass ?? 'w-full')} p-0 lg:p-5 border-2 flex justify-end-safe transition-[width,margin-left] duration-300 ${prop.mlClassName ?? ''} ${prop.bgColor}`}
                style={{
                    borderColor: prop.borderColor,
                    width: widthPercent !== undefined ? `calc(${widthPercent}% - ${offsetPx}px)` : undefined,
                    marginLeft: prop.mlClassName !== undefined ? undefined : (prop.mlVw !== undefined ? `${prop.mlVw}vw` : prop.mlValue ?? 0),
                }}
            >
                <div className={`pl-10 mr-0 lg:mr-[1%] xl:mr-[8%] min-w-0 max-w-150 transition-opacity duration-400 ease-in-out ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>{prop.children}</div>
            </div>
            {/*The side piece*/}
            <div
                className={`flex flex-row relative -ml-[2px] h-fit writing-mode-vertical bg-transparent border-t-2 pointer-events-auto hover:cursor-pointer`}
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
