import config from '@payload-config'
export const dynamic = 'force-dynamic';

import DonorBox from "../components/Donor";

export default async function DonorPage() { 

  return (
    <div className="mb-40 p-8 flex flex-col items-center">
        <h1 className="mb-10">DONOR</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />

            <DonorBox 
                textContent="Hello Through a parameter"
            />
        </div>
    </div>
  )
}