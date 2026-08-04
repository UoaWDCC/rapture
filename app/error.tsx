"use client";

import Image from "next/image";

export default function Custom500() {
  return (
    <div className="flex flex-col w-full h-screen mx-auto my-auto bg-black text-white items-center justify-center">
      <div className="max-w-[30%] max-h-[20%] mt-[-2.5%]">
        <Image src="/Rapture_Large_2500-1000.png" alt="Logo.png" height={1000} width={1000} />
      </div>
      <div className="w-[40%] mt-[-2%]">
        <p className="w-full text-center md:text-base text-xs">error #500</p>
        {/* <p className="w-full text-center">You have reached a dead end.</p> */}
        <p className="w-full mb-[1.75%] text-center md:text-base text-xs"><a href="/" className="text-blue-500 text-shadow-blue-300 hover:text-shadow-sm hover:underline">Click here to return to the home page.</a></p>
      </div>
    </div>
  )
}