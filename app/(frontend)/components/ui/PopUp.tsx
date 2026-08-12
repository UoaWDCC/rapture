import Image from "next/image"
import type { ReactNode } from "react"

type textPopUp = {
  title?: string
  text?: ReactNode
  width?: number
  height?: number
  className?: string
  titleClassName?: string
  textClassName?: string
}

type imgPopUp = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

type popUpProps = textPopUp | imgPopUp

export default function PopUp(prop: popUpProps,) {
  {/*title is reqiured ... or is it?*/ }
  if ("title" in prop || "text" in prop) {
    return (
      <div
        className={`border-l border-r border-b border-dotted border-[#D9D9D9] text-white ${prop.className}`}
        style={{ width: prop.width, height: prop.height }}
      >
        {/*The top part of the PopUp*/}
        <div className="bg-[#D9D9D9] h-5"></div>
        {/*The main part of the PopUp*/}
        <div className="h-full p-5 bg-black/80 gap-y-[5%]">
          {prop.title && (
            <h3
              className={`whitespace-pre-wrap text-[clamp(0.9rem,2.5vw,1.75rem)] ${prop.titleClassName ?? ""}`}
            >
              {prop.title}
            </h3>
          )}
          <p className={`whitespace-pre-wrap ${prop.textClassName ?? ""}`}>{prop.text}</p>
        </div>
      </div>
    );
  }

  if ("src" in prop) {
    {/*imgSrc is reqiured*/ }
    return (
      <div className={`w-fit border-l border-r border-b border-dotted border-[#D9D9D9] text-white ${prop.className}`}>
        {/*The top part of the PopUp*/}
        <div className="bg-[#D9D9D9] h-5"></div>
        {/*The main part of the PopUp*/}
        <div><Image className="max-w-full h-auto" src={prop.src ?? ""} alt={prop.alt} width={prop.width} height={prop.height} sizes="100vw" /></div>
      </div>
    )
  }
}