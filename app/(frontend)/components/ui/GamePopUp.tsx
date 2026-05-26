import Image from "next/image"

type textPopUp = {
    title?: string
    text?: string
    className?: string
}

type imgPopUp = {
    src: string
    alt: string
    width: number
    height: number
    className?: string
}

type popUpProps = textPopUp | imgPopUp

export default function PopUp(prop: popUpProps,) { {/*title is reqiured ... or is it?*/}
    if ("title" in prop) {
        return(
            <div className={`inline-block border-l border-r border-b border-dotted border-[#D9D9D9] text-white ${prop.className}`}>
                {/*The top part of the PopUp*/}
                <div className="bg-[#D9D9D9] h-5"></div>
                {/*The main part of the PopUp*/}
                <div className="h-full p-[4%] bg-black/80">
                    <h1 className="mb-[5%]">{prop.title}</h1>
                    <p>{prop.text}</p>
                </div>
            </div>
        );
    }

    if ("src" in prop) { {/*imgSrc is reqiured*/}
        return(
            <div className={`border-solid border-1 border-[#D9D9D9] text-white ${prop.className}`}>
                {/*The top part of the PopUp*/}
                <div className="bg-[#D9D9D9] h-5"></div>
                {/*The main part of the PopUp*/}
                <div><Image src={prop.src ?? ""} alt={prop.alt} width={prop.width} height={prop.height} sizes="100vw" /></div>
            </div>
        )
    }
}