type DonorContent = {
    textContent?: string;
    imageContent?: string;
}

export default function DonorBox({ textContent, imageContent}: DonorContent) {
    return(
        <div className="flex flex-col">
            <div className="w-9/10 h-10 bg-[#c69825] rounded-t-md [clip-path:polygon(0_0,85%_0,100%_100%,0_100%)]"></div>
            
            <div className="w-80 min-h-80 bg-[#22180c] border border-[#c69825] p-4 rounded-b-md rounded-tr-md">
                <p>{textContent}</p>
            </div>
        </div>
    )
}