import Image from "next/image"

type textPopUp = {
    width: number
    height: number
    title?: string
    text?: string 
}

type imgPopUp = {
    width: number
    height: number
    imgSrc: string
    imgAlt: string
}

type popUpProps = textPopUp | imgPopUp

export default function PopUp(prop: popUpProps) { {/*title is reqiured ... or is it?*/}
    if ("title" in prop) {
        return(
            <div style={{ width: `${prop.width}px`, height: `${prop.height}px` }} className="inline-block m-[2.5%] border-l border-r border-b border-dotted border-[#D9D9D9] text-white">
                {/*The top part of the PopUp*/}
                <div className="bg-[#D9D9D9] h-5"></div>
                {/*The main part of the PopUp*/}
                <div className="h-full m-[5%] bg-black/80">
                    <h1 className="mb-[5%]">{prop.title}</h1>
                    <p>{prop.text}</p>
                </div>
            </div>
        );
    }

    if ("imgSrc" in prop) { {/*imgSrc is reqiured*/}
        return(
            <div style={{ width: `${prop.width}px`, height: `${prop.height}px` }} className="border-solid border-[#D9D9D9] text-white">
                {/*The top part of the PopUp*/}
                <div className="bg-[#D9D9D9] h-10"></div>
                {/*The main part of the PopUp*/}
                <div><Image src={prop.imgSrc ?? ""} alt={prop.imgAlt} width={prop.width} height={prop.height-10} /></div>
            </div>
        )
    }
}