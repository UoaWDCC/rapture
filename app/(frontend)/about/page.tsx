import ContactForm from "../components/ContactForm";
import ContactFile from "../components/ui/ContactFileDesign.tsx";
import Image from "next/image";

export default async function aboutPage() {
    const open = false;
    return (
        <div className="mt-40 mb-80 flex flex-row w-[95%]">
            <div className="absolute left-50 flex z-100 h-245 max-w-[50%]">
                <div className="w-[70%] h-full">
                    <ContactFile title="About Us (1)" bgColor="bg-red-800" sideHeight="100px" zIndex={3} translateValueOpen="-translate-x-[50%]" translateValueClosed="translate-x-[240px]" className="h-full absolute -left-162.5">
                        <div className="flex flex-row max-w-full w-250 overflow-y-auto scrollbar-none">
                            {/* <div className="w-[10%] flex">
                                <Image src={"@/public/PROP #2 1"} alt={"prop"} width={500} height={500}/>
                            </div> */}
                            <div className="w-[80%] flex flex-col items-end">
                                <h1 className="mb-20 mr-10 mt-10">About Us</h1>

                                <p className="w-[70%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                </p>

                                <p className="w-[70%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                </p>

                                <p className="w-[70%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                Loren als ser pal Loren als ser pal Loren als ser pal
                                </p>
                            </div>
                        </div>
                    </ContactFile>

                    <ContactFile title="About Us (2)" bgColor="bg-green-700" sideHeight="200px" zIndex={2} mlValue={-550} translateValueOpen="-translate-x-[50%]" translateValueClosed="translate-x-[15%]" className=" h-full absolute -left-10">
                        <div className="w-260 h-full flex flex-col items-end overflow-y-auto scrollbar-none">
                            <h1 className="mb-20 mr-10 mt-10">About Us</h1>

                            <p className="w-[50%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            </p>

                            <p className="w-[50%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            </p>

                            <p className="w-[50%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            </p>
                        </div>
                    </ContactFile>

                    <ContactFile title="About Us (3)" bgColor="bg-yellow-800" sideHeight="300px" zIndex={1} mlValue={-550} translateValueOpen="-translate-x-[30%]" translateValueClosed="translate-x-[90px]" className=" h-full absolute -left-20">
                        <div className="w-290 flex flex-col items-end overflow-y-auto scrollbar-none">
                            <h1 className="mb-20 mr-10 mt-10">About Us</h1>

                            <p className="w-[30%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            </p>

                            <p className="w-[30%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            </p>

                            <p className="w-[30%] mb-10 text-left">Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            Loren als ser pal Loren als ser pal Loren als ser pal
                            </p>
                        </div>
                    </ContactFile>
                </div>
            </div>

            <div className={`${open ? 'opacity-0' : 'opacity-100'}`}>
            </div>
            <ContactForm />
        </div>
    )
}