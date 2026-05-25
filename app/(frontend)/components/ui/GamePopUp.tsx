import Image from "next/image"

type popUpType = "image" | "text"

type popUpProps = {
    type: popUpType
    width: number
    height: number
    imgSrc: string | null
    imgAlt: string | null
    title: string | null
    text: string | null
}

export default function PopUp({ type, width, height, imgSrc, imgAlt, title, text }: popUpProps) {
    if (type === "image") {
        if (!imgSrc || !imgAlt) {
            console.error("Error: image must have src and alt!")
        } else{
            return(
                <div style={{ width: `${width}px`, height: `${height}px` }}>
                    {/*The top part of the PopUp*/}
                    <div className="bg-white h-10"></div>
                    {/*The main part of the PopUp*/}
                    <div><Image src={imgSrc} alt={imgAlt} width={width} height={height-10} /></div>
                </div>
            );
        }
    }

    if (!title || !text) {
        console.error("Error: title and text must NOT be null!")
    } else {
        return(
            <div style={{ width: `${width}px`, height: `${height}px` }}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        );
    }
}