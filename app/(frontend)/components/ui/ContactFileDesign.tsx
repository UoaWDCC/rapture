type contactFileProps = {
    title?: string
    bgColor: string
    className?: string
    classNameSide?: string
    children: React.ReactNode;
}

export default function ContactFile(prop: contactFileProps) {
    return(
        <div className={`flex flex-row ${prop.className}`}>
            {/*The main part*/}
            <div className={`h-full w-full p-5 ${prop.bgColor}`}>
                {prop.children}
            </div>
            {/*The side piece*/}
            <div className={`flex flex-row relative -ml-0.5 h-fit writing-mode-vertical bg-transparent`}>
                <div className={`h-4 w-10 skew-y-20 ${prop.bgColor} ${prop.classNameSide}`}></div>
                <p className={`-mt-1.75 -mb-11.75 py-ppx px-2.25 ${prop.bgColor} text-2xl`}>{prop.title}</p>
                <div className={`h-4 w-10 -skew-y-20 mt-10 ${prop.bgColor}`}></div>
            </div>
        </div>
    );
}
