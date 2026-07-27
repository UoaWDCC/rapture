type DonorBigBoxContent = {
    names: Array<string>;
}

export default function DonorBigBox({ names }: DonorBigBoxContent) {

    return(
        <div className={`flex flex-col transition-all duration-300 cursor-pointer`}
        >
            <div className={`w-9/10 rounded-t-md [clip-path:polygon(0_0,85%_0,100%_100%,0_100%)]`} 
                style={{ backgroundColor: '#c69825', height: '40px', minHeight: '40px' }}   
            ></div>
            
            <div className="w-full min-h-80 h-auto flex flex-col items-center bg-[#22180c] border p-4 rounded-b-md rounded-tr-md"
                style={{borderColor: '#c69825',}}>
                
                <div className="pt-8 grid grid-cols-1 md:grid-cols-5 gap-x-40 text-2xl">
                    {names.map((name, index) => {
                        return <p key={index}>{name}</p>;
                    })}
                </div>
            </div>
        </div>
    )
}