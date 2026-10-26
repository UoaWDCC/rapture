import ContactForm from "../components/ContactForm";
import ContactFile from "../components/ui/ContactFileDesign.tsx";

export default async function aboutPage() {
  const open = false;
  return (
    <div className="mt-40 mb-80 flex flex-row w-[95%]">
      <div className="absolute left-50 flex z-100 h-245 max-w-[100%]">
        <div className="w-[100%] h-full">
          <ContactFile
            title="ABOUT US"
            bgColor="bg-[#000000]"
            borderColor="#20805A"
            sideHeight="100px"
            zIndex={3}
            mlValue={0}
            translateValueOpen="-translate-x-[30%]"
            translateValueClosed="translate-x-[90px]"
            className="h-full absolute -left-150"
          >
            <div className="w-250 flex flex-row max-w-fulloverflow-y-auto scrollbar-none">
              <div className="flex flex-col items-end">
                <h1 className="mb-20 mr-10 mt-10">STUDIO RAPTURE!</h1>

                <p className="w-[70%] mb-10 text-left">
                  we are very enthusiastic about VR
                </p>
              </div>
            </div>
          </ContactFile>

          <ContactFile
            title="MEET THE DEVS"
            bgColor="bg-[#070604]"
            borderColor="#F2B423"
            sideHeight="300px"
            zIndex={2}
            mlValue={50}
            translateValueOpen="-translate-x-[30%]"
            translateValueClosed="translate-x-[90px]"
            className=" h-full absolute -left-150"
          >
            <div className="w-260 h-full flex flex-col items-end overflow-y-auto scrollbar-none">
              <h1 className="mb-20 mr-10 mt-10">About Us</h1>

              <p className="w-[60%] mb-10 text-left">
                Loren als ser pal Loren als ser pal Loren als ser pal
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

          <ContactFile
            title="CONTACT US"
            bgColor="bg-[#020A15]"
            borderColor="#0650DA"
            sideHeight="500px"
            zIndex={1}
            mlValue={50}
            translateValueOpen="-translate-x-[30%]"
            translateValueClosed="translate-x-[90px]"
            className=" h-full absolute -left-150"
          >
            <div className="w-290 h-full flex flex-col items-end overflow-y-auto scrollbar-none">
              <h1 className="mb-20 mr-10 mt-10">About Us</h1>

              <p className="w-[70%] mb-10 text-left">
                Loren als ser pal Loren als ser pal Loren als ser pal
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

      <ContactForm />
    </div>
  )
}