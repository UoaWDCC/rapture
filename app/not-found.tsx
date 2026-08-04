"use client";

import Image from "next/image";

export default function Custom404() {
  return (
    <div className="w-full h-full mx-auto mt-[17.5%] bg-black text-white items-center justify-center">
      <div className="max-w-[30%] max-h-[20%] ml-[35%]">
        <Image src="/Rapture_Large_2500-1000.png" alt="Logo.png" height={1000} width={1000} />
      </div>
      <div className="w-[40%] ml-[30%] mr-[30%] mt-[-3.5%]">
        <p className="w-full text-center">error #404</p>
        {/* <p className="w-full text-center">You have reached a dead end.</p> */}
        <p className="w-full text-center"><a href="/" className="text-blue-500 text-shadow-blue-300 hover:text-shadow-sm hover:underline">Click here to return to the home page.</a></p>
      </div>
    </div>
  )
}