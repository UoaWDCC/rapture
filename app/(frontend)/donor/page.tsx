export const dynamic = 'force-dynamic';

import DonorBox from "../components/Donor";
import DonorBigBox from "../components/DonorBigBox";

export default async function DonorPage() { 

  return (
    <div className="mt-20 p-8 flex flex-col items-center">
        <h1 className="mb-10">DONOR</h1>

        <div className="w-[80%] md:w-[70%] grid grid-cols-1 md:grid-cols-3 gap-1">
            
            <div className="relative h-50">
                <div className="absolute w-full">
                    <DonorBox 
                        name="Name"
                    />
                </div>
            </div>
            
            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        text="thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest"
                        image="DISCORD.png"
                        className="-mt-16 md:mt-0"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        className="-mt-16 md:mt-0"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="absolute w-full">
                    <DonorBox 
                        name="Name"
                        text="thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest"
                        image="DISCORD.png"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        text="thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest"
                        image="YT.png"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        text="thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest"
                        image="steam.png"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="absolute w-full">
                    <DonorBox 
                        name="Name"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        className="-mt-16"
                    />
                </div>
            </div>

            <div className="relative h-32">
                <div className="relative">
                    <DonorBox 
                        name="Name"
                        text="thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest
                                thisisatest thisisatest thisisatest thisisatest"
                        image="DISCORD.png"
                        className="-mt-16"
                    />
                </div>
            </div>
        </div>

        <div className="w-[80%] md:w-[70%] relative">
            <DonorBigBox
                names={['name', 'name', 'name', 'name', 'name',
                        'name', 'name', 'name', 'name', 'name',
                        'name', 'name', 'name', 'name', 'name',
                        'name', 'name', 'name', 'name', 'name',
                        'name', 'name', 'name', 'name', 'name',
                ]}    
            />
        </div>
    </div>
  )
}