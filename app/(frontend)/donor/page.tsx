export const dynamic = 'force-dynamic';

import DonorBox from "../components/Donor";

export default async function DonorPage() { 

  return (
    <div className="mb-40 p-8 flex flex-col gap-10 items-center">
        <h1 className="mb-10">DONOR</h1>

        <div className="w-[80%] md:w-[70%] grid grid-cols-1 md:grid-cols-3 gap-1">
            <DonorBox 
                name="Name"
            />

            <DonorBox 
                name="Name"
                className="-mt-16 md:mt-0"
            />

            <DonorBox 
                name="Name"
                className="-mt-16 md:mt-0"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
                text="thisisatest thisisatest thisisatest thisisatest
                        thisisatest thisisatest thisisatest thisisatest
                        thisisatest thisisatest thisisatest thisisatest"
                image="DISCORD.png"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />

            <DonorBox 
                name="Name"
                className="-mt-16"
            />
        </div>

        <div className="w-[70%]">
            <DonorBox 
                name="name"    
            />
        </div>
    </div>
  )
}