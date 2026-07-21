import config from '@payload-config'
export const dynamic = 'force-dynamic';

import DonorBox from "../components/Donor";

export default async function DonorPage() { 

  return (
    <div className="mb-40 p-8 flex flex-col items-center">
        <h1 className="mb-10">DONOR</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <DonorBox 
                name="Name"
            />

            <DonorBox 
                name="Name"
            />

            <DonorBox 
                name="Name"
            />

            <DonorBox 
                name="Name"
                image="/globe.svg"
                tabColor="blue"
            />

            <DonorBox 
                name="Name"
                text="This is a test This is a test This is a test
                        This is a test This is a test This is a test
                        This is a test This is a test This is a test
                        This is a test This is a test This is a test"
                image="/steam.png"
                tabColor="blue"
            />

            <DonorBox 
                name="Name"
                image="/DISCORD.png"
                tabColor="blue"
            />

            <DonorBox 
                name="Name"
                tabColor="green"
            />

            <DonorBox 
                name="Name"
                text="This is a test This is a test This is a test
                        This is a test This is a test This is a test
                        This is a test This is a test This is a test
                        This is a test This is a test This is a test"
                tabColor="green"
            />

            <DonorBox 
                name="Really long name that is needed to test if the box can handle long text inputs
                Really long name that is needed to test if the box can handle long text inputs
                Really long name that is needed to test if the box can handle long text inputs"
                tabColor="green"
            />
        </div>
    </div>
  )
}