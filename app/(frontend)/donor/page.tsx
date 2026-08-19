export const dynamic = 'force-dynamic';

import DonorBox from "../components/Donor";
import DonorBigBox from "../components/DonorBigBox";
import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers.js";
import DonorAdminButton from "./components/DonorAdminButton";

export default async function DonorPage() { 
  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const isAdmin = user?.role === "admin";

  return (
    <div className="mt-40 mb-40 p-8 flex flex-col items-center">
        <div className="w-[80%] md:w-[70%] relative mb-10 flex justify-center items-center">
          <h1>DONOR</h1>
          <DonorAdminButton isAdmin={isAdmin} />
        </div>

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